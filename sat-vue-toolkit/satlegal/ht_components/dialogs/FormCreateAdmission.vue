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
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12" class="mt-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Admit</span>
                &nbsp;&nbsp;
                <v-switch hide-details class="ma-0" v-model="admit"></v-switch>
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
                Admission description :
              </div>
              <NotebookEditor
                ref="admissionDes"
                placeholder="Type your request of description..."
                @change="
                  admissionDes = $event;
                  validateForm();
                "
              />
              <span class="error--text">{{ this.errorsMsg.admissionDes }}</span>
            </v-col>
            <v-col cols="12" class="my-2">
              <div class="text--secondary subheading">
                Response description :
              </div>
              <NotebookEditor
                ref="admissionResDes"
                placeholder="Type your response of description..."
                @change="admissionResDes = $event"
              />
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
      admissionDes: "",
      admissionResDes: "",
      admit: false,
      tag: [],
      errorsMsg: {
        admissionDes: ""
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    validateForm() {
      const errors = {};
      if (!this.admissionDes || this.admissionDes === "<p></p>")
        errors.admissionDes = "This field is required";
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
          admissionDes: this.admissionDes,
          admissionResDes: this.admissionResDes,
          admit: this.admit,
          tags: this.tag
        };
        this.$emit("submit", data);
        this.clear();
        document.getElementById("content").scrollTo(0, 0);
      }
    },
    clear() {
      this.admissionDes = "";
      this.admissionResDes = "";
      this.admit = false;
      this.tag = [];
      this.$refs.admissionDes.clearContent();
      this.$refs.admissionResDes.clearContent();
    },
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
