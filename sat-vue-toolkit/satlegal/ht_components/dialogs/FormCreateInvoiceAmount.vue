<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" persistent width="500">
    <v-card>
      <div class="pa-3">
        <span class="title">{{ header }}</span>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12" class="px-1">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="px-1">
            <v-text-field
              v-model="quantity"
              label="Quantity"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="px-1">
            <v-text-field
              v-model="price"
              label="Price"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="px-1">
            <v-text-field
              type="number"
              v-model="discount"
              @change="change('discount', $event)"
              :rules="[v => v <= 100 || 'Number <= 100']"
              suffix="%"
              label="Discount"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="px-1">
            <v-text-field
              v-model="tax"
              @change="change('tax', $event)"
              label="Tax"
              suffix="%"
              :rules="[v => v <= 100 || 'Number <= 100']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    isShowPopup: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      name: "",
      quantity: "",
      price: "",
      discount: 0,
      tax: 0
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    change(name, value) {
      this[name] = value || 0;
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          quantity: this.quantity,
          price: this.price,
          discount: this.discount,
          tax: this.tax
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.name = "";
      this.quantity = 0;
      this.price = 0;
      this.discount = 0;
      this.tax = 0;
    },
    ...mapActions("ht_store/matter/discovery/toolbox/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
