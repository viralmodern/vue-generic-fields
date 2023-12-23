<template>
  <td>
    <v-switch class="switch" v-model="isSwitch" color="primary" @change="changeDisputed"></v-switch>
  </td>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isSwitch: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    changeDisputed(isSwitch) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: isSwitch,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        groupType: this.$route.params.groupType
      };
      this.updateTask(data);
    }
  },
  mounted() {
    this.isSwitch = this.dataRow.disputed;
  }
};
</script>
<style scoped>
.switch {
  width: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 25px;
}
</style>
