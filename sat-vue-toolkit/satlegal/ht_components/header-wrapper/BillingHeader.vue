<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col cols="12">
        <v-app-bar height="50">
          <v-toolbar-items class="hidden-sm-and-down">
            <template v-for="item in itemsMenu" v-slot:activator="{ on }">
              <v-btn
                :key="item.id"
                small
                class="text-capitalize"
                v-on="on"
                :to="{ name: item.nameRoute }"
                >{{ item.name }}</v-btn
              >
            </template>
          </v-toolbar-items>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      itemsMenu: [
        {
          id: 1,
          name: "Summary",
          nameRoute: "BillingSummary"
        },
        {
          id: 2,
          name: "Invoice",
          nameRoute: "BillingInvoice"
        },
        { id: 5, name: "Expense", nameRoute: "BillingExpense" },
        { id: 4, name: "payment", nameRoute: "BillingPayment" },
        { id: 3, name: "setting", nameRoute: "BillingSetting" }
      ]
    };
  }
};
</script>
