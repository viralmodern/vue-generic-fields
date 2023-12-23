<template>
  <td>
    <v-row no-gutters>
      <ProjectLabels
        :labels="dataTagsLabel"
        :listLabels="tag"
        keyColor="color"
        keyText="name"
        @addLabel="createdLabelTags"
        @updateLabel="updateTagsRequest({...$event, matterId:$route.params.matter || $route.params.projectId, type: 'tag'})"
        @removeLabel="removeTagsRequest({id: $event, matterId:$route.params.matter || $route.params.projectId, type: 'tag'})"
        @choseLabel="choseLabel"
        title="Select Tags"
        nameAdd="Creat new tags"
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
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    dataTagsLabel() {
      return this.tag.filter(x => {
        return this.dataRow.label.includes(x.id);
      });
    }
  },
  methods: {
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    createdLabelTags(e) {
      const data = {
        name: e.labelName,
        color: e.colorValue,
        type: "tag",
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: this.dataRow.id
      };
      this.addTagsRequest(data);
    },
    choseLabel(e) {
      const isSome = this.dataRow.label.some(x => x === e.id);
      const tags = !isSome
        ? [...this.dataRow.label, e.id]
        : this.dataRow.label.filter(x => x !== e.id);
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          tags
        }
      };
      this.updateTask(data);
    }
  }
};
</script>
