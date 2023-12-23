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
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="text-h6 font-weight-regular white--text">{{ header }}</div>
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
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pr-2">
              <SelectChip
                :items="appConfigs.factType"
                label="Type"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="representing"
                @change="representing = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="12">
              <DateMonthPicker
                label="Date"
                :min="minDate"
                :value="date"
                @change="date = $event"
                :rules="[v => !!v || 'This field is required']"
                append-icon="date_range"
              />
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
            <v-col cols="12">
              <v-textarea
                v-model="testimony_case"
                label="Case"
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
import DateMonthPicker from "../menus/DateMonthPicker";
import MenuListTags from "../menus/MenuListTags";
import SelectChip from "../inputs/SelectChip";

export default {
  components: {
    DateMonthPicker,
    MenuListTags,
    SelectChip
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    appConfigs: Object,
    dataLabels: Array
  },
  data() {
    return {
      valid: false,
      name: "",
      date: "",
      labels: [],
      description: "",
      testimony_case: "",
      representing: ""
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
          date: this.date,
          labels: this.labels,
          description: this.description,
          testimony_case: this.testimony_case,
          representing: this.representing
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.name = "";
      this.date = "";
      this.labels = [];
      this.description = "";
      this.testimony_case = "";
      this.representing = "";
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
