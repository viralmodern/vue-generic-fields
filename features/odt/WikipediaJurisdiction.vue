<template>
  <div>
    <p class="title" v-if="titleCourt">
      {{ titleCourt }}
    </p>
    <iframe
      v-if="urlCourt"
      class="iframe_jurisdiction"
      :src="urlCourt"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'WikipediaJurisdiction',
  props: {
    courtInfo: {},
  },
  computed: {
    urlCourt() {
      try {
        let { courtInfo } = this
        // return `${courtInfo.url}&output=embed`
        return `${courtInfo.url}`
      } catch (e) {
        return false
      }
    },
    titleCourt() {
      try {
        let { courtInfo } = this
        return `${courtInfo.full_name}`
      } catch (e) {
        return false
      }
    },
  },
}
</script>

<style scoped>
.iframe_jurisdiction {
  display: block;
  width: 100%;
  height: 95vh;
}
</style>
