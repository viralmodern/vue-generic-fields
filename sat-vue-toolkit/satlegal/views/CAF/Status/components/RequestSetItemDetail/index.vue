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
          <span>Request Set Item Detail</span>
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
            <v-tab>Request Set Item Detail</v-tab>
            <v-tab>Request Set Item Document</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat :disabled="isLoadingGetDetail">
                <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
                <v-card-text>
                  <RequestItemDetail
                    @updateReports="$emit('updateReports', $event)"
                    @remove="$emit('remove', $event)"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-progress-linear v-if="isLoadingGetMap" class="mt-1" indeterminate rounded></v-progress-linear>
                  <RequestSetItemDocument :itemsId="itemsId" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item></v-tab-item>
          </v-tabs-items>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import RequestSetItemDocument from "./components/RequestItemDocument/index";
import RequestItemDetail from "./components/RequestItemDetail/index";

export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    itemsId: Number
  },
  components: {
    RequestSetItemDocument,
    RequestItemDetail
  },
  data() {
    return {
      valid: false,
      tabs: null,
      isLoadingGetMap: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/requestStatus/requestSetsItemDocument", [
      "getDataRSIDRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSetsItemDocument", [
      "isLoadingGet",
      "dataRSID"
    ])
  },
  watch: {
    tabs: {
      async handler(val) {
        if (val === 1) {
          const idParams = {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            rSId: this.$route.params.requestSetId,
            itemsId: this.itemsId
          };
          const searchObject = {
            page: 1,
            group: "all",
            group_by: undefined,
            group_items: undefined,
            ungroup: true
          };
          this.isLoadingGetMap = true;
          await this.getDataRSIDRequest({
            idParams,
            searchObject,
            isFirstCall: true
          });
          this.isLoadingGetMap = false;
        }
      }
    },
    itemsId: {
      async handler(val) {
        if (this.tabs === 1) {
          const idParams = {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            rSId: this.$route.params.requestSetId,
            itemsId: val
          };
          const searchObject = {
            page: 1,
            group: "all",
            group_by: undefined,
            group_items: undefined,
            ungroup: true
          };
          this.isLoadingGetMap = true;
          await this.getDataRSIDRequest({
            idParams,
            searchObject,
            isFirstCall: true
          });
          this.isLoadingGetMap = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
