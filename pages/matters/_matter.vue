<template>
  <div>
    <TheMatterHeader v-if="uiShowDefaultAppBar" />
    <nuxt-child @hideAppBar="hideAppBar" />
    <SettingFormFieldMatter :matter-id="$$matterId"></SettingFormFieldMatter>
  </div>
</template>
<script>
import SettingFormFieldMatter from '../../components/matters/matter/SettingFormFieldMatter'
import TheMatterHeader from '../../components/matters/matter/headers/TheMatterHeader'
import mx_matterId from '~/mixins/mx_matterId'

const named_appbar = [
  'matters-matter-caf-expense-entries',
  'matters-matter-caf-time-tracking',
  // views mode
  'matters-matter-caf-time-tracking-views',
  // caf taskboard
  'matters-matter-caf-simple-taskboard',
  // caf docket
  // 'matters-matter-caf-simple-docket'
  // 'matters-matter-caf-simple-docket-detail',
]

export default {
  components: { TheMatterHeader, SettingFormFieldMatter },
  layout: 'app',
  mixins: [mx_matterId],
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: 'Matter detail',
      item: null,
    }
  },
  async validate({ params, store, app: { $api }, error }) {
    try {
      const { matter } = params
      let currentMatter = store.getters['matters/matterDetail']
      let hasMatterDetail = currentMatter && currentMatter['pk']
      if (hasMatterDetail && matter == currentMatter['pk']) {
        return matter == currentMatter['pk']
      }
      let res = await $api.get(`/api/matters/${params.matter}/`)
      return res
    } catch (e) {
      return error({
        message: `Matter ${params.matter} not found`,
        statusCode: 1502,
      })
    }
  },
  created() {},

  async mounted() {
    try {
      let matterID = this.$$matterId
      let rs = await this.$store.dispatch('matters/fetchMatterDetail', {
        matterID,
      })
      this.$store.dispatch('matter/cafs/initCafByMatter', {
        matterId: matterID,
      })
      this.$store.dispatch('matter/members/loadMembers', { matterID })
      if (!rs.error) {
        this.item = rs.res
        this.title = rs.res.name
      }
      this.$store.dispatch('courts/load')
    } catch (e) {
      console.error(e.message)
    }
  },
  computed: {
    uiShowDefaultAppBar() {
      return !named_appbar.filter((name) => this.$route.name.startsWith(name))
        .length
    },
  },
  methods: {
    hideAppBar() {
      this.uiShowAppBar = false
    },
  },
  watch: {},
}
</script>

<style scoped></style>
