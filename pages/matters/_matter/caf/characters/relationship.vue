<template>
  <div>
    <!--    <AllCharactersRelationshipMap :owner-id="ownerPk" height="80vh" />-->
    <RelationShipMap />
  </div>
</template>

<script>
import AllCharactersRelationshipMap from '@/sat-vue-toolkit/satlegal/views/ui/AllCharactersRelationshipMap.vue'
import RelationShipMap from '@/sat-vue-toolkit/satlegal/ht_components/list/RelationShipMap.vue'
export default {
  props: {
    ownerPk: {},
  },
  components: { RelationShipMap, AllCharactersRelationshipMap },
}
</script>

<style scoped></style>
