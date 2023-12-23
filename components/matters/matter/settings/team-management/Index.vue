<template>
  <div>
    <div>
      <v-btn
        small
        class="text-capitalize"
        style="text-decoration: none;"
        text
        to="#team-members"
      >
        Team members
      </v-btn>
      <v-btn
        small
        class="text-capitalize"
        text
        to="#roles"
        style="text-decoration: none;"
      >
        Roles
      </v-btn>
      <v-divider />
    </div>
    <template v-if="isTeamMembers">
      <v-card-title class="text-subtitle-2 px-0">
        Team members
        <v-spacer />
        <add-team-member />
      </v-card-title>
      <v-card flat>
        <MemberList />
      </v-card>
    </template>
    <role-list v-else />
  </div>
</template>

<script>
import MemberList from './MemberList'
import RoleList from './RoleList'
import AddTeamMember from './AddTeamMember'

export default {
  name: 'setting-team-management',
  components: { AddTeamMember, RoleList, MemberList },
  data() {
    return {
      tabs: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  computed: {
    isTeamMembers() {
      return this.$route.hash === '#team-members'
    },
  },
}
</script>

<style scoped></style>
