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
              <DateMonthPicker
                label="Date"
                :value="date"
                @change="date = $event"
                :rules="[v => !!v || 'This field is required']"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                v-model="name"
                append-icon="format_align_left"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Case"
                auto-grow
                v-model="publisher"
                rows="1"
                append-icon="format_align_left"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description"
                auto-grow
                v-model="description"
                rows="1"
                append-icon="format_align_left"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Labels :</div>
              <div>
                <MenuListTags
                  :tag="label"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List Labels"
                  nameAdd="Add new Labels"
                  @add="addLabelsRequest"
                  @update="updateLabelsRequest"
                  @remove="removeLabelsRequest"
                  @chose="label = $event"
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
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    DateMonthPicker,
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: false,
      date: "",
      name: "",
      publisher: "",
      description: "",
      label: []
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
          labels: this.label,
          date: this.date,
          description: this.description,
          publisher: this.publisher,
          name: this.name,
          attachments: []
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.label = [];
      this.date = "";
      this.description = "";
      this.publisher = "";
      this.name = "";
      this.$refs.form.resetValidation();
    }
  }
};
</script>
