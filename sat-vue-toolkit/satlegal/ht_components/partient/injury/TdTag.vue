<template>
  <td>
    <MenuListTags
      :tag="dataRow.tags"
      :tags="tags"
      keyText="name"
      keyColor="color"
      title="List Tags"
      nameAdd="Add new Tag"
      @add="addTagsRequest"
      @update="updateTagsRequest"
      @remove="removeTagsRequest"
      @chose="chooseTag"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/tag", ["tags"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    chooseTag(e) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: e
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
