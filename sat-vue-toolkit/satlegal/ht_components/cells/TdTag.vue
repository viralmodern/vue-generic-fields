<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="tag"
      keyText="name"
      keyColor="color"
      title="List subject"
      nameAdd="Add new subject"
      lengthDisplay="3"
      @add="addTagsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event, type: 'tag'})"
      @update="updateTagsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event, type: 'tag'})"
      @remove="removeTagsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event, type: 'tag'})"
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
    ...mapGetters("ht_store/matter/tags", ["tag"])
  },
  methods: {
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
