<template>
  <v-container fluid>
    <TextViewODT v-if="detail" :content="detail.text" />
  </v-container>
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
