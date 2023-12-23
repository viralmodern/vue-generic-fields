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
        <v-row no-gutters class="pa-3 justify-center align-center ">
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
              <InputColorPicker
                :name="issue.name"
                :color="issue.color"
                @change="issue = { ...issue, ...$event }"
              />
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Facts :</div>
              <SelectMultiple
                :value="linkedFact"
                :list="dataFactsReSearch"
                title="List Facts"
                labelSearch="Search facts"
                name="facts"
                :to="{ name: 'facts', params: { projectId: 1 } }"
                keySearch="title"
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
                    <v-col row align-center style="width:100%">
                      <v-col cols="10">{{ item.title }}</v-col>
                    </v-col>
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
                label="Application of fact to rule of law"
                auto-grow
                v-model="applicationOfFact"
                rows="1"
                append-icon="voicemail"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Brief answer"
                auto-grow
                v-model="briefAnswer"
                rows="1"
                append-icon="event_note"
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
import InputColorPicker from "../inputs/InputColorPicker";
import MenuListTags from "../menus/MenuListTags";
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    MenuListTags,
    SelectMultiple,
    InputColorPicker
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/ruleOfLaw", ["dataRuleOfLaw"]),
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"])
  },
  data() {
    return {
      valid: false,
      briefAnswer: "",
      linkedFact: [],
      applicationOfFact: "",
      ruleOfLaw: [],
      issue: {
        name: "",
        color: "#180404"
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = this.linkedFact.filter(id => id !== idSelect);
      } else {
        data = [...this.linkedFact, idSelect];
      }
      this.linkedFact = data;
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          linkedFact: this.linkedFact,
          briefAnswer: this.briefAnswer,
          applicationOfFact: this.applicationOfFact,
          ruleOfLaw: this.ruleOfLaw,
          issue: this.issue
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.issue = {};
      this.linkedFact = [];
      this.briefAnswer = "";
      this.applicationOfFact = "";
      this.ruleOfLaw = [];
    },
    ...mapActions("ht_store/matter/citations/ruleOfLaw", [
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
