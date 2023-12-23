<template>
  <td>
    <v-text-field
      :value="dataRow.countName"
      class="custom-text-field"
      @change="change"
      :rules="[v => v.length <= 512 || 'Max 512 characters']"
    ></v-text-field>
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
      if (e.length < 512) {
        const data = {
          id: this.dataRow.id,
          value: e,
          nameRow: "plantiff"
        };
        this.$emit("changeClaim", data);
      }
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
