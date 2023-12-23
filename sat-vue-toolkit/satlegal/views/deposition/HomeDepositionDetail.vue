<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./Header";
export default {
  components: {
    Header
  },
  methods: {
    ...mapActions("ht_store/matter/goals", ["getDataGoalsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/subjects", ["getDataSubjectsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/discovery/deposition/source", ["getDataSourceRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/discovery/deposition/detail", ["getDataDepositionDetailRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]), // eslint-disable-line
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]), // eslint-disable-line
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const depositionId = this.$route.params.depositionId;
    this.getDataDepositionDetailRequest({matterId, depositionId});
    this.getDataGoalsRequest({matterId});
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "label"
    });
    this.getDataIssuesRequest({matterId});
    this.getDataLabelsRequest({matterId});
    this.getDataSubjectsRequest({matterId});
    this.getDataSourceRequest({matterId, depositionId});
    this.getDataCharacterRequest({matterId});
    this.getDataMembersRequest({ matterId });
  },
};
</script>
