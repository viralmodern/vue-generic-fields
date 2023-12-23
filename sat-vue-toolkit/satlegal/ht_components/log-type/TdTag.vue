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
      @chose="onChange"
    />
  </td>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../menus/MenuListTags";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  components: {
    MenuListTags
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/tag", ["tags"]),
    itemJoin() {
      return this.tags.filter(x => {
        return this.dataRow.tags.includes(x.id);
      });
    }
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    },
    ...mapActions("ht_store/matter/discovery/log/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
