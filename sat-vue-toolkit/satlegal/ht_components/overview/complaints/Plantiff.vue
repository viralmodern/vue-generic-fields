<template>
  <td>
    <v-textarea
      hide-details
      name="input-7-1"
      :value="dataRow.plaintiff"
      class="ma-0 pa-0 custom-text-field"
      @change="change"
      rows="1"
    ></v-textarea>
  </td>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    dataRow: Object
  },
  methods: {
    change(e) {
      const data = {
        id: this.dataRow.id,
        value: e,
        nameRow: "plantiff"
      };
      this.$emit("changeComplaint", data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
