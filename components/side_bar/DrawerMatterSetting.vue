<template>
  <div>
    <top-side-bar-matter></top-side-bar-matter>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-subheader>Matter Setting</v-subheader>
      <v-list-item
        color="primary"
        :to="`/matters/${matterID}/setting/${item.path}`"
        v-for="item in list"
        :key="item.title"
        link
      >
        <v-list-item-icon class="mr-2">
          <v-icon small>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import TopSideBarMatter from './TopSideBarMatter'
export default {
  name: 'DrawerMatterSetting',
  components: { TopSideBarMatter },
  data() {
    return {
      list: [
        {
          title: 'general',
          icon: 'mdi-server',
          path: 'general'
        },
        {
          title: 'Tagables',
          icon: 'mdi-tag',
          path: 'tagables'
        },
        {
          title: 'Team Management',
          icon: 'mdi-account-multiple',
          path: 'team-management'
        },
        {
          title: 'Team Audit',
          icon: 'mdi-server-security',
          path: 'team-audit'
        },
        {
          title: 'Notifications',
          icon: 'mdi-bell-outline',
          path: 'notifications'
        },
        {
          title: 'Backup & Restore',
          icon: 'mdi-backup-restore',
          path: 'backup-restore'
        }
      ]
    }
  },
  computed: {
    matterID() {
      console.log(this.$route.params)
      try {
        return this.$route.params.matter
      } catch (e) {
        return null
      }
    }
  },
  filters: {}
}
</script>

<style scoped></style>
