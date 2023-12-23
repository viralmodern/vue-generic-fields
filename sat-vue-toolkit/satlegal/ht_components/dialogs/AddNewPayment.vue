<template>
  <v-dialog persistent v-model="dialog" width="500" csl>
    <template v-slot:activator="{ on }">
      <a class="tag-a" v-on="on">Add a Card</a>
    </template>
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">
            Create a new payment
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeModal">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row row>
            <v-col cols="12">
              <v-row no-gutters>
                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">CURRENCY</span>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      :items="listCurrency"
                      label="Currency"
                      item-text="name"
                      item-value="cc"
                      :rules="[v => !!v || 'Please enter a valid Currency.']"
                      return-object
                      @change="changeCurrency"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">AMOUNT</span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="$ 0.00"
                      :rules="[
                        v => !!v || 'Amount number is required',
                        v =>
                          /^[0-9]+$/.test(v) || 'Please enter a valid amount.'
                      ]"
                      required
                      v-model="amount"
                      append-icon="attach_money"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">CARD NUMBER</span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="Card number"
                      :rules="[
                        v => !!v || 'Card number is required',
                        v =>
                          /^[0-9]+$/.test(v) ||
                          'Please enter a valid card number.'
                      ]"
                      required
                      v-model="cardNumber"
                      append-icon="credit_card"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">CARDHOLDER NAME</span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="Cardholder name"
                      :rules="[
                        v => !!v || 'Cardholder is required',
                        v =>
                          /^[0-9]+$/.test(v) ||
                          'Please enter a valid cardholder name.'
                      ]"
                      required
                      v-model="cardHoldName"
                      append-icon="account_box"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">EXPIRES</span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="MM/YY"
                      :rules="[v => !!v || 'Please enter a valid date.']"
                      required
                      mask="##/##"
                      v-model="expires"
                      append-icon="date_range"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters class="display-center">
                  <v-col cols="4" class="text-xs-right mr-3">
                    <span class="font-weight-medium">
                      <v-icon small class="mr-2">info</v-icon>CVC
                    </span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="***"
                      :rules="[
                        v => !!v || 'code is required',
                        v => /^[0-9]+$/.test(v) || 'Please enter a valid code.'
                      ]"
                      required
                      v-model="cvc"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeModal">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="createPayment"
          >Create Payment</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    listCurrency: Array
  },
  data() {
    return {
      dialog: false,
      amount: "",
      cardNumber: "",
      cardHoldName: "",
      expires: "",
      cvc: "",
      currency: ""
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    createPayment() {
      if (this.$refs.form.validate()) {
        const data = {
          amount: this.amount,
          cardNumber: this.cardNumber,
          cardHoldName: this.cardHoldName,
          expires: this.expires,
          cvc: this.cvc,
          currency: this.currency
        };
        this.$emit("createPayment", data);
        this.closeModal();
      }
    },
    changeCurrency(e) {
      this.currency = e.cc;
    }
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style>
.display-center {
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
