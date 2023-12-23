<template>
  <td>
    <SelectInline
      :item="timeEntriesJoin"
      :items="listTimeEntries"
      keyText="label"
      keyColor="color"
      @select="select"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import { colorsListForAvatars } from "../../../config";
import SelectInline from "../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    timeEntriesJoin() {
      return this.listTimeEntries.find(x => x.id === this.dataRow.timeEntry) || {};
    },
    listTimeEntries() {
      return (
        (this.appConfigs || {}).expenseCategory.map((x, i) => ({
          ...x,
          color: colorsListForAvatars[i]
        })) || []
      );
    }
  },
  methods: {
    select(item) {
      this.$emit("update", item.id);
    }
  }
};
</script>
