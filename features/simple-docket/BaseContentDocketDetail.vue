<template>
  <div>
    <slot :document="document">Content</slot>
  </div>
</template>
<script>
export default {
  name: 'BaseContentDocketDetail',
  props: {
    document: {},
  },
}
</script>

<style scoped></style>
