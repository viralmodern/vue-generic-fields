<template>
  <td :style="{background: colorHLS(dataRow.credibility), color:'white'}">
    <SliderPercent :value="dataRow.credibility" type="span" @onChange="$emit('onChange', $event)"/>
  </td>
</template>

<script>
import { colorHLS } from "@/ht_helpers/color.js"
import SliderPercent from "@/sat-vue-toolkit/satlegal/ht_components/menus/SliderPercent";

export default {
  components: {
    SliderPercent
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      colorHLS
    }
  }
};
</script>
