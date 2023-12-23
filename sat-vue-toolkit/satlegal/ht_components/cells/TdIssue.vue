<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataIssues"
      keyText="name"
      keyColor="color"
      title="List issues"
      nameAdd="Add new issues"
      lengthDisplay="3"
      @add="addIssuesRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @update="updateIssuesRequest({matterId:$route.params.matter || $route.params.projectId, ...$event})"
      @remove="removeIssuesRequest({matterId:$route.params.matter || $route.params.projectId, id: $event})"
      @chose="$emit('update', $event)"
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
    ...mapGetters("ht_store/matter/issues", ["dataIssues"])
  },
  methods: {
    ...mapActions("ht_store/matter/issues", [
      "addIssuesRequest",
      "updateIssuesRequest",
      "removeIssuesRequest"
    ])
  }
};
</script>
