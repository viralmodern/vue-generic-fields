<template>
  <td>
    <SelectInline
      :item="requestStatusJoin"
      :items="appConfigs.requestStatus"
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
    requestStatusJoin() {
      return (
        (this.appConfigs.requestStatus || []).find(x => x.value === this.dataRow.request_status) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.request_status) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

