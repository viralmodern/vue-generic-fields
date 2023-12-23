<template>
  <div class="d-flex text-no-wrap text-inline text-caption" ref="refTextInline">
    <a v-if="value" class="mr-2" :href="value" target="_blank">{{value}}</a>
    <span v-else class="mr-2" :style="`${value ? '' : 'color: rgba(0,0,0,.6)'}`">
      {{value ? value : textNodata}}
    </span>
    <v-icon class="icon" small @click="onClick">mdi-pencil</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    textNodata: String,
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
