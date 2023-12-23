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
        <v-row no-gutters="" class="pa-3 justify-center align-center">
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
          <v-row class="px-3 py-2" no-gutters="">
            <v-col cols="12">
              <v-textarea
                v-model="question"
                label="Question"
                auto-grow
                rows="1"
                :rules="[v => !!v || 'This field is required']"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="answer"
                label="Answer"
                auto-grow
                rows="1"
                :rules="[v => !!v || 'This field is required']"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row align-center>
                <span class="text--secondary subheading"
                  >Attorney Objection</span
                >
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0 justify-end"
                  v-model="attorney_objection"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2" v-if="stageAdd.field !== 'objection'">
              <v-row align-center>
                <span class="text--secondary subheading">Objection</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0 justify-end"
                  v-model="objection"
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
export default {
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object
  },
  data() {
    return {
      valid: false,
      question: "",
      answer: "",
      attorney_objection: false,
      objection: false,
      key_testimony: false,
      follow_up: false,
      alert: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          question: this.question,
          answer: this.answer,
          attorney_objection: this.attorney_objection,
          objection: this.objection,
          key_testimony: this.key_testimony,
          follow_up: this.follow_up,
          alert: this.alert
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.question = "";
      this.answer = "";
      this.attorney_objection = false;
      this.objection = false;
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
