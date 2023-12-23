<template>
  <div class="content_links d-flex flex-wrap mx-n2">
    <template v-for="(item, index) in items">
      <v-card flat class="pa-2" :key="`${index}`" width="250px" :to="item.to">
        <v-alert
          color="primary"
          class="ma-0 text-no-wrap"
          border="left"
          elevation="2"
          colored-border
          :icon="item.icon"
        >
          {{ item.text }}
        </v-alert>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CardLinks',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="scss">
.content_links {
}
</style>
