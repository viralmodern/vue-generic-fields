<template>
  <setting-team-management />
</template>
<script>
import SettingTeamManagement from '@/components/matters/matter/settings/team-management/Index.vue'
export default {
  name: 'team-management',
  components: { SettingTeamManagement },
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'Team management',
    })
  },
}
</script>

<style scoped></style>
