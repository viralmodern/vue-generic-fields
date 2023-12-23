<template>
  <v-img :aspect-ratio="aspectRatio" :src="src">
    <template v-slot:placeholder>
      <v-row no-gutters fill-height class="align-center justify-center ma-0">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    aspectRatio: String,
    src: String
  }
};
</script>
