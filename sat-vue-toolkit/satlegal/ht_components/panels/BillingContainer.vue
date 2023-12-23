<template>
  <v-row  no-gutters>
    <v-card>
      <v-col cols="12" class="pa-2">
        <CardUserBilling
          v-if="dataBilling && Object.keys(dataBilling).length"
          :dataUser="dataBilling.user"
          @changeAvatar="changeAvatar"
        />
      </v-col>
      <v-col cols="12" class="pl-2">
        <BillingInfomation :dataInfomation="dataBilling" @deleteConfirm="removeCreditCard"/>
      </v-col>
      <v-col cols="12" class="pa-4">
        <div class="line-theme"></div>
      </v-col>
      <v-col cols="12" class="pa-2">
        <CardPaymentHistory
          :paymentHistory="dataBilling.paymentHistory"
          @deleteConfirm="removeCardPayment"
        />
      </v-col>
      <v-col cols="12" class="pa-4">
        <div class="line-theme"></div>
      </v-col>
      <v-col class="pa-2">
        <CardDebitAndCredit
          :dataCreditCard="dataBilling.dataCreditCard"
          @deleteConfirm="removeCreditCardDebit"
        />
      </v-col>
      <v-col class="pa-2">
        <AddNewBillingPayment
          :dataCreditCard="dataBilling.dataCreditCard"
          :listCurrency="listCurrency"
          @createPayment="createPayment"
        />
      </v-col>
    </v-card>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BillingInfomation from "./BillingInfomation";
import AddNewBillingPayment from "./AddNewBillingPayment";
import CardUserBilling from "../cards/CardUserBilling";
import CardPaymentHistory from "../cards/CardPaymentHistory";
import CardDebitAndCredit from "../cards/CardDebitAndCredit";

export default {
  components: {
    CardUserBilling,
    BillingInfomation,
    CardPaymentHistory,
    CardDebitAndCredit,
    AddNewBillingPayment
  },
  methods: {
    ...mapActions("ht_store/setting/billing", [
      "getDataBillingRequest",
      "getListCurrencyRequest",
      "removeCreditCard",
      "removeCardPayment",
      "removeCreditCardDebit",
      "changeAvatar",
      "createPayment"
    ])
  },
  computed: {
    ...mapGetters("ht_store/setting/billing", ["dataBilling", "listCurrency"])
  },
  mounted() {
    this.getDataBillingRequest();
    this.getListCurrencyRequest();
  }
};
</script>
<style  scoped>
.line-theme::before {
  display: block;
  width: 80%;
  height: 1px;
  content: "";
  margin: 0 auto;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.2) 0,
    rgba(255, 255, 255, 0) 75%
  );
}
</style>
