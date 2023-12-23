<template>
  <div>
    <slot name="header"></slot>
    <BaseTabLinksPageEntries :links="links" :vBind="{ app: false }" />
    <v-container fluid py-0>
      <nuxt-child
        v-if="hasDetail"
        :detail="detail"
        :pdf="detail.pdf"
        :text="detail.text"
      >
        <template #nlp>
          <TopBarDocumentDetailOdt
            disabled-info
            disabled-bookmark
            :root-path="rootPath"
          />
        </template>
      </nuxt-child>
    </v-container>
  </div>
</template>

<script>
import BaseTabLinksPageEntries from '~/features/odt/BaseTabLinksPageEntries'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'
import TopBarDocumentDetailOdt from '~/features/odt/TopBarDocumentDetailOdt'
export default {
  components: {
    TopBarDocumentDetailOdt,
    BtnLinkInFormation,
    BaseTabLinksPageEntries,
  },
  data() {
    return {
      detail: {},
    }
  },
  mounted() {
    this.fetchDepositionDetail()
  },
  computed: {
    hasDetail() {
      return Object.keys(this.detail).length
    },
    deposition() {
      try {
        return this.$route.params.deposition
      } catch (e) {
        return null
      }
    },
    items() {
      return [
        {
          text: 'Deposition',
          disabled: false,
          to: '/odt/deposition',
          href: '/odt/deposition',
        },
        {
          text: `${this.deposition}`,
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ]
    },
    rootPath() {
      const {
        params: { deposition, docket },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/depositions/${deposition}`
    },
    links() {
      return [
        {
          text: 'Transcript View',
          to: `${this.rootPath}`,
        },
        {
          text: 'Transcript QA',
          to: `${this.rootPath}/transcript-qa`,
        },
        {
          text: 'Transcript Analytics',
          to: `${this.rootPath}/transcript-analytics`,
        },
      ]
    },
  },
  methods: {
    async fetchDepositionDetail() {
      try {
        let res = await this.$api.get('/api/opinions/4545223/')
        this.detail = res['data']
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
