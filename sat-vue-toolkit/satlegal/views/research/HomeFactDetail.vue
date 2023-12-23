<template>
  <FactDetail :isShow="true" @cancel="close" />
</template>

<script>
import { mapActions } from "vuex";
import FactDetail from "../../ht_components/dialogs/FactDetail";
export default {
  components: {
    FactDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "facts",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/research/facts/detail/feelings", [
      "getDataFeelingsRequest"
    ]),
    ...mapActions("ht_store/project/research/facts/comparing", [
      "getFactsDifferences",
      "getFactsSimilarities"
    ])
  },
  mounted() {
    const { projectId, factId } = this.$route.params;
    this.getDataFactsResearchRequest({ matterId: projectId, page: 1 });
    this.getDataCharacterRequest();
    this.getDataFeelingsRequest();
    this.getFactsDifferences({ matterId: projectId, factId, page: 1 });
    this.getFactsSimilarities({ matterId: projectId, factId, page: 1 });
  }
};
</script>
