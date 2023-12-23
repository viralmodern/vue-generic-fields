<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="450"
  >
    <v-card>
      <div class="pa-3">
        <span class="title">{{ header }}</span>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-select
                :rules="[v => !!v || 'This field is required']"
                v-model="timeEntry"
                :items="appConfigs.expenseCategory"
                label="Time entry"
                item-text="label"
                item-value="id"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <DateMonthPicker
                :rules="[v => !!v || 'This field is required']"
                label="Date"
                :min="new Date().toISOString()"
                :value="date"
                @change="date = $event"
              />
            </v-col>
            <v-col cols="12">
              <SelectMultipleUser
                :rules="[v => !!v || 'This field is required']"
                label="Billed by"
                :user="billedBy"
                :users="dataClient"
                @change="billedBy = $event"
                item-value="id"
                itemText="user.name"
                itemImg="user.imageUrl"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :rules="[v => !!v || 'This field is required']"
                class="pr-1"
                v-model="hours"
                mask="##:##"
                label="Hours"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                class="pl-1"
                v-model="rate"
                :rules="[v => (!!v && v <= 100) || 'Number <= 100']"
                label="Rate"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Description..."
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
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
import { mapGetters } from "vuex";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    SelectMultipleUser,
    DateMonthPicker
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  computed: {
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  data() {
    return {
      valid: false,
      timeEntry: "",
      date: "",
      billedBy: "",
      description: "",
      hours: "",
      rate: ""
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          timeEntry: this.timeEntry,
          date: this.date,
          billedBy: this.billedBy,
          description: this.description,
          hours: this.hours,
          rate: this.rate
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.timeEntry = "";
      this.date = "";
      this.billedBy = "";
      this.description = "";
      this.hours = "";
      this.rate = "";
    }
  }
};
</script>
