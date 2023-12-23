<template>
  <td>
    <SliderPercent :value="dataRow[column.name]" type="circular" @onChange="$emit('update', $event)" />
  </td>
</template>

<script>
import SliderPercent from "../menus/SliderPercent";

export default {
  components: {
    SliderPercent
  },
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
