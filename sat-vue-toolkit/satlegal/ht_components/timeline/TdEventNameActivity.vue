<template>
  <td>
    <TextAreaInline
      style="width:150px"
      :value="dataRow.name"
      @onChange="$emit('updateDataActivities', $event)"
    />
  </td>
</template>

<script>
import TextAreaInline from "../inputs/TextAreaInline";

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
