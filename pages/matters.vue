<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'app',
  head() {
    return {
      title: 'All Matter'
    }
  },
  data() {
    return {
      name: ''
    }
  },
  async mounted() {},

  methods: {},
  watch: {}
}
</script>

<style scoped></style>
