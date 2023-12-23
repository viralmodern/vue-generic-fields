<template>
  <TextFieldInline
    class="custom"
    :value="value"
    row="3"
    @onChange="$emit('update', $event)"
    :isReadOnly="isReadOnly"
  />
</template>
<script>
import TextFieldInline from "../../inputs/TextFieldInline";
export default {
  props: {
    value: String,
    isReadOnly: Boolean
  },
  components: {
    TextFieldInline
  }
};
</script>
<style scoped>
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 100px;
}
</style>
