<template>
  <td>
    <ProjectLabels
      :labels="labesJoin"
      :listLabels="dataListLabel"
      keyText="text"
      keyColor="color"
      title="Create Label"
      nameAdd="Add new Tag"
      @addLabel="addLabels"
      @updateLabel="update"
      @removeLabel="remove"
      @choseLabel="choseLabel"
    />
  </td>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";

export default {
  components: {
    ProjectLabels
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel"]),
    labesJoin() {
      return (this.dataListLabel || []).filter(x =>
        (this.dataRow.labels || []).includes(x.id)
      );
    }
  },
  methods: {
    choseLabel(label) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "choseLabel",
          id: label.id
        }
      };
      this.updateTask(data);
    },
    update(label) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "updateLabel",
          id: label.id,
          color: label.colorValue,
          text: label.labelName
        }
      };
      this.updateLabels(label);
      this.updateTask(data);
    },
    remove(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "removeLabel",
          id
        }
      };
      this.removelabels(id);
      this.updateTask(data);
    },
    ...mapMutations("ht_store/task/detail/labels", [
      "addLabels",
      "updateLabels",
      "removelabels"
    ]),
    ...mapActions("ht_store/task/list", ["updateTask"])
  }
};
</script>
