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
          <v-row class="pa-2" no-gutters>
            <v-col cols="12">
              <v-textarea
                label="Authoriative treatise"
                auto-grow
                v-model="authoriative_treatise"
                rows="1"
                :rules="[v => !!v || 'This field is required']"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Treatise description"
                auto-grow
                v-model="treatise_description"
                rows="1"
              ></v-textarea>
            </v-col>
            <v-col cols="12" v-if="stageAdd.field !== 'labels'">
              <div class="text--secondary subheading">Treatise labels :</div>
              <div>
                <MenuListTags
                  :tag="labels"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List Labels"
                  nameAdd="Add new Labels"
                  @add="addLabelsRequest"
                  @update="updateLabelsRequest"
                  @remove="removeLabelsRequest"
                  @chose="labels = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Authoriative person"
                auto-grow
                v-model="authoriative_person"
                rows="1"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Person description"
                auto-grow
                v-model="person_description"
                rows="1"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Person labels :</div>
              <div>
                <MenuListTags
                  :tag="person_labels"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List Labels"
                  nameAdd="Add new Labels"
                  @add="addLabelsRequest"
                  @update="updateLabelsRequest"
                  @remove="removeLabelsRequest"
                  @chose="person_labels = $event"
                />
              </div>
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
import { mapGetters, mapActions } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    isLoadingAdd: Boolean,
    stageAdd: Object,
  },
  data() {
    return {
      valid: false,
      authoriative_treatise: "",
      treatise_description: "",
      authoriative_person: "",
      labels: [],
      person_description: "",
      person_labels: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/labels", ["dataLabels"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    ...mapActions("ht_store/matter/labels", [
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ]),
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          authoriative_treatise: this.authoriative_treatise,
          treatise_description: this.treatise_description,
          authoriative_person: this.authoriative_person,
          labels: this.labels,
          person_description: this.person_description,
          person_labels: this.person_labels
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.authoriative_treatise = "";
      this.treatise_description = "";
      this.authoriative_person = "";
      this.labels = [];
      this.person_description = "";
      this.person_labels = [];
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
