<template>
  <v-row no-gutters>
    <v-list-item-avatar v-if="sizeImage" :size="sizeImage" color="grey">
      <v-img :src="imageUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-avatar v-else size="80" color="grey">
      <v-img :src="imageUrl"></v-img>
    </v-list-item-avatar>
  </v-row>
</template>
<script>
export default {
  props: {
    imageUrl: String,
    sizeImage: Number
  }
};
</script>

