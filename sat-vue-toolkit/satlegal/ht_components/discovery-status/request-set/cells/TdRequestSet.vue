<template>
  <td>
    <TextAreaInline class="ml-2" :value="dataRow.name" @onChange="$emit('update', $event)" />
  </td>
</template>
<script>
import TextAreaInline from "../../../inputs/TextAreaInline";
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
