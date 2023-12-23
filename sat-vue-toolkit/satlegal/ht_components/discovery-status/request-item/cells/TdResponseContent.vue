<template>
  <td>
    <SelectInline
      :item="responseContentTypeJoin"
      :items="appConfigs.responseContentType"
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
    responseContentTypeJoin() {
      return (
        (this.appConfigs.responseContentType || []).find(x => x.value === this.dataRow.response_content) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.response_content) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

