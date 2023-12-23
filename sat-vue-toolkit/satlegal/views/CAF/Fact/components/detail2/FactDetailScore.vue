<template>
  <div>
    <v-divider></v-divider>
    <div class="mt-2">
      <TableFactEvidence
        @onChange="changeEvidence"
        :items="items.scoreEvidence"
        class="py-2 custom-table"
      />
      <TableFactCharacter
        @onChange="changeChracter"
        :items="scoreCharacter"
        class="py-2 custom-table"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TableFactEvidence from "../../../tables/TableFactEvidence";
import TableFactCharacter from "../../../tables/TableFactCharacter";
export default {
  components: {
    TableFactEvidence,
    TableFactCharacter
  },
  props: {
    items: Object
  },
  computed: {
    scoreCharacter() {
      const clone = JSON.parse(JSON.stringify(this.items.scoreCharacter || []));
      const list = clone.map(x => {
        if (x.character) {
          const populateCharacter = (this.character || []).find(
            j => j.id === x.character
          );
          if (populateCharacter) x.character = populateCharacter;
        }
        return x;
      });
      return list;
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    changeEvidence(data) {
      this.updateEvidenceRequest(data);
    },
    changeChracter(data) {
      this.updateCharacterRequest(data);
    },
    ...mapActions("ht_store/project/research/facts/detail/scoreCharacter", [
      "updateCharacterRequest"
    ]),
    ...mapActions("ht_store/project/research/facts/detail/scoreEvidence", [
      "updateEvidenceRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  mounted() {
    this.getDataCharacterRequest();
  }
};
</script>
<style scoped>
.custom-table /deep/ td {
  width: 200px;
}
</style>
