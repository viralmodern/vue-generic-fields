<template>
  <div class="d-flex text-inline text-caption" ref="refTextInline">
    <span v-if="!value" class="mr-2" style="color: rgba(0,0,0,.6)">
      {{textNodata}}
    </span>
    <div v-else class="mr-2" :style="`${value ? '' : 'color: rgba(0,0,0,.6)'};white-space: pre-line;`">{{
      value
    }}</div>
    <v-icon v-if="!isReadOnly" class="icon" small @click="onClick">mdi-pencil</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    textNodata: String,
    isReadOnly: Boolean
  },
  methods: {
    onClick() {
      const data = {
        positionX: this.$refs.refTextInline.getBoundingClientRect().left,
        positionY: this.$refs.refTextInline.getBoundingClientRect().top
      };
      this.$emit("onClick", data);
    }
  }
};
</script>

<style scoped>
.text-inline:hover .icon {
  visibility: visible;
}
.icon {
  visibility: hidden;
  cursor: pointer;
}
</style>
