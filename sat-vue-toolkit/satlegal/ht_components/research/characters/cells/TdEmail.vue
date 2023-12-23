<template>
  <td>
    <TextAreaInline :value="dataRow.avatar.email" @onChange="$emit('onChange', $event)"/>
  </td>
</template>

<script>
import TextAreaInline from "../../../inputs/TextAreaInline";
export default {
  components: {
    TextAreaInline
  },
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>
