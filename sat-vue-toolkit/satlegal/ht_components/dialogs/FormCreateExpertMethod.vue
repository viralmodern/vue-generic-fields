<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="450"
  >
    <v-card>
      <div class="primary">
        <v-row  no-gutters class="pa-3 justify-center align-center">
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
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Is it Tested</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0 justify-end"
                  v-model="tested"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading"
                  >Is this method peer reviewed?</span
                >
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0 justify-end"
                  v-model="reviewed"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading"
                  >Is this method generally accepted in the field?</span
                >
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0 justify-end"
                  v-model="accepted"
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
import { mapActions } from "vuex";

export default {
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object
  },
  data() {
    return {
      valid: false,
      name: "",
      tested: false,
      reviewed: false,
      accepted: false
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
          tested: this.tested,
          reviewed: this.reviewed,
          accepted: this.accepted,
          error_potential: false
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.name = "";
      this.tested = false;
      this.reviewed = false;
      this.accepted = false;
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/labels", [ // eslint-disable-line
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ])
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
