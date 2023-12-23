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
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters class="px-3 py-2">
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
            <v-col cols="12">
              <div class="text--secondary subheading">Citation :</div>
              <SelectMultiple
                :value="citations"
                :list="dataHardCitation"
                title="List Citation"
                labelSearch="Search citation"
                name="citation"
                :to="{ name: 'citations', params: { projectId: 1 } }"
                keySearch="name"
                @select="select"
              >
                <template slot-scope="{ items }" slot="section">
                  <v-chip
                    class="pa-0 ml-0"
                    v-for="item in items"
                    :key="item.id"
                    label
                    >{{ item.name }}</v-chip
                  >
                </template>
                <template slot-scope="{ item }" slot="item">
                  <v-list-item-avatar class="border">
                    <v-icon v-if="item.check">done</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content class="ml-2">
                    <v-row row align-center style="width:100%">
                      <v-col cols="10">{{ item.name }}</v-col>
                    </v-row>
                  </v-list-item-content>
                </template>
              </SelectMultiple>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Tags :</div>
              <div>
                <MenuListTags
                  :tag="ruleOfLaw"
                  :tags="dataRuleOfLaw"
                  keyText="name"
                  keyColor="color"
                  title="List Rule"
                  nameAdd="Add new rule"
                  @add="addRuleOfLawRequest"
                  @update="updateRuleOfLawRequest"
                  @remove="removeRuleOfLawRequest"
                  @chose="ruleOfLaw = $event"
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
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import MenuListTags from "../menus/MenuListTags";
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    NotebookEditor,
    MenuListTags,
    SelectMultiple
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      citations: [],
      question: "",
      answer: "",
      ruleOfLaw: []
    };
  },
  computed: {
    dataHardCitation() {
      return [
        {
          id: 1,
          name: "Citation1",
          issue: [1, 2, 3],
          creator: 1,
          vulnerability: 1,
          favorable: 1,
          lastTimeUsed: "2019-02-17T11:20:10.000Z",
          treatment: 1,
          limitation: 1
        },
        {
          id: 2,
          name: "Citation2",
          issue: [1, 2, 3],
          creator: 1,
          vulnerability: 1,
          favorable: 1,
          lastTimeUsed: "2019-02-17T11:20:10.000Z",
          treatment: 1,
          limitation: 1
        },
        {
          id: 3,
          name: "Citation3",
          issue: [1, 2, 3],
          creator: 1,
          vulnerability: 1,
          favorable: 1,
          lastTimeUsed: "2019-02-17T11:20:10.000Z",
          treatment: 1,
          limitation: 1
        }
      ];
    },
    ...mapGetters("ht_store/matter/citations/ruleOfLaw", ["dataRuleOfLaw"]) // eslint-disable-line
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = this.citations.filter(id => id !== idSelect);
      } else {
        data = [...this.citations, idSelect];
      }
      this.citations = data;
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          citations: this.citations,
          question: this.question,
          answer: this.answer,
          ruleOfLaw: this.ruleOfLaw
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.citations = [];
      this.question = "";
      this.answer = "";
      this.ruleOfLaw = [];
    },
    ...mapActions("ht_store/matter/citations/ruleOfLaw", [ // eslint-disable-line
      "addRuleOfLawRequest",
      "updateRuleOfLawRequest",
      "removeRuleOfLawRequest"
    ])
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
