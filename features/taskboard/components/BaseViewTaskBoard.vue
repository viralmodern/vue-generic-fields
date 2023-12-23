<template>
  <div>
    <AppHeader />
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
export default {
  name: 'BaseViewTaskBoard',
  components: { AppHeader }
}
</script>

<style scoped></style>
