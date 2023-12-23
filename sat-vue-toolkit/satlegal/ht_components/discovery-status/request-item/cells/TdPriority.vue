<template>
  <td>
    <SelectInline
      :item="priorityJoin"
      :items="appConfigs.listPriority"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../../menus/SelectInline";

export default {
  components: {
    SelectInline,
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    priorityJoin() {
      return (
        (this.appConfigs.listPriority || []).find(x => x.value === this.dataRow.priority) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.priority) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

