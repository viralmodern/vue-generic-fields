<template>
  <td>
    <SelectInline
      :item="responseStatusJoin"
      :items="appConfigs.responseStatus"
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
    responseStatusJoin() {
      return (
        (this.appConfigs.responseStatus || []).find(x => x.value === this.dataRow.response_status) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.response_status) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

