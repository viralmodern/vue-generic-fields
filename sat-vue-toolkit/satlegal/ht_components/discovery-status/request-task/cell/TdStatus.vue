<template>
  <td>
    <SelectInline
      :item="itemJoin"
      :items="(this.appConfigs.taskStatus || [])"
      keyText="name"
      keyColor="color"
      class="select"
      @select="onChange"
    />
  </td>
</template>

<script>
import SelectInline from "../../../menus/SelectInline";
import { mapGetters } from "vuex";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  components: {
    SelectInline
  },
  data() {
    return {
      type: ""
    };
  },
  computed: {
    itemJoin() {
      return (this.appConfigs.taskStatus || []).find(
        x => x.value === this.dataRow.status
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onChange(value) {
      this.$emit("update", value.id);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
