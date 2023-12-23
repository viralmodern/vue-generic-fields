<template>
  <td>
    <SelectInline
      :item="favorableTypeJoin"
      :items="appConfigs.favorableType"
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
    favorableTypeJoin() {
      return (
        (this.appConfigs.favorableType || []).find(x => x.value === this.dataRow.favorable) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    select({ value }) {
      if (value !== this.dataRow.favorable) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

