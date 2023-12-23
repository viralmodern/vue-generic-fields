<template>
  <td>
    <SelectInline
      :item="joinInvoice"
      :items="dataInvoice"
      keyText="invoice"
      keyColor="color"
      class="select"
      @select="onChange"
    >
      <template slot="section" slot-scope="props">
        <span style="color:black">{{(props.item || {}).invoice}}</span>
      </template>
      <template slot="menu" slot-scope="props">{{(props.item || {}).invoice}}</template>
    </SelectInline>
  </td>
</template>
<script>
import SelectInline from "../menus/SelectInline";

export default {
  props: {
    dataRow: Object,
    column: Object,
    dataInvoice: Array
  },
  components: {
    SelectInline
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value.id
      };
      this.$emit("onChange", data);
    }
  },
  computed: {
    joinInvoice() {
      return (this.dataInvoice || []).find(x => x.id === this.dataRow.invoice);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
