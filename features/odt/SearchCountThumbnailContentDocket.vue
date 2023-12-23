<template>
  <v-subheader class="px-0" v-html="content"></v-subheader>
</template>

<script>
export default {
  name: 'SearchCountThumbnailContentDocket',
  props: {
    content: {
      default: () => '',
    },
  },
}
</script>

<style scoped></style>
