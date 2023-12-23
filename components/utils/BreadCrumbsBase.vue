<template>
  <v-breadcrumbs :items="items" class="pa-0">
    <template v-slot:divider>
      <v-icon>mdi-chevron-double-right</v-icon>
    </template>
    <template v-slot:item="props">
      <v-breadcrumbs-item
        :to="props.item.to || props.item.path"
        exact
        :class="[props.item.disabled && 'disabled']"
        class="py-0"
      >
        {{ props.item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  name: 'BreadCrumbsBase',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
