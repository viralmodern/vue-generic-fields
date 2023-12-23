<template>
  <v-row no-gutters>
    <v-icon size="20">open_in_new</v-icon>
    <span class="ml-1">{{ link }}</span>
  </v-row>
</template>
<script>
export default {
  props: {
    link : String
  }
}
</script>

