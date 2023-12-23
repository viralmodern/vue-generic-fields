<template>
  <td>
    <v-text-field
      hide-details
      class="ma-0 pa-0 custom-text-field"
      @click.prevent
      v-model="newValue"
      @change="changeData"
    ></v-text-field>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object
  },
  data() {
    return {
      newValue: ""
    };
  },
  methods: {
    changeData() {
      const data = {
        id: this.dataRow.id,
        value: this.newValue,
        nameRow: "documentName"
      };
      this.$emit("changeDocument", data);
    }
  },
  mounted() {
    this.newValue = this.dataRow.documentName;
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>


