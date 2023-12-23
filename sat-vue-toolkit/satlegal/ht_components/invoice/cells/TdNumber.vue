<template>
  <td>
    <span v-if="!isEdit" @click="isEdit = true">{{number}}</span>
    <v-text-field
      v-else
      type="number"
      autofocus
      class="custom-text-field"
      v-model="number"
      v-on:blur="isEdit = false;$emit('update', number || 0)"
    ></v-text-field>
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
      number: 0,
      isEdit: false
    };
  },
  mounted() {
    this.number = this.dataRow[this.column.name];
  },
  watch: {
    dataRow(data) {
      this.number = data[this.column.name];
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 60px;
}
.custom-text-field /deep/ .v-text-field {
  margin: unset;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
