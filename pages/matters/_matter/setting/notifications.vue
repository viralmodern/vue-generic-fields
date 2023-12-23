<template>
  <div>
    notifications
  </div>
</template>

<script>
export default {
  name: 'notifications',
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'Notifications'
    })
  }
}
</script>

<style scoped></style>
