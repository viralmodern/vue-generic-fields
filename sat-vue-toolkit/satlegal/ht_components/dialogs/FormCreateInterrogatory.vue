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
        <v-row no-gutters class=" justify-center align-center pa-3">
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
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12" class="mt-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Objection</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="objection"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
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
              <div class="text--secondary subheading">
                Request interrogatory :
              </div>
              <NotebookEditor
                ref="interrogatory"
                placeholder="Type your interrogatory..."
                @change="
                  interrogatory = $event;
                  validateForm();
                "
              />
              <span class="error--text">{{
                this.errorsMsg.interrogatory
              }}</span>
            </v-col>
            <v-col cols="12" class="my-2">
              <div class="text--secondary subheading">
                Response description :
              </div>
              <NotebookEditor
                ref="resDes"
                placeholder="Type your response of description..."
                @change="resDes = $event"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
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
    tags: Array,
    header: String
  },
  data() {
    return {
      valid: false,
      interrogatory: "",
      resDes: "",
      objection: false,
      tag: [],
      errorsMsg: {
        interrogatory: ""
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    validateForm() {
      const errors = {};
      if (!this.interrogatory || this.interrogatory === "<p></p>")
        errors.interrogatory = "This field is required";
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
          interrogatory: this.interrogatory,
          resDes: this.resDes,
          objection: this.objection,
          tags: this.tag
        };
        this.$emit("submit", data);
        this.clear();
        document.getElementById("content").scrollTo(0, 0);
      }
    },
    clear() {
      this.interrogatory = "";
      this.resDes = "";
      this.objection = false;
      this.tag = [];
      this.$refs.interrogatory.clearContent();
      this.$refs.resDes.clearContent();
    },
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
