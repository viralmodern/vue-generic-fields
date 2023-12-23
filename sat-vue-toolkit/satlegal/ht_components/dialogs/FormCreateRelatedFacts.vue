<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="500"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters="" class="pa-3 justify-center align-center">
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
            <v-col cols="12">
              <v-text-field
                label="Relevance"
                mask="###"
                v-model="relevance"
                :rules="[
                  v => !!v || 'This is field required',
                  v => v <= 100 || 'Number <= 100'
                ]"
                append-icon="link"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Facts :</div>
              <SelectMultiple
                :value="facts"
                :list="dataFactsReSearch"
                title="List Facts"
                labelSearch="Searach facts"
                @select="select"
              >
                <template slot-scope="{ items }" slot="section">
                  <v-chip
                    class="pa-0 ml-0"
                    v-for="item in items"
                    :key="item.id"
                    label
                    >{{ item.title }}</v-chip
                  >
                </template>
                <template slot-scope="{ item }" slot="item">
                  <v-list-item-avatar class="border">
                    <v-icon v-if="item.check">done</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content class="ml-2">
                    <v-row no-gutters class="align-center" style="width:100%">
                      <v-col cols="10">{{ item.title }}</v-col>
                    </v-row>
                  </v-list-item-content>
                </template>
              </SelectMultiple>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">RuleOfLaw :</div>
              <div class="mb-1">
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
            <v-col cols="12">
              <v-textarea
                label="Answer"
                auto-grow
                v-model="answer"
                rows="1"
                append-icon="mode_comment"
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
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    MenuListTags,
    SelectMultiple
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/ruleOfLaw", ["dataRuleOfLaw"]), // eslint-disable-line
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"]) // eslint-disable-line
  },
  data() {
    return {
      valid: false,
      relevance: "",
      facts: [],
      answer: "",
      ruleOfLaw: []
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = this.facts.filter(id => id !== idSelect);
      } else {
        data = [...this.facts, idSelect];
      }
      this.facts = data;
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          facts: this.facts,
          relevance: this.relevance,
          answer: this.answer,
          ruleOfLaw: this.ruleOfLaw
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.facts = [];
      this.relevance = "";
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
