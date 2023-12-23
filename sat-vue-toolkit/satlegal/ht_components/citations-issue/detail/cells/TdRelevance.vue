<template>
  <td>
    <SliderPercent :value="dataRow.relevance" type="circular" @onChange="$emit('update', $event)"/>
  </td>
</template>

<script>
import SliderPercent from "../../../menus/SliderPercent";

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