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
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12" class="pl-1">
              <DateMonthPicker
                label="Date"
                :value="date"
                @change="date = $event"
                :rules="[v => !!v || 'This field is required']"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12" class="pl-1">
              <v-text-field
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                v-model="name"
                append-icon="format_align_left"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pl-1 py-2">
              <div class="text--secondary subheading">Subject :</div>
              <div>
                <MenuListTags
                  :tag="subject"
                  :tags="dataSubjects"
                  keyText="name"
                  keyColor="color"
                  title="List subject"
                  nameAdd="Add new subject"
                  @add="addSubjectsRequest"
                  @update="updateSubjectsRequest"
                  @remove="removeSubjectsRequest"
                  @chose="subject = $event"
                />
              </div>
            </v-col>
            <v-col cols="12" class="pl-1 py-2">
              <div class="text--secondary subheading">Tags :</div>
              <div>
                <MenuListTags
                  :tag="tags"
                  :tags="tag"
                  keyText="name"
                  keyColor="color"
                  title="List subject"
                  nameAdd="Add new subject"
                  @add="addTagsRequest"
                  @update="updateTagsRequest"
                  @remove="removeTagsRequest"
                  @chose="tags = $event"
                />
              </div>
            </v-col>
            <v-col cols="12" class="pl-1 py-2">
              <v-select
                v-model="type"
                :items="appConfigs.typeReferences"
                item-text="name"
                item-value="id"
                label="Select type"
                persistent-hint
                return-object
                class="select"
                @change="type = $event"
              ></v-select>
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
    header: String
  },
  data() {
    return {
      valid: false,
      date: "",
      name: "",
      subject: [],
      type: "",
      tags: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/user", ["currentUser"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    ...mapActions("ht_store/matter/subjects", [
      "addSubjectsRequest",
      "updateSubjectsRequest",
      "removeSubjectsRequest"
    ]),
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),

    add() {
      if (this.$refs.form.validate()) {
        const data = {
          date: this.date,
          name: this.name,
          subject_master: this.subject,
          by: this.currentUser.pk,
          type: this.type.value,
          tags: this.tags,
          expert_witness: 1,
          attachments: []
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      (this.date = ""),
        (this.name = ""),
        (this.date = ""),
        (this.subject = ""),
        (this.type = "");
    }
  }
};
</script>
