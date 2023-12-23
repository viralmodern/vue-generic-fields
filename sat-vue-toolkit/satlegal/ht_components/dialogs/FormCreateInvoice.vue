<template>
  <v-dialog
    :value="isShow"
    scrollable
    @input="closeDialog"
    persistent
    width="350"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-text-field
                v-model="invoice"
                label="Invoice"
                :rules="[v => !!v || 'This field is required']"
                append-icon="insert_drive_file"
              />
            </v-col>
            <v-col cols="12">
              <DateMonthPicker
                :rules="[v => !!v || 'This field is required']"
                label="DueDate"
                :min="new Date().toISOString()"
                :value="dueDate"
                @change="dueDate = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <SelectMultipleUser
                v-if="!disabledFieldClient"
                :rules="[v => !!v || 'This field is required']"
                label="Client"
                :user="client"
                :users="dataClient"
                @change="client = $event"
                item-value="id"
                itemText="user.name"
                itemImg="user.imageUrl"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    SelectMultipleUser,
    DateMonthPicker
  },
  props: {
    isShow: Boolean,
    header: String,
    disabledFieldClient: Boolean
  },
  computed: {
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  data() {
    return {
      valid: false,
      invoice: "",
      dueDate: "",
      client: ""
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          invoice: this.invoice,
          dueDate: this.dueDate,
          client: this.client
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.invoice = "";
      this.dueDate = "";
      this.client = "";
    }
  }
};
</script>
