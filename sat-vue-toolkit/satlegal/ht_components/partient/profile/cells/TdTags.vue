<template>
  <td>
    <v-row no-gutters>
      <ProjectLabels
        :labels="dataTags"
        :listLabels="tags"
        keyText="name"
        keyColor="color"
        title="List Tags"
        nameAdd="Add new Tag"
        @addLabel="addTags"
        @updateLabel="updateTagsRequest"
        @removeLabel="removeTagsRequest"
        @choseLabel="choseTag"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectLabels from "../../../cards/ProjectLabels";

export default {
  components: {
    ProjectLabels
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"]),
    dataTags() {
      const result =
        this.tags && this.tags.filter(x => this.dataRow.tags.includes(x.id));
      return result;
    }
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),

    addTags(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addTagsRequest(data);
    },
    choseTag(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e.id
      };
      this.$emit("updateTask", data);
    }
  },
  mounted() {
    this.getDataTagsRequest();
  }
};
</script>
