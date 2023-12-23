<template>
  <div>
    <div class="d-flex align-center flex-wrap title_doc">
      <router-link class="text-decoration-none mr-2 caption"
                   :to="`${path}/${detail.pk}`"
                   v-if="detail.document" v-html="detail.name"/>
      <span v-else v-html="detail.name" class="mr-2 caption"/>
      <span v-if="getBadgeLabel"
            class="caption mr-2 page_badge"
            v-html="getBadgeLabel"/>
      <div v-if="isConcordancePlots">
        <v-chip color="primary" @click="getConcordancePlots"
                x-small
                dark
                class="cursor--pointer"
                label>
          Concordance Plot <v-icon small right>mdi-view-array</v-icon>
        </v-chip>
        <v-chip color="green" @click="getMentionPlots" title="Mention Passages"
                x-small
                dark
                class="cursor--pointer"
                label>
          Mention <v-icon small right>mdi-at</v-icon>
        </v-chip>
      </div>
    </div>
    <div v-if="description" class="caption description_doc" v-html="description"/>
  </div>
</template>

<script>
import { $formatFullDateTime, $$fileName } from '~/sat-vue-toolkit/functions'

export default {
  name: 'DocumentItemCell',
  filters: {
    $formatFullDateTime,
    $$fileName,
  },
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
    path: {
      type: String,
      default: () => '/#',
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getBadgeLabel() {
      try {
        let count = this.detail.page_count || 0
        count = count ? Number(count) >= 2 ? `${count} pages` : `${count} page` : ``
        return count ? `(<strong>${count}</strong>)` : ``
      }catch (e) {
        return false
      }
    },
    description() {
      try {
        return this.detail.headline || this.detail.description
      }catch (e) {
        return false
      }
    },
    isConcordancePlots() {
      try {
        return this.detail.hasOwnProperty('headline')
      }catch (e) {
        return false
      }
    }
  },
  methods: {
    getConcordancePlots(event) {
      try {
        this.$trigger('getConcordancePlots', {event, row: this.detail, options: this.options})
      }catch (e) {

      }
    },
    getMentionPlots(event) {
      try {
        this.$trigger('getMentionPlots', {event, row: this.detail, options: this.options})
      }catch (e) {

      }
    },

  }
}
</script>

<style scoped lang="scss">
  .app--compact {
    .title_doc {
      white-space: nowrap;
      flex-wrap: nowrap !important;
    }
    .description_doc {
      border: solid 1px red;
      display: none;
    }
    .page_badge {
      font-size: 0.6rem !important;
    }
  }
</style>
