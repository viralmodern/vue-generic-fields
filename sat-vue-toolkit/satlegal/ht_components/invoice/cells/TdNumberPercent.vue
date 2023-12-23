<template>
  <td>
    <v-text-field
      type="number"
      class="custom-text-field"
      v-model="number"
      :rules="[v => v <= 100 || 'Number <= 100']"
      @change="change"
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
      number: 0
    };
  },
  methods: {
    change(value) {
      if (+value <= 100) {
        this.$emit("update", +value || 0);
      }
    }
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
  width: 50px;
}
.custom-text-field /deep/ .v-text-field {
  margin: unset;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
