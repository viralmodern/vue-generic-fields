<template>
  <div>
    <MenuListTags
      :tag="item"
      :tags="tag"
      keyText="name"
      keyColor="color"
      title="List tag"
      nameAdd="Add new tag"
      lengthDisplay="3"
      @add="addTagsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event, type: 'tag'})"
      @update="updateTagsRequest({matterId:$route.params.matter || $route.params.projectId, ...$event, type: 'tag'})"
      @remove="removeTagsRequest({matterId:$route.params.matter || $route.params.projectId, id: $event, type: 'tag'})"
      @chose="choose"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    item: Array
  },
  computed: {
    ...mapGetters("ht_store/matter/tags", ["tag"])
  },
  methods: {
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/matter/references/detail", ["updateReferencesRequest"]),
    choose(e) {
      const data = {
        column: 'tag',
        value: e
      };
      this.updateReferencesRequest(data);
    }
  }
};
</script>
