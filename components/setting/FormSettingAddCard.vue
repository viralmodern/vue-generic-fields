<template>
  <v-dialog :value="isShow" @input="closeDialog" width="500">
    <v-card>
      <v-col class="pa-3">
        <h2>Credit card</h2>
        <span class="text-caption text--secondary"
          >Safe money transfer using your bank account. We support Mastercard,
          Visa, Maestro and Skrill</span
        >
      </v-col>
      <v-form ref="form" v-model="valid">
        <v-row class="px-3" no-gutters>
          <v-col cols="12">
            <v-text-field
              label="Card number"
              mask="credit-card"
              :rules="[(v) => !!v || 'This field is required']"
              v-model="cardNumber"
              placeholder="0000 - 0000 - 0000 - 0000"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Name on card"
              :rules="[(v) => !!v || 'This field is required']"
              v-model="name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-menu
              ref="menu"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  readonly
                  v-on="on"
                  v-model="expire"
                  label="Expires"
                  :rules="[(v) => !!v || 'Please select a expire']"
                ></v-text-field>
              </template>
              <v-date-picker
                type="month"
                v-model="expire"
                no-title
                scrollable
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="CVV code"
              :rules="[(v) => !!v || 'This field is required']"
              v-model="cvv"
              mask="###"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add card</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      name: '',
      cardNumber: '',
      expire: '',
      cvv: '',
    }
  },
  props: {
    isShow: Boolean,
    curencies: Array,
  },
  methods: {
    closeDialog() {
      this.$emit('closeModal')
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          cardNumber: this.cardNumber,
          expire: this.expire,
          cvv: this.cvv,
        }
        this.$emit('createCard', data)
        this.closeDialog()
      }
    },
  },
}
</script>
