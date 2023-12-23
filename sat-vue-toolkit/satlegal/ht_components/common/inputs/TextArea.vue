<template>
  <TextAreaInline
    class="custom"
    :value="value"
    row="3"
    @onChange="$emit('update', $event)"
    :placeholder="placeholder"
    :isReadonly="isReadonly"
  />
</template>

<script>
import TextAreaInline from "../../inputs/TextAreaInline";
export default {
  props: {
    value: String,
    placeholder: String,
    isReadonly: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    TextAreaInline
  }
};
</script>

<style scoped>
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 100px;
}
</style>
