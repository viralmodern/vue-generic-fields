<template>
  <v-row no-gutters class="pl-2 py-2 align-center">
    <v-col cols="6">
      <span class="font-weight-medium subheading">Tags</span>
    </v-col>
    <v-col cols="6">
      <MenuListTags
        class="custom"
        :tag="tag"
        :tags="tags"
        keyText="name"
        keyColor="color"
        title="List Tags"
        nameAdd="Add new"
        @add="addTagsRequest"
        @update="updateTagsRequest"
        @remove="removeTagsRequest"
        @chose="$emit('change', $event)"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../../menus/MenuListTags";
export default {
  components: {
    MenuListTags
  },
  props: {
    tag: Array
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/tag", ["tags"])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  },
  mounted() {
    this.getDataTagsRequest();
  }
};
</script>

<style scoped>
.custom /deep/ .label-item {
  flex-wrap: wrap;
}
</style>
