<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="400"
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
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-text-field
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                v-model="name"
                append-icon="create"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="my-2">
              <DateMonthPicker
                :rules="[v => !!v || 'This field is required']"
                label="Start date"
                :max="endDate"
                :value="startDate"
                @change="startDate = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12" class="my-2">
              <DateMonthPicker
                :disabled="!startDate"
                :rules="[v => !!v || 'This field is required']"
                label="End date"
                :min="startDate"
                :value="endDate"
                @change="endDate = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <SelectMultipleUser
                :rules="[v => !!v.length || 'This field is required']"
                label="Treat by"
                :user="treatBy"
                :users="character"
                @change="treatBy = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Treatment taken</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="treatmentTaken"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Occurence</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="occurence"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Tags :</div>
              <div>
                <MenuListTags
                  :tag="tag"
                  :tags="tags"
                  keyText="name"
                  keyColor="color"
                  title="List Tags"
                  nameAdd="Add new"
                  @add="addTagsRequest"
                  @update="updateTagsRequest"
                  @remove="removeTagsRequest"
                  @chose="tag = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <span class="text--secondary subheading">Severity</span>
              <v-slider
                hide-details
                class="mt-4 mx-2"
                v-model="severity"
                :thumb-size="24"
                thumb-label="always"
              ></v-slider>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-textarea
                v-model="description"
                label="Description"
                auto-grow
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../menus/MenuListTags";
import DateMonthPicker from "../menus/DateMonthPicker";
import SelectMultipleUser from "../inputs/SelectMultipleUser";

export default {
  components: {
    MenuListTags,
    DateMonthPicker,
    SelectMultipleUser
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      name: "",
      treatBy: [],
      startDate: "",
      endDate: "",
      treatmentTaken: false,
      severity: 0,
      occurence: false,
      tag: [],
      description: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/tag", ["tags"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          treatBy: this.treatBy,
          startDate: this.startDate,
          endDate: this.endDate,
          treatmentTaken: this.treatmentTaken,
          severity: this.severity,
          occurence: this.occurence,
          tags: this.tag,
          description: this.description
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.name = "";
      this.treatBy = [];
      this.startDate = "";
      this.endDate = "";
      this.treatmentTaken = false;
      this.severity = 0;
      this.occurence = false;
      this.tag = [];
      this.description = "";
    },
    ...mapActions("ht_store/matter/partient/profile/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
