<template>
  <div>
    <nuxt-child :documents="documents" :x="true" />
  </div>
</template>

<script>
export default {
  props: {
    documents: {},
  },
}
</script>

<style scoped></style>
