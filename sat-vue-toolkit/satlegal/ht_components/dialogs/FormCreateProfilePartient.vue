<template>
  <v-dialog persistent :value="isShowPopup" @input="closeDialog" width="500">
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
      <v-form ref="form" v-model="valid">
        <v-row class="px-3 py-2" no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="create"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="patientType"
              label="Type"
              item-text="name"
              item-value="id"
              v-model="type"
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <div class="text--secondary subheading">Tags</div>
            <div>
              <MenuListTags
                :tag="tag"
                :tags="tags"
                keyText="name"
                keyColor="color"
                title="List Tags"
                nameAdd="Add new Tag"
                @add="addTagsRequest"
                @update="updateTagsRequest"
                @remove="removeTagsRequest"
                @chose="tag = $event"
              />
            </div>
          </v-col>
          <v-col cols="12">
            <v-textarea
              :rules="[v => !!v || 'This field is required']"
              v-model="description"
              label="Description"
              auto-grow
              rows="1"
              append-icon="assignment"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
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
import { mapActions } from "vuex";
import { patientType } from "../../config";
import MenuListTags from "../menus/MenuListTags";

export default {
  props: {
    isShowPopup: Boolean,
    tags: Array,
    header: String
  },
  data() {
    return {
      valid: false,
      name: "",
      description: "",
      tag: [],
      type: "",
      patientType
    };
  },
  components: {
    MenuListTags
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          description: this.description,
          tags: this.tag,
          type: this.type,
          createdAt: new Date().toISOString(),
          creator: 2
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.name = "";
      this.description = "";
      this.tag = [];
      this.type = "";
    },
    ...mapActions("ht_store/matter/partient/profile/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
