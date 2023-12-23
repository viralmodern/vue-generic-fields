<template>
  <td>
    <SliderPercent :value="dataRow[column.name]" type="circular" @onChange="change"/>
  </td>
</template>

<script>
import SliderPercent from "../../../../menus/SliderPercent";

export default {
  components: {
    SliderPercent
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    change(progress) {
      if (this.dataRow.status) {
        this.$emit("update", progress);
      }
    }
  }
};
</script>