<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" persistent width="500">
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
          <v-col cols="12">
            <div class="text--secondary subheading">Tags</div>
            <div>
              <MenuListTags
                :tag="tag"
                :tags="dataTags"
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
            <div class="text--secondary subheading">Characters</div>
            <div>
              <MenuCharacters
                :value="characters"
                :listCharacters="dataCharacters"
                @select="characters = $event"
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
import MenuCharacters from "../menus/MenuCharacters";

export default {
  components: {
    MenuListTags,
    MenuCharacters
  },
  props: {
    isShowPopup: Boolean,
    dataTags: Array,
    dataCharacters: Array,
    header: String
  },
  data() {
    return {
      valid: false,
      name: "",
      character: "",
      description: "",
      tag: [],
      characters: []
    };
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
          characters: this.characters
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.$refs.form.resetValidation();
      this.name = "";
      this.description = "";
      this.tag = [];
      this.characters = [];
    },
    ...mapActions("ht_store/matter/discovery/toolbox/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
