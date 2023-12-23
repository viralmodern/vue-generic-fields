<template>
  <td>
    <v-row no-gutters>
      <ProjectLabels
        :labels="dataTagsIssue"
        :listLabels="issue"
        keyColor="color"
        keyText="name"
        @addLabel="createdLabelIssue"
        @updateLabel="updateTagsRequest({...$event, matterId:$route.params.matter || $route.params.projectId, type: 'issue'})"
        @removeLabel="removeTagsRequest({id: $event, matterId:$route.params.matter || $route.params.projectId, type: 'issue'})"
        @choseLabel="choseLabel"
        title="Select Issue"
        nameAdd="Creat new issue"
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
    ...mapGetters("ht_store/matter/tags", ["issue"]),
    dataTagsIssue() {
      return this.issue.filter(x => {
        return this.dataRow.issue.includes(x.id);
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
    createdLabelIssue(e) {
      const data = {
        name: e.labelName,
        color: e.colorValue,
        type: "issue",
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: this.dataRow.id
      };
      this.addTagsRequest(data);
    },
    choseLabel(e) {
      const isSome = this.dataRow.issue.some(x => x === e.id);
      const issues = !isSome
        ? [...this.dataRow.issue, e.id]
        : this.dataRow.issue.filter(x => x !== e.id);
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          issues
        }
      };
      this.updateTask(data);
    }
  }
};
</script>
