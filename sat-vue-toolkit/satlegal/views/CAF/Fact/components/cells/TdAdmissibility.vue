<template>
  <td :style="{background: colorHLS(dataRow.admissibility), color:'white'}">
    <SliderPercent :value="dataRow.admissibility" type="span" @onChange="$emit('onChange', $event)"/>
  </td>
</template>

<script>
import { colorHLS } from "@/ht_helpers/color"
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
