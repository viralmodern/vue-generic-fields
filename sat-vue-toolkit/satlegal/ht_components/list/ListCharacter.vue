<template>
  <div>
    <TableListCharacter :items="character" @update="update" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableListCharacter from "../tables/TableListCharacter";
export default {
  components: {
    TableListCharacter
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    update(data) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.updateDataCharacterRequest({ matterId, data });
    },
    ...mapActions("ht_store/matter/character", ["updateDataCharacterRequest"])
  }
};
</script>
