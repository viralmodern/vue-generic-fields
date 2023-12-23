<template>
  <div>
    <div class="py-1">
      <div class="font-weight-medium subheading">Description</div>
      <v-textarea
        hide-details
        auto-grow
        :value="dataIssueDetail.description"
        @change="updateIssueDetailRequest({ description: $event })"
        class="ma-0 pa-2 custom-text-field fieldDes"
        rows="1"
      ></v-textarea>
    </div>
    <QuestionToAnswer />
    <RelatedFacts />
    <v-row no-gutters class="py-1">
      <v-col cols="12" sm="6" class="px-2">
        <div class="font-weight-medium subheading">Plaintiff Favorable</div>
        <AddListItem
          :list="dataIssueDetail.plaintiffFavorable"
          label="Plaintiff favorable"
          hint="Add new plaintiff favorable"
          @add="updateIssueDetailRequest({ plaintiffFavorable: $event })"
          @update="updateIssueDetailRequest({ plaintiffFavorable: $event })"
          @remove="updateIssueDetailRequest({ plaintiffFavorable: $event })"
        />
      </v-col>
      <v-col cols="12" sm="6" class="px-2">
        <div class="font-weight-medium subheading">Defendant Favorable</div>
        <AddListItem
          :list="dataIssueDetail.defendantFavorable"
          label="Defendant favorable"
          hint="Add new defendant favorable"
          @add="updateIssueDetailRequest({ defendantFavorable: $event })"
          @update="updateIssueDetailRequest({ defendantFavorable: $event })"
          @remove="updateIssueDetailRequest({ defendantFavorable: $event })"
        />
      </v-col>
      <v-col cols="12" sm="6" class="px-2">
        <div class="font-weight-medium subheading">Plaintiff Argument</div>
        <AddListItem
          :list="dataIssueDetail.plaintiffArgument"
          label="Plaintiff Argument"
          hint="Add new factor plaintiff argument"
          @add="updateIssueDetailRequest({ plaintiffArgument: $event })"
          @update="updateIssueDetailRequest({ plaintiffArgument: $event })"
          @remove="updateIssueDetailRequest({ plaintiffArgument: $event })"
        />
      </v-col>
      <v-col cols="12" sm="6" class="px-2">
        <div class="font-weight-medium subheading">Defendant Rebuttal</div>
        <AddListItem
          :list="dataIssueDetail.defendantRebuttal"
          label="Defendant Rebuttal"
          hint="Add new defendant rebuttal"
          @add="updateIssueDetailRequest({ defendantRebuttal: $event })"
          @update="updateIssueDetailRequest({ defendantRebuttal: $event })"
          @remove="updateIssueDetailRequest({ defendantRebuttal: $event })"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import QuestionToAnswer from "./QuestionToAnswer";
import RelatedFacts from "./RelatedFacts";
import AddListItem from "../../inputs/AddListItem";
export default {
  components: {
    QuestionToAnswer,
    RelatedFacts,
    AddListItem
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/citationsIssue/detail", [
      "dataIssueDetail"
    ]),
    ...mapGetters("ht_store/matter/citations/ruleOfLaw", ["dataRuleOfLaw"])
  },
  methods: {
    ...mapActions("ht_store/matter/citations/ruleOfLaw", [
      "addRuleOfLawRequest",
      "updateRuleOfLawRequest",
      "removeRuleOfLawRequest"
    ]),
    ...mapActions("ht_store/matter/citations/citationsIssue/detail", [
      "updateIssueDetailRequest"
    ])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
