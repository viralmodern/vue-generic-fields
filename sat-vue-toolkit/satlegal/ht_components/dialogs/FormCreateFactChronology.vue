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
        <v-row no-gutters justify-center align-center class="pa-3">
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
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-if="stageAdd.field !== 'characters'">
              <SelectMultipleUser
                label="Characters"
                :user="characters"
                :users="dataCharacters"
                @change="characters = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="6" class="pr-2">
              <DateMonthPicker
                :rules="[v => !!v || 'This field is required']"
                label="Date"
                :min="minDate"
                :value="date"
                @change="date = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="6" class="pl-2">
              <TimePicker
                :rules="[v => !!v || 'This field is required']"
                :value="time"
                @change="time = $event"
                append-icon="query_builder"
              />
            </v-col>
            <v-col cols="6" class="pr-2">
              <SelectChip
                :items="appConfigs.factType"
                label="Type"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="type"
                @change="type = $event"
                :rules="[v => !!v || 'This field is required']"
                :disabled="stageAdd.field === 'type'"
              />
            </v-col>
            <v-col cols="6" class="pl-2">
              <SelectChip
                :items="appConfigs.favorableType"
                label="Favorable type"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="favorable"
                @change="favorable = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="interpretation"
                label="Interpretation"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="cause_of_actions"
                label="Cause of actions"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="relief_sought"
                label="Relief Sought"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Dispute</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="dispute"
                ></v-switch>
              </v-row>
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
import SelectChip from "../inputs/SelectChip";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import DateMonthPicker from "../menus/DateMonthPicker";
import TimePicker from "../menus/TimePicker";

export default {
  components: {
    SelectChip,
    SelectMultipleUser,
    DateMonthPicker,
    TimePicker
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    appConfigs: Object,
    dataCharacters: Array
  },
  data() {
    return {
      valid: false,
      title: "",
      date: new Date().toISOString().substr(0, 10),
      time: "",
      dispute: false,
      characters: [],
      type: "",
      favorable: "",
      interpretation: "",
      cause_of_actions: "",
      relief_sought: ""
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
          title: this.title,
          date: this.date,
          time: this.time,
          dispute: this.dispute,
          characters: this.characters,
          type: this.type,
          favorable: this.favorable,
          interpretation: this.interpretation,
          cause_of_actions: this.cause_of_actions,
          relief_sought: this.relief_sought
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.title = "";
      this.date = "";
      this.time = "";
      this.dispute = "";
      this.characters = [];
      this.type = "";
      this.favorable = "";
      this.interpretation = "";
      this.cause_of_actions = "";
      this.relief_sought = "";
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
