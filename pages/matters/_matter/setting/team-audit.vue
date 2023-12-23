<template>
  <setting-team-auditing />
</template>

<script>
import SettingTeamAuditing from '../../../../components/matters/matter/settings/team-auditing/Index'
export default {
  name: 'team-audit',
  components: { SettingTeamAuditing },
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'Team audit'
    })
  }
}
</script>

<style scoped></style>
