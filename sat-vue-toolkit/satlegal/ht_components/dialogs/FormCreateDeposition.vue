<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="750"
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
            <v-col cols="12" sm="6" class="pr-1">
              <SelectMultipleUser
                :rules="[v => !!v.length || 'This field is required']"
                label="Asker"
                :user="asker"
                :users="listMembers.filter(x => x.id !== currentUser.pk)"
                @change="asker = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <SelectMultipleUser
                :rules="[v => !!v || 'This field is required']"
                label="Respondent"
                :user="respondent"
                :users="listCharacters"
                @change="respondent = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
              />
            </v-col>
            <v-col cols="12" sm="6" class="pr-1">
              <TimePicker
                :rules="[v => !!v || 'This field is required']"
                :value="time"
                @change="time = $event"
                append-icon="query_builder"
              />
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <div class="text--secondary subheading">Tags :</div>
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
              <div class="text--secondary subheading">Question :</div>
              <NotebookEditor
                placeholder="Type your question..."
                @change="question = $event"
                @clearContent="clearContentQuestion = $event"
              />
            </v-col>
            <v-col cols="12" class="my-2">
              <div class="text--secondary subheading">Answer :</div>
              <NotebookEditor
                placeholder="Type your Answer..."
                @change="answer = $event"
                @clearContent="clearContentAnswer = $event"
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
import { mapGetters, mapActions } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import TimePicker from "../menus/TimePicker";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    NotebookEditor,
    SelectMultipleUser,
    TimePicker,
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    listMembers: Array,
    listCharacters: Array,
    tags: Array,
    header: String
  },
  data() {
    return {
      valid: false,
      asker: [],
      respondent: "",
      question: "",
      answer: "",
      tag: [],
      time: "",
      clearContentQuestion: null,
      clearContentAnswer: null
    };
  },
  computed: {
    ...mapGetters("ht_store/user", ["currentUser"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          asker: this.asker,
          respondent: this.respondent,
          question: this.question,
          answer: this.answer,
          tags: this.tag,
          time: this.time
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
        document.getElementById("content").scrollTo(0, 0);
      }
    },
    clear() {
      this.asker = [];
      this.respondent = "";
      this.question = "";
      this.answer = "";
      this.tag = [];
      this.time = "";
      if (this.clearContentQuestion) {
        this.clearContentQuestion();
      }
      if (this.clearContentAnswer) {
        this.clearContentAnswer();
      }
    },
    ...mapActions("ht_store/matter/discovery/toolbox/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
