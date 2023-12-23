<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-tabs>
        <v-tab v-for="(item, index) in tabsAdmin" :key="index">{{
          item.name
        }}</v-tab>
        <v-tab-item>
          <FormCompanyAdminSetting
            :item="userAdmin"
            :currencies="currencies"
            :timezones="timezones"
            @updateCompanySetting="updateCompanySetting"
          />
          <v-snackbar
            v-model="isShowUpdateAdminCompanySetting"
            :timeout="3000"
            :right="true"
            :bottom="true"
            >Update Company success</v-snackbar
          >
        </v-tab-item>
        <v-tab-item>
          <ListUserAdmin />
        </v-tab-item>
        <v-tab-item>3</v-tab-item>
        <v-tab-item>4</v-tab-item>
        <v-tab-item>
          <BillingContainer />
        </v-tab-item>
        <v-tab-item>
          <PlanContainer />
        </v-tab-item>
        <v-tab-item>
          <WorkFlow />
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import FormCompanyAdminSetting from "../../ht_components/setting/FormCompanyAdminSetting";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ListUserAdmin from "../../ht_components/setting/ListUserAdmin";
import PlanContainer from "../../ht_components/panels/PlanContainer";
import BillingContainer from "../../ht_components/panels/BillingContainer";
import WorkFlow from "../../ht_components/setting/WorkFlow";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  data() {
    return {
      isShowUpdateAdminCompanySetting: false,
      tabsAdmin: [
        {
          name: "Company "
        },
        {
          name: "User"
        },
        {
          name: "Permission"
        },
        {
          name: "Invited"
        },
        {
          name: "Billing"
        },
        {
          name: "Plan"
        },
        {
          name: "workflow"
        }
      ]
    };
  },
  components: {
    FormCompanyAdminSetting,
    ListUserAdmin,
    PlanContainer,
    BillingContainer,
    WorkFlow
  },
  methods: {
    ...mapActions("ht_store/adminSetting", [
      "getUserPermissionAdminRequest",
      "getDataCurencyRequest",
      "getDataTimezoneRequest"
    ]),
    ...mapMutations("ht_store/adminSetting", ["editAdminCompanySetting"]),
    updateCompanySetting(data) {
      this.editAdminCompanySetting(data);
      this.isShowUpdateAdminCompanySetting = true;
    }
  },
  computed: {
    ...mapGetters("ht_store/adminSetting", ["userAdmin", "currencies", "timezones"])
  },
  mounted() {
    this.getUserPermissionAdminRequest();
    this.getDataCurencyRequest();
    this.getDataTimezoneRequest();
  }
};
</script>
