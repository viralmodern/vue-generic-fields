<template>
  <td>
    <SelectInline
      :item="factTypeJoin"
      :items="appConfigs.factType"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../menus/SelectInline";

export default {
  components: {
    SelectInline,
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    factTypeJoin() {
      return (
        (this.appConfigs.factType || []).find(x => x.value === this.dataRow[this.column.name]) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow[this.column.name]) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

