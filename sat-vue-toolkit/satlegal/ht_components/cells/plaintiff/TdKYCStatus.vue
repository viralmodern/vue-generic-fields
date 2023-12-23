<template>
  <td>
    <v-switch class="switch" v-model="isSwitch" color="primary" @change="change"></v-switch>
  </td>
</template>
<script>
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
    change(isSwitch) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: isSwitch
      };
      this.$emit("updateTask", data);
    }
  },
  mounted() {
    this.isSwitch = this.dataRow.kycStatus;
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
