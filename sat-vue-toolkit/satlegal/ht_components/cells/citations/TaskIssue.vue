<template>
  <td>
    <v-row no-gutters>
      <CitationsLabels
        :labels="dataFactLabels"
        :listLabels="dataLabelIssue"
        keyColor="color"
        keyText="text"
        placeholder="Search issue"
        @choseLabel="choseLabel"
        title="Select issue"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CitationsLabels from "../../cards/CitationsLabels";
export default {
  components: {
    CitationsLabels
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/citationsIssue", ["dataLabelIssue"]),
    dataFactLabels() {
      return (
        this.dataLabelIssue &&
        this.dataLabelIssue.filter(x => {
          return this.dataRow.issue.includes(x.id);
        })
      );
    }
  },
  methods: {
    ...mapActions("ht_store/matter/citations/citationsIssue", ["getDataLabelIssue"]),
    ...mapActions("ht_store/matter/citations", ["updateTaskCitation"]),
    createdLabelIssue(e) {
      const data = {
        text: e.labelName,
        color: e.colorValue,
        id: Math.random(),
        createAt: new Date().toISOString()
      };
      this.addLabels(data);
    },
    choseLabel(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e.id
      };
      this.updateTaskCitation(data);
    }
  },
  mounted() {
    this.getDataLabelIssue();
  }
};
</script>
