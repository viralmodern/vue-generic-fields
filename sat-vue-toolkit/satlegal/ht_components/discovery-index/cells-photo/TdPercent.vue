<template>
  <td>
    <SliderPercent :value="dataRow.percent" type="text" @onChange="change"/>
  </td>
</template>

<script>
import SliderPercent from "../../menus/SliderPercent";
export default {
  components: {
    SliderPercent
  },
  props: {
    idGroup: Number,
    dataRow: Object,
    column: Object,
    expanId: Number
  },
  methods: {
    change(number) {
      const data = {
        idGroup: this.idGroup,
        columnName: this.column.name,
        id: this.dataRow.id,
        newValue: number
      };
      this.$emit("updateTaskPhoto", data);
    }
  }
};
</script>
