<template>
  <v-row no-gutters>
    <EvidencesGrid :dataEvidences="dataEvidences" v-if="groupType ==='evidences-grid'" />
    <HearsayGrid :dataHearsay="dataHearsay" v-if="groupType ==='hearsay-grid'" />
    <Testimony :dataTestimony="dataTestimony" v-if="groupType ==='testimony-grid'" />
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import EvidencesGrid from "./group/EvidencesGrid";
import HearsayGrid from "./group/HearsayGrid";
import Testimony from "./group/Testimony";

export default {
  components: {
    EvidencesGrid,
    HearsayGrid,
    Testimony
  },
  props: {
    groupType: String
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/discovery/evidences", [
      "getDataDiscoveryEvidences",
      "getDataDiscoveryHearsayRequest",
      "getDataDiscoveryTestimonyRequest"
    ]),
    ...mapActions("ht_store/matter/attachment", ["getDataAttachmentRequest"])
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/evidences", [
      "dataEvidences",
      "dataHearsay",
      "dataTestimony"
    ])
  },
  mounted() {
    this.getDataDiscoveryEvidences(this.$route.params.matter || this.$route.params.projectId);
    this.getDataDiscoveryHearsayRequest(this.$route.params.matter || this.$route.params.projectId);
    this.getDataDiscoveryTestimonyRequest(this.$route.params.matter || this.$route.params.projectId);
    this.getDataCharacterRequest();
    this.getDataAttachmentRequest();
  }
};
</script>
