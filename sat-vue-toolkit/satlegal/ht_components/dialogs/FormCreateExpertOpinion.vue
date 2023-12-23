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
                v-model="expert_opinion"
                label="Expert Opinion"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-2" v-if="stageAdd.field !== 'labels'">
              <div class="text--secondary subheading">Labels</div>
              <div>
                <MenuListTags
                  :tag="labels"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List Tags"
                  nameAdd="Add new Tag"
                  @add="
                    addLabelsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @update="
                    updateLabelsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @remove="
                    removeLabelsRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      id: $event
                    })
                  "
                  @chose="labels = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Description"
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
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    dataLabels: Array,
    dataCharacters: Array
  },
  data() {
    return {
      valid: false,
      expert_opinion: "",
      labels: [],
      description: ""
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
          expert_opinion: this.expert_opinion,
          labels: this.labels,
          description: this.description
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.expert_opinion = "";
      this.labels = [];
      this.description = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/labels", [
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
