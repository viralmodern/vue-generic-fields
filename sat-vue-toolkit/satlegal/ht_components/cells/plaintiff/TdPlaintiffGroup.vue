<template>
  <td>
    <v-row no-gutters>
      <ProjectLabels
        :labels="dataPlaintiffGroup"
        :listLabels="labelPlaintiff"
        keyText="name"
        keyColor="color"
        title="List plaintiff group"
        nameAdd="Add new plaintiff group"
        @addLabel="cretaePlaintiffGroup"
        @updateLabel="update"
        @removeLabel="remove"
        @choseLabel="choose"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectLabels from "../../cards/ProjectLabels";

export default {
  components: {
    ProjectLabels
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/plaintiff/plaintiffGroup", ["labelPlaintiff"]),
    dataPlaintiffGroup() {
      const result =
        this.labelPlaintiff &&
        this.labelPlaintiff.filter(x =>
          this.dataRow.plaintiffGroup.includes(x.id)
        );
      return result;
    }
  },
  methods: {
    ...mapActions("ht_store/matter/plaintiff/plaintiffGroup", [
      "getDataPlaintiffGroup",
      "create",
      "update",
      "remove"
    ]),

    cretaePlaintiffGroup(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.create(data);
    },
    choose(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e.id
      };
      this.$emit("updateTask", data);
    }
  },
  mounted() {
    this.getDataPlaintiffGroup();
  }
};
</script>
