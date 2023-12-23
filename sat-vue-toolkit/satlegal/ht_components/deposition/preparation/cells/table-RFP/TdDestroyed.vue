<template>
  <td>
    <SelectInline
      :item="destroyedJoin"
      :items="appConfigs.destroyedType"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectInline from "../../../../menus/SelectInline";

export default {
  components: {
    SelectInline,
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    destroyedJoin() {
      return (
        (this.appConfigs.destroyedType || []).find(x => x.value === this.dataRow.destroyed) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.destroyed) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

