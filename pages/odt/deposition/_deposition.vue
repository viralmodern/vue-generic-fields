<template>
  <div>
    <slot name="header"></slot>
    <!-- <div class="d-flex align-center" style="border-top: solid 1px red">
      <v-breadcrumbs :items="items"
                     class="py-0"/>
      <v-spacer />
      <BtnLinkInFormation />
    </div>-->
    <BaseTabLinksPageEntries :links="links" :vBind="{ app: false }" />
    <v-container fluid>
      <nuxt-child
        v-if="hasDetail"
        :detail="detail"
        :pdf="detail.pdf"
        :text="detail.text"
      />
    </v-container>
  </div>
</template>

<script>
import BaseTabLinksPageEntries from '~/features/odt/BaseTabLinksPageEntries'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'
export default {
  components: { BtnLinkInFormation, BaseTabLinksPageEntries },
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
    links() {
      let rootPath = `/odt/deposition/${this.deposition}`
      return [
        {
          text: 'Transcript View',
          to: `${rootPath}`,
        },
        {
          text: 'Transcript QA',
          to: `${rootPath}/transcript-qa`,
        },
        {
          text: 'Transcript Analytics',
          to: `${rootPath}/transcript-analytics`,
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
