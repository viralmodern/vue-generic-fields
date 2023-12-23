<template>
  <v-row no-gutters>
    <v-col cols="12" class="mt-2">
      <v-card>
        <v-card-text>
          <span class="ml-2 text-h5">Criteria</span>
          <CheckList
            nameButton="Criteria"
            :list="dataMatterCitations.celebrity"
            @addGroup="addGroupCelebrity"
            @checkbox="checkItemCelebrity"
            @addItemInGroup="addItemInGroupCelebrity"
            @removeGroup="removeGroupCelebrity"
            @removeItem="removeItemInGroupCelebrity"
            @updateItem="updateItemInGroupCelebrity"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-divider class="mt-2"></v-divider>
    <v-col cols="12" class="mt-2">
      <v-row class="justify-space-between align-center" no-gutters>
        <span class="pa-2 text-xs-left title">Citations</span>
        <ConfigurationMenu class="text-xs-right" />
      </v-row>
      <TableCitations
        :items="dataMatterCitations.citations"
        @openAdd="isShowAddCitation = true"
        @remove="removeDataCitationRequest"
      />
      <FormCitation
        @closeModel="isShowAddCitation = false"
        @submit="
          addDataCitationsRequest($event);
          isShowAddCitation = false;
        "
        nameAction="add"
        :isShow="isShowAddCitation"
        :citationGenaral="{}"
        :inPrint="{}"
        :online="{}"
        :onlineDatabase="{}"
      />
    </v-col>
    <v-divider class="mt-2"></v-divider>
    <v-col cols="12" class="mt-2">
      <TableCitationsIssue
        :items="dataMatterCitations.issueGrid"
        @openAdd="isShowAddCitationIssue = true"
        @update="updateTaskIssue"
        @remove="removeDataIssueRequest"
      />
      <FormCreateCitationIssue
        :isShowPopup="isShowAddCitationIssue"
        header="Add new issue"
        @closeModal="isShowAddCitationIssue = false"
        @submit="
          addDataIssueRequest($event);
          isShowAddCitationIssue = false;
        "
      />
    </v-col>
    <v-row no-gutters>
      <router-view></router-view>
    </v-row>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CheckList from "../../ht_components/cards/ByzantineCheckList";
import TableCitations from "../../ht_components/tables/TableCitations";
import TableCitationsIssue from "../../ht_components/tables/TableCitationsIssue";
import ConfigurationMenu from "./ConfigurationMenu";
import FormCreateCitationIssue from "../../ht_components/dialogs/FormCreateCitationIssue";
import FormCitation from "../../ht_components/dialogs/FormCitation";

export default {
  components: {
    CheckList,
    TableCitations,
    TableCitationsIssue,
    ConfigurationMenu,
    FormCreateCitationIssue,
    FormCitation
  },
  data() {
    return {
      isShowAddCitationIssue: false,
      isShowAddCitation: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/citations", [
      "getDataCitationsFromApi",
      "addDataCitationsRequest",
      "removeDataCitationRequest",
      "addDataIssueRequest",
      "removeDataIssueRequest",

      "addGroupCelebrity",
      "checkItemCelebrity",
      "addItemInGroupCelebrity",
      "removeGroupCelebrity",
      "removeItemInGroupCelebrity",
      "updateItemInGroupCelebrity",
      "updateTaskIssue"
    ]),
    ...mapActions("ht_store/matter/citations/ruleOfLaw", ["getDataRuleOfLawRequest"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"])
  },
  computed: {
    ...mapGetters("ht_store/matter/citations", ["dataMatterCitations"])
  },
  mounted() {
    this.getDataCitationsFromApi();
    this.getDataRuleOfLawRequest();
    this.getDataFactsResearchRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      page: 1
    });
  }
};
</script>
