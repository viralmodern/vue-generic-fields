<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="700"
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
          <v-row class="px-3 py-2" row wrap no-gutters>
            <v-col cols="12" class="my-2" v-if="stageAdd.field !== 'goals'">
              <div class="text--secondary subheading">Goals</div>
              <div>
                <MenuListTags
                  :tag="goals"
                  :tags="dataGoals"
                  keyText="name"
                  keyColor="color"
                  title="List goals"
                  nameAdd="Add new goals"
                  @add="
                    addGoalsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @update="
                    updateGoalsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @remove="
                    removeGoalsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      id: $event
                    })
                  "
                  @chose="goals = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Pleading :</div>
              <NotebookEditor
                ref="pleading"
                placeholder="Type your pleading..."
                @change="
                  pleading = $event;
                  validateForm();
                "
              />
              <span class="error--text">{{ this.errorsMsg.pleading }}</span>
            </v-col>
            <v-col cols="12" class="my-2">
              <div class="text--secondary subheading">Counter claim :</div>
              <NotebookEditor
                ref="counter_claim"
                placeholder="Type your response of description..."
                @change="counter_claim = $event"
              />
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
import { mapActions } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    NotebookEditor,
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    isLoadingAdd: Boolean,
    header: String,
    stageAdd: Object,
    dataGoals: Array
  },
  data() {
    return {
      valid: false,
      pleading: "",
      counter_claim: "",
      goals: [],
      errorsMsg: {
        pleading: ""
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    validateForm() {
      const errors = {};
      if (!this.pleading || this.pleading === "<p></p>")
        errors.pleading = "This field is required";
      if (!Object.keys(errors).length) {
        this.errorsMsg = {};
        return true;
      } else {
        this.errorsMsg = errors;
      }
    },
    add() {
      if (this.validateForm()) {
        const data = {
          pleading: this.pleading,
          counter_claim: this.counter_claim,
          goals: this.goals
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.pleading = "";
      this.counter_claim = "";
      this.goals = [];
      this.$refs.pleading.clearContent();
      this.$refs.counter_claim.clearContent();
    },
    ...mapActions("ht_store/matter/goals", [
      "addGoalsRequest",
      "updateGoalsRequest",
      "removeGoalsRequest"
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
