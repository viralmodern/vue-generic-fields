<template >
  <td class="custom">
    <v-select
      hide-details
      menu-props="auto"
      :items="items"
      :value="dataRow[column.name]"
      @change="$emit('update', $event)"
    ></v-select>
  </td>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    let year = 1920;
    [...new Array(200)].forEach(() => this.items.push(year++));
  },
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>


<style scoped>
.custom /deep/ .v-text-field {
  margin: 0px;
  padding: 0px;
  width: 80px;
}
.custom /deep/ .v-select__selections {
  font-size: 13px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom /deep/ .v-input__append-inner {
  display: none;
}
</style>
