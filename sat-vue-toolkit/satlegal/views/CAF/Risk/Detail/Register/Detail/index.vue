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
          <span>Risk Detail</span>
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
            <v-tab>Risk Detial</v-tab>
            <v-tab>Risk Action Entry</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat :disabled="isLoadingGetDetail">
                <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
                <v-card-text>
                  <RiskDetail
                    :riskId="riskId"
                    @updateReports="$emit('updateReports', $event.pk, $event.value)"
                    @remove="$emit('remove', $event.item, $event.close)"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-progress-linear v-if="isLoadingRiskAction" class="mt-1" indeterminate rounded></v-progress-linear>
                  <RiskActionEntry :riskId="riskId" />
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
import RiskActionEntry from "./RiskActionEntry/index";
import RiskDetail from "./RiskDetail/index";
export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    riskId: Number,
    isLoadingGetMember: Boolean
  },
  components: {
    RiskActionEntry,
    RiskDetail
  },
  data() {
    return {
      valid: false,
      tabs: null,
      isLoadingGetMap: false,
      isLoadingRiskAction: false,
      isCallAPIRiskAction: false,
      isCallAPIProduction: false,
      riskIdData: 0
    };
  },
  methods: {
    ...mapActions("ht_store/matter/risk/actionEntry", [
      "getDataRiskActionRequest"
    ]),
  },
  computed: {},
  watch: {
    tabs: {
      async handler(val) {
        const searchObject = {
          page: 1
        };
        const idParams = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskActionId: this.riskId
        };

        if (val === 1) {
          if (!this.isCallAPIRiskAction) {
            this.isLoadingRiskAction = true;
            this.getDataRiskActionRequest({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingRiskAction = false;
            this.isCallAPIRiskAction = true;
          }
        }
      }
    },
    riskId: {
      async handler(val) {
        if (this.riskIdData !== val) {
          this.riskIdData = val;
          this.isCallAPIRiskAction = false;
         const searchObject = {
          page: 1
        };
        const idParams = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskActionId: this.riskId
        };
          if (this.tabs === 1) {
            this.isLoadingRiskAction = true;
            this.getDataRiskActionRequest({
              idParams,
              searchObject,
              isFirstCall: true
            });
            this.isLoadingRiskAction = false
            this.isCallAPIRiskAction = true;
          }
        }
      }
    }
  },
  mounted() {
    this.riskIdData = this.riskId;
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
