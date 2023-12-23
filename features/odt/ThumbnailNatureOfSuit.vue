<template>
  <article>
    <p>
      <strong v-html="title" />
      <v-chip small title="Code" v-text="code"></v-chip>
    </p>
    <p class="caption" v-html="description"></p>
  </article>
</template>

<script>
export default {
  name: 'ThumbnailNatureOfSuit',
  props: {
    code: {
      type: String,
      default: () => `320`,
    },
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
}
</script>

<style scoped></style>
