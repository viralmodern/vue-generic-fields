<template>
  <v-tabs>
    <v-tab key="category">Category</v-tab>
    <v-tab key="taxRate">Tax rate</v-tab>
    <v-tab-item key="category">
      <TableCategory/>
    </v-tab-item>
    <v-tab-item key="taxRate">
      <TableTaxRate/>
    </v-tab-item>
  </v-tabs>
</template>
<script>
import { mapActions } from "vuex";
import TableCategory from "../../ht_components/billing-setting/TableCategory";
import TableTaxRate from "../../ht_components/billing-setting/TableTaxRate";
export default {
  components: {
    TableCategory,
    TableTaxRate
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/setting/category", [
      "getDataSettingCategoryRequest"
    ]),
    ...mapActions("ht_store/workspace/billing/setting/rate", [
      "getDataSettingRateRequest"
    ])
  },
  mounted() {
    this.getDataSettingCategoryRequest();
    this.getDataSettingRateRequest();
  }
};
</script>
