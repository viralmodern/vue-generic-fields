<template>
  <td>
    <SelectInline
      :item="requestTypeJoin"
      :items="appConfigs.requestType"
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
    requestTypeJoin() {
      return (
        (this.appConfigs.requestType || []).find(x => x.value === this.dataRow.request_type) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.request_type) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

