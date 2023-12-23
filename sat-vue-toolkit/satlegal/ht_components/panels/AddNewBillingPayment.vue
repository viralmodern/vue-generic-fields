<template>
  <v-row class="pa-3">
    <v-col cols="12">
      <div class="text-h5">Add a new payment method</div>
    </v-col>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-row>
        <v-col cols="6">
          <div class="pt-3 subheading font-weight-bold">
            Credit or Debit Cards
          </div>
          <div class="pt-2 subheading">
            Amazon accepts all major credit and debit cards.
          </div>
          <div class="pt-2 pb-3">
            <AddNewPayment
              :listCurrency="listCurrency"
              @createPayment="data => $emit('createPayment', data)"
            />
          </div>
        </v-col>
        <v-col cols="6" align="center" class="d-flex">
          <v-row justify="center">
            <img
              v-for="item in dataCreditCard"
              :key="item.id"
              :src="item.imageUrl"
              height="50px"
              width="70px"
              class="pa-2"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-divider></v-divider>

    <v-col cols="12">
      <v-row>
        <v-col cols="6">
          <div class="pt-3 subheading font-weight-bold">
            Online Payment services
          </div>
          <div class="pt-2 subheading">
            Use online payment services like, PayPal, Stripe and etc.
          </div>
          <div class="pt-2">
            <a href="#" class="tag-a">One-click signin</a>
          </div>
        </v-col>
        <v-col cols="6" align="center" class="d-flex">
          <v-row justify="center">
            <img
              v-for="item in paymentServices"
              :key="item.id"
              :src="item.imageUrl"
              height="70px"
              width="70px"
              class="pa-2"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import AddNewPayment from "../dialogs/AddNewPayment";
export default {
  components: {
    AddNewPayment
  },
  props: {
    dataCreditCard: Array,
    listCurrency: Array
  },
  data() {
    return {
      paymentServices: [
        {
          id: 1,
          name: "paypal",
          imageUrl: "http://id.funmeu.com/image/Paypal-icon.png"
        },
        {
          id: 2,
          name: "Skrill",
          imageUrl:
            "https://cdn.iconscout.com/icon/free/png-256/payment-skrill-card-pay-bank-transaction-51312.png"
        },
        {
          id: 3,
          name: "Apple Pay",
          imageUrl:
            "https://cdn.worldvectorlogo.com/logos/apple-pay-payment-mark.svg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.tag-a {
  text-decoration: none;
}
</style>
