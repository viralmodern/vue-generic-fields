<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataGoals"
      keyText="name"
      keyColor="color"
      title="List goals"
      nameAdd="Add new goals"
      lengthDisplay="3"
      @add="addGoalsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @update="updateGoalsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @remove="removeGoalsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event})"
      @chose="$emit('update', $event)"
      @onOpenMenu="onOpenMenu"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    $$$matterID() {
      try {
        return this.$route.params.matter || this.$route.params.projectId
      } catch (e) {
        console.log('$$$matterID', e.message) // eslint-disable-line
        return null
      }
    },

    ...mapGetters("ht_store/matter/goals", ["dataGoals"])
  },
  methods: {
    ...mapActions("ht_store/matter/goals", [
      "addGoalsRequest",
      "updateGoalsRequest",
      "removeGoalsRequest"
    ]),
    onOpenMenu(){
      //here
    }
  }
};
</script>
