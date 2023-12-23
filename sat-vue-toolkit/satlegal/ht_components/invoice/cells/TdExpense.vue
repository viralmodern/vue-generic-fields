<template>
  <td>
    <SelectInline
      :item="expenseJoin"
      :items="listExpense"
      keyText="name"
      keyColor="color"
      @select="select"
    />
  </td>
</template>

<script>
import { listExpense, colorsListForAvatars } from "../../../config.js";
import SelectInline from "../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object,
  },
  computed: {
    expenseJoin() {
      return this.listExpense.find(x => x.id === this.dataRow.expense) || {};
    }
  },
  data() {
    return {
      listExpense: listExpense.map((x, i) => ({...x, color: colorsListForAvatars[i]}))
    };
  },
  methods: {
    select(item) {
      this.$emit('update', item.id)
    }
  }
};
</script>
