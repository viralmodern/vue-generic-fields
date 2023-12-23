<template>
  <div>
    <TheMatterBreadcrumbs />
    <v-divider class="mt-4 mb-5" />
    <slot></slot>
  </div>
</template>

<script>
import TheMatterBreadcrumbs from './TheMatterBreadcrumbs'
export default {
  name: 'BaseMatterSetting',
  components: { TheMatterBreadcrumbs },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
