<template>
  <div>
    <TextViewODT v-if="detail" :content="detail.text" />
  </div>
</template>

<script>
import TextViewODT from '~/features/odt/TextViewODT'
export default {
  components: { TextViewODT },
  props: {
    detail: {},
  },
}
</script>

<style scoped></style>
