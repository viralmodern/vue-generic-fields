<template>
  <td>
    <SliderPercent :value="dataRow.percent" type="text" @onChange="change"/>
  </td>
</template>

<script>
import { mapActions } from "vuex";
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
        column: this.column.name,
        id: this.dataRow.id,
        newValue: number
      };
      this.updateTaskHightLight(data);
    },
    ...mapActions("ht_store/matter/discovery/index/detailIndex", [
      "updateTaskHightLight"
    ])
  }
};
</script>
