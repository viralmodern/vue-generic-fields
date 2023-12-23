<template>
  <div>
    <slot name="nlp" />
    <div class="py-2">
      <TextViewODT v-if="text" :content="text" />
    </div>
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
