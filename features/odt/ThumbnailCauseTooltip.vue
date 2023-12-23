<template>
  <article>
    <v-btn absolute top right icon small @click="expandButton">
      <v-icon small>mdi-arrow-expand</v-icon>
    </v-btn>
    <p class="pr-3">
      <strong v-html="title" />
    </p>
    <p class="caption" v-html="description"></p>
  </article>
</template>

<script>
export default {
  name: 'ThumbnailCauseTooltip',
  props: {
    title: {
      type: String,
      default: () => `Lorem ipsum`,
    },
    description: {
      type: String,
      default: () =>
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium alias aliquid doloribus esse et explicabo, fuga, fugiat ipsum labore laboriosam mollitia non odio odit optio sequi sunt tempore voluptatibus?`,
    },
  },
  methods: {
    expandButton(e) {
      this.$emit('onExpand', { e })
    },
  },
}
</script>

<style scoped></style>
