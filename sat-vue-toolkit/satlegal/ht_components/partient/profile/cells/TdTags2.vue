<template>
  <td>
    <MenuListTags
      :tag="dataRow[column.name]"
      :tags="tags"
      keyText="name"
      keyColor="color"
      title="List Tags"
      nameAdd="Add new"
      @add="addTagsRequest"
      @update="updateTagsRequest"
      @remove="removeTagsRequest"
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
    ...mapGetters("ht_store/matter/partient/profile/tag", ["tags"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
