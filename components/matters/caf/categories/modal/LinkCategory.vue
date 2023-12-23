<template>
  <div>
    <slot>
      <nuxt-link :to="path">
        {{text}}
      </nuxt-link>
    </slot>
  </div>
</template>

<script>
export default {
  name: "LinkCategory",
  props: {
    path: String,
    text: String
  }
}
</script>

<style scoped>

</style>
