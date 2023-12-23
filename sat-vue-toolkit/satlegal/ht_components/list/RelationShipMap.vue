<template>
  <div class="pa-3">
    <TableRelationShipMap
      class="custom-table"
      :items="dataAllCharacter"
      :listRelationship="dataRelationship"
      @update="update"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TableRelationShipMap from "../tables/TableRelationShipMap";
export default {
  name: 'RelationShipMap',
  components: {
    TableRelationShipMap
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["dataAllCharacter"]),
    ...mapGetters("ht_store/matter/character/relationship", ["dataRelationship"]),
    matterId() {
      return this.$route.params.matter || this.$route.params.projectId || this.$route.params.matter || this.$route.params.projectId;
    }
  },
  methods: {
    ...mapActions("ht_store/matter/character/relationship", [
      "getDataRelationshipRequest",
      "addDataRelationshipRequest",
      "updateDataRelationshipRequest",
      "removeDataRelationshipRequest"
    ]),
    ...mapActions("ht_store/matter/character2", [
      "getAllDataCharacterRequest"
    ]),
    update(data) {
      if(!data.value) {
        this.removeDataRelationshipRequest({matterId: this.matterId, id: data.id});
        return ;
      }
      if(data.id) {
        this.updateDataRelationshipRequest({matterId: this.matterId, ...data});
      } else {
        this.addDataRelationshipRequest({matterId: this.matterId, ...data})
      }
    }
  },
  mounted() {
    const matterId = this.matterId;
    this.getDataRelationshipRequest(matterId);
    this.getAllDataCharacterRequest({ matterId });
  }
};
</script>

<style>
.custom-table /deep/ td {
  width: 200px;
}
</style>
