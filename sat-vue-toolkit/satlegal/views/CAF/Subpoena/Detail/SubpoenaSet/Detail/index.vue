<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="60%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Subpoena</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div>
        <v-list dense>
          <v-tabs :centered="true" :grow="true" v-model="tabs">
            <v-tab>Subpoena Detial</v-tab>
            <v-tab>Definition and Instruction</v-tab>
            <v-tab>Production</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat :disabled="isLoadingGetDetail">
                <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
                <v-card-text>
                  <SobpoenaDetail
                    @getDataMember="$emit('getDataMember')"
                    :isLoadingGetMember="isLoadingGetMember"
                    :subpoenaId="subpoenaId"
                    @updateReports="$emit('updateReports', $event.pk, $event.value)"
                    @removeSubpoena="$emit('removeSubpoena', $event.item, $event.close)"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-progress-linear v-if="isLoadingGetDefi" class="mt-1" indeterminate rounded></v-progress-linear>
                  <SubpoenaDefiAndInstrucs :subpoenaId="subpoenaId" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-progress-linear v-if="isLoadingGetMap" class="mt-1" indeterminate rounded></v-progress-linear>
                  <SubpoenaProduction :subpoenaId="subpoenaId" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import SubpoenaDefiAndInstrucs from "./SubpoenaDefiAndInstrucs/index";
import SubpoenaProduction from "./SubpoenaProduction/index";
import SobpoenaDetail from "./SubpoenaDetail/index";
export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    subpoenaId: Number,
    isLoadingGetMember: Boolean
  },
  components: {
    SubpoenaDefiAndInstrucs,
    SubpoenaProduction,
    SobpoenaDetail
  },
  data() {
    return {
      valid: false,
      tabs: null,
      isLoadingGetMap: false,
      isLoadingGetDefi: false,
      isCallAPIDefiAndIns: false,
      isCallAPIProduction: false,
      subpoenaIdData: 0
    };
  },
  methods: {
    ...mapActions("ht_store/matter/subpoena/subpoenaDefiAndInstrucs", [
      "getDataFromApi"
    ]),
    ...mapActions("ht_store/matter/subpoena/subpoenaProduction", [
      "getDataFromApiMap"
    ])
  },
  computed: {},
  watch: {
    tabs: {
      async handler(val) {
        const idParams = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId
        };
        const searchObject = {
          page: 1,
          group: "all",
          group_by: undefined,
          group_items: undefined,
          ungroup: true
        };
        if (val === 1) {
          if (!this.isCallAPIDefiAndIns) {
            this.isLoadingGetDefi = true;
            await this.getDataFromApi({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingGetDefi = false;
            this.isCallAPIDefiAndIns = true;
          }
        }
        if (val === 2) {
          if (!this.isCallAPIProduction) {
            this.isLoadingGetMap = true;
            await this.getDataFromApiMap({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingGetMap = false;
            this.isCallAPIProduction = true;
          }
        }
      }
    },
    subpoenaId: {
      async handler(val) {
        if (this.subpoenaIdData !== val) {
          this.subpoenaIdData = val;
          this.isCallAPIDefiAndIns = false;
          this.isCallAPIProduction = false;
          const idParams = {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            subpoenaId: this.subpoenaIdData
          };
          const searchObject = {
            page: 1,
            group: "all",
            group_by: undefined,
            group_items: undefined,
            ungroup: true
          };
          if (this.tabs === 1) {
            this.isLoadingGetDefi = true;
            await this.getDataFromApi({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingGetDefi = false;
            this.isCallAPIDefiAndIns = true;
          }
          if (this.tabs === 2) {
            this.isLoadingGetMap = true;
            await this.getDataFromApiMap({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingGetMap = false;
            this.isCallAPIProduction = true;
          }
        }
      }
    }
  },
  mounted() {
    this.subpoenaIdData = this.subpoenaId;
  }
};
</script>
<style scoped>
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
