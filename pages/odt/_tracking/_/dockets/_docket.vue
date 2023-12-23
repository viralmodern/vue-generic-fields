<template>
  <BaseDocketOdtEntries :root-path="rootPath">
    <v-card class="background-transparent" flat tile :loading="loading">
      <nuxt-child :key="`${$route.params.docket}`" />
      <!--<TheBubbleChatBot />-->
    </v-card>
  </BaseDocketOdtEntries>
</template>

<script>
import TheBubbleChatBot from '~/features/chatbot/TheBubbleChatBot'
import {
  mutations,
  actions,
  docketDetail,
} from '~/features/odt/store/docketOdtDetail'
import BaseDocketOdtEntries from '~/features/odt/BaseDocketOdtEntries'
export default {
  layout: 'odt',
  components: {
    BaseDocketOdtEntries,
    TheBubbleChatBot,
  },
  data() {
    return {
      loading: false,
    }
  },
  head() {
    return {
      title: this.docketTitle,
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    docketDetail() {
      return docketDetail.data
    },
    docketTitle() {
      try {
        return this.docketDetail['case_name']
      } catch (e) {
        return ''
      }
    },
    rootPath() {
      let { $$rootPathDocketOdt } = this
      let {
        params: { docket },
      } = this.$route
      return `${$$rootPathDocketOdt}/${docket}`
    },
  },
  methods: {
    async getDetail() {
      try {
        this.loading = true
        const {
          params: { docket, pathMatch },
        } = this.$route
        let params = {}
        if (this.$$isTrackerDocketsOdt) {
          params = {
            trackerlink__tracker: pathMatch,
          }
        }
        await actions.fetchDocketDetail(docket, this.$api, params)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  destroyed() {
    mutations.updateDetail(null)
  },
}
</script>

<style scoped></style>
