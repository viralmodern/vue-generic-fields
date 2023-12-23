<template>
  <div class="py-2">
    <TextViewODT v-if="text" :content="text" />
  </div>
</template>

<script>
import TextViewODT from '~/features/odt/TextViewODT'
export default {
  components: { TextViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
  },
}
</script>

<style scoped></style>
