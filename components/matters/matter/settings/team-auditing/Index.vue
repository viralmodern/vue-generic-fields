<template>
  <v-card flat>
    <v-card-text>
      <v-btn class="text-capitalize" text to="#auditing">Team Auditing</v-btn>
      <v-btn class="text-capitalize" text to="#configuration">Audit Configuration</v-btn>
      <v-divider/>
    </v-card-text>

    <v-card-text>
      <team-audit-config v-if="tabAuditing"/>
      <audit-configuration v-else/>
    </v-card-text>
  </v-card>
</template>

<script>
import AuditConfiguration from "./AuditConfiguration";
import TeamAuditConfig from "./TeamAuditConfig";

export default {
  name: "setting-team-auditing",
  components: {TeamAuditConfig, AuditConfiguration},
  data() {
    return {}
  },
  computed: {
    tabAuditing() {
      console.log('KCV', this.$route.hash)
      let hs = this.$route.hash;
      let isConfiguration = hs && hs === '#configuration'
      return !isConfiguration
    }
  }
}
</script>

<style scoped>

</style>
