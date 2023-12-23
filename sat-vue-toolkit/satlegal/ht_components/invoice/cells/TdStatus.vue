<template>
  <td>
    <SelectInline
      :item="status"
      :items="invoicesStatus"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { invoicesStatus } from "../../../config";
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
      invoicesStatus
    };
  },
  computed: {
    status() {
      return this.invoicesStatus.find(x => x.id === this.dataRow.status) || {};
    }
  },
  methods: {
    select({ id }) {
      if (id !== this.dataRow.status) {
        this.$emit("update", id);
      }
    }
  }
};
</script>
