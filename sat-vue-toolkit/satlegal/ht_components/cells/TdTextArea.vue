<template>
  <td>
    <TextAreaInline
      class="custom"
      :value="dataRow[column.name]"
      row="3"
      @onChange="$emit('update', $event)"
    />
  </td>
</template>

<script>
import TextAreaInline from "../inputs/TextAreaInline";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    TextAreaInline
  }
};
</script>

<style scoped>
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 100px;
}
</style>

