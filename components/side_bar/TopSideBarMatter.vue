<template>
  <v-list-item two-line :to="path" :title="nameMatter">
    <v-list-item-avatar :color="colorMatter" size="25" class="mr-4">
      <span class="white--text font-weight-bold" style="font-size: 65%;">{{
        nameMatter | $$strName
      }}</span>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-subtitle-2">
        {{ nameMatter }}
        <v-chip x-small :color="isPublic ? 'success' : 'default'">{{
          isPublic ? 'Public' : 'Private'
        }}</v-chip>
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        <strong>{{ docketNumber }}</strong>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action title="setting">
      <v-btn
        color="primary"
        text
        small
        :to="`/matters/${matterID}/setting/general`"
        icon
      >
        <img width="20" src="~/assets/img/icons8-settings.svg" />
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'TopSideBarMatter',
  filters: {
    $$strName,
  },
  computed: {
    ...mapGetters({
      matterDetail: 'matters/matterDetail',
    }),
    matterID() {
      return this.$route.params.matter || this.$route.params.projectId
    },
    path() {
      try {
        return this.matterDetail.path
      } catch (e) {
        return '/'
      }
    },
    isPublic() {
      try {
        return this.matterDetail.isPublic()
      } catch (e) {
        return false
      }
    },
    nameMatter() {
      try {
        return this.matterDetail.name
      } catch (e) {
        return ''
      }
    },
    docketNumber() {
      try {
        return this.matterDetail.docket_number
      } catch (e) {
        return ''
      }
    },
    colorMatter() {
      try {
        return '#' + this.matterDetail.color
      } catch (e) {
        return '#000000'
      }
    },
  },
}
</script>

<style scoped></style>
