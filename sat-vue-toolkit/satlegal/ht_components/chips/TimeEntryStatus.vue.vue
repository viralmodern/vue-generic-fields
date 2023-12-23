<template>
  <v-chip small :color="item.color" class="px-1 white--text ma-1">
    <span class="ml-1">{{ item.text }}</span>
  </v-chip>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
