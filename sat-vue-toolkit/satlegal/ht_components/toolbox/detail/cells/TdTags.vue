<template>
  <td>
    <MenuListTags
      :tag="dataRow.tags"
      :tags="tag"
      keyText="name"
      keyColor="color"
      title="List Tags"
      nameAdd="Add new Tag"
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
import MenuListTags from "../../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/tags", ["tag"]),
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
