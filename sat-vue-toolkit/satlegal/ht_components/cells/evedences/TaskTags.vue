<template>
  <td>
    <v-row no-gutters>
      <MenuListTags
        :tag="dataRow.tags"
        :tags="tag"
        keyText="name"
        keyColor="color"
        title="List Tags"
        nameAdd="Add new Tag"
        lengthDisplay="3"
        @add="
          addTagsRequest({
            matterId:$route.params.matter || $route.params.projectId,
            ...$event,
            type: 'tag'
          })
        "
        @update="
          updateTagsRequest({
            matterId:$route.params.matter || $route.params.projectId,
            ...$event,
            type: 'tag'
          })
        "
        @remove="
          removeTagsRequest({
            matterId:$route.params.matter || $route.params.projectId,
            id: $event,
            type: 'tag'
          })
        "
        @chose="chooseTag($event)"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../../menus/MenuListTags";

export default {
  data() {
    return {
      tag: null
    };
  },
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
    ]),
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    chooseTag(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        groupType: this.$route.params.groupType
      };
      this.updateTask(data);
    }
  }
};
</script>
