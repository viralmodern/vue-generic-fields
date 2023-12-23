<template>
  <v-col>
    <v-chip
      v-for="item in items"
      :key="item.id"
      small
      :color="item.color"
      :class="[xSmall && 'v-chip--x-small','white--text']"
    >{{ item.text }}</v-chip>
  </v-col>
</template>
<script>
export default {
  props: {
    items: Array,
    xSmall: Boolean
  }
};
</script>
<style scoped>
.v-chip--x-small {
  font-size: 10px;
  height: 16px !important;
}
</style>


