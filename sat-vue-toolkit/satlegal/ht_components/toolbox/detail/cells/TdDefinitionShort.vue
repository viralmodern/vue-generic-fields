<template>
  <td>
    <TextAreaInline
      :value="dataRow.definition"
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