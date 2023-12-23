<template>
  <v-img v-if="imageUrl" :src="imageUrl" :aspect-ratio="aspectRatio" :min-height="minHeight"></v-img>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    minHeight: String,
    aspectRatio: String
  }
};
</script>