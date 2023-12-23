<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="dataDeskIssue"
      keyText="name"
      keyColor="color"
      title="List Rule"
      nameAdd="Add new"
      @add="addDeskIssueRequest"
      @update="updateDeskIssueRequest"
      @remove="removeDeskIssueRequest"
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
    ...mapGetters("ht_store/task/list/issue", ["dataDeskIssue"])
  },
  methods: {
    ...mapActions("ht_store/task/list/issue", [
      "addDeskIssueRequest",
      "updateDeskIssueRequest",
      "removeDeskIssueRequest"
    ])
  }
};
</script>
