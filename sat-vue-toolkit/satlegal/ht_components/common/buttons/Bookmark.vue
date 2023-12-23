<template>
  <v-btn class="ma-0" @click="$emit('onClickBookmark')" icon small>
    <v-icon small :color="color">mdi-bookmark</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: String
  }
};
</script>
