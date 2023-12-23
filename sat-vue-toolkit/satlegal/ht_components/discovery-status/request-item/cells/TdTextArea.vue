<template>
  <td>
    <TextAreaInline
      class="custom"
      :value="dataRow[column.name]"
      @onChange="$emit('update', $event)"
    />
  </td>
</template>

<script>
import TextAreaInline from "../../../inputs/TextAreaInline";

export default {
  components: {
    TextAreaInline
  },
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>

<style scoped>
.custom /deep/ .textarea {
  width: unset;
}
</style>

