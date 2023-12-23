<template>
  <td>
    <SelectInline
      :item="fulfillmentJoin"
      :items="invoicesFulfillment"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { invoicesFulfillment } from "../../../config";
import SelectInline from "../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      invoicesFulfillment
    };
  },
  computed: {
    fulfillmentJoin() {
      return (
        this.invoicesFulfillment.find(x => x.id === this.dataRow.fulfillment) ||
        {}
      );
    }
  },
  methods: {
    select({ id }) {
      if (id !== this.dataRow.fulfillment) {
        this.$emit("update", id);
      }
    }
  }
};
</script>
