<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="500"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content" class="pa-1">
        <v-form ref="form" v-model="valid">
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <DateMonthPicker
                label="Date"
                :min="minDate"
                :value="date"
                @change="date = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <SelectMultipleUser
                v-if="stageAdd.field !== 'make_by'"
                label="Characters"
                :user="make_by"
                :users="dataCharacters"
                @change="make_by = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="question"
                label="Question"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="answer"
                label="Answer"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add" :loading="isLoadingAdd">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import DateMonthPicker from "../menus/DateMonthPicker";
import SelectMultipleUser from "../inputs/SelectMultipleUser";

export default {
  components: {
    DateMonthPicker,
    SelectMultipleUser
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    dataCharacters: Array,
    stageAdd: Object,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: false,
      name: "",
      make_by: "",
      date: new Date().toISOString().substr(0, 10),
      question: "",
      answer: ""
    };
  },
  computed: {
    minDate() {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toISOString();
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          make_by: this.make_by,
          date: this.date,
          question: this.question,
          answer: this.answer
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.name = "";
      this.make_by = "";
      this.date = null;
      this.question = "";
      this.answer = "";
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    isShowPopup(isOpen) {
      if (this.stageAdd.field !== "all") {
        if (isOpen) {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [this.stageAdd.value];
          } else {
            this[this.stageAdd.field] = this.stageAdd.value;
          }
        } else {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [];
          } else {
            this[this.stageAdd.field] = "";
          }
          this.$refs.form.resetValidation();
        }
      }
    }
  }
};
</script>
