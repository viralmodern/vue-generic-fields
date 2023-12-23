<template>
  <td>
    <TextAreaInline
      class="custom"
      :value="dataRow[column.name]"
      row="2"
      @onChange="change"
    />
  </td>
</template>

<script>
import TextAreaInline from "../../../inputs/TextAreaInline";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    TextAreaInline
  },
  methods: {
    change(e) {
      this.$emit('update', e);
    }
  }
};
</script>

<style scoped>
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 100px;
}
</style>

