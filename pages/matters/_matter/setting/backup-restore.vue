<template>
  <div>
    backup & restore
  </div>
</template>

<script>
export default {
  name: 'backup-restore',
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'Backup & restore'
    })
  }
}
</script>

<style scoped></style>
