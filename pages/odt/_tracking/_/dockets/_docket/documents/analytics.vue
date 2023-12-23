<template>
  <div>
    <div class="d-flex pa-2">
      <v-spacer />
      <div>
        <template v-for="link in links">
          <v-btn
            active-class="primary--text"
            :to="link.to"
            small
            text
            class="text-capitalize caption ml-2"
          >
            {{ link.text }}
          </v-btn>
        </template>
      </div>
    </div>
    <v-divider style="border-color: rgba(0, 0, 0, 0.05)" />
    <v-container fluid>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import BaseTabLinksPageEntries from '~/features/odt/BaseTabLinksPageEntries'
export default {
  components: { BaseTabLinksPageEntries },
  computed: {
    rootPath() {
      try {
        let {
          params: { docket },
        } = this.$route
        return `${this.$$rootPathDocketOdt}/${docket}/documents/analytics`
      } catch (e) {
        return false
      }
    },
    links() {
      return [
        {
          text: 'Document- Entry Type Portrait',
          to: `${this.rootPath}/document-entry-type-portrait`,
        },
        {
          text: 'Document Mentioned-Entity',
          to: `${this.rootPath}/document-mentioned-entity`,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
