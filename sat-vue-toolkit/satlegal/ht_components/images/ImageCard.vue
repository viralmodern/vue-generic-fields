<template>
  <v-img :src="imageUrl" aspect-ratio="1" :max-width="maxWidth" :max-height="maxHeight">
    <slot name="cardImageText" />
  </v-img>
</template>
<script>
export default {
  props: {
    maxWidth: String,
    maxHeight: String,
    imageUrl: String
  }
};
</script>
