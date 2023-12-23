<template>
  <div @click="$emit('click-row', { item, attributes: attributesOpinions })">
    <p class="mb-1">
      <router-link
        :to="`${pathParent}/${item.id}`"
        class="subtitle-2 text-decoration-none"
      >
        {{ item.caseName }} ({{ item.dateFiled | $$getYear }})
      </router-link>
      <BtnLinkInFormation
        icon
        end-point="/api/opinions/"
        :attributes="attributesOpinions"
        main-cell-id="matter_name"
        :row="item"
        :row-id="item.id"
        :is-owner-row="false"
      />
      <slot name="attach-title-right"> </slot>
    </p>
    <div class="d-flex align-end mb-2">
      <p class="caption ma-0">
        <strong>{{ item.dateFiled | $$formatFullDate }}</strong>
      </p>
      <v-spacer />
      <div>
        <v-btn
          text
          input-value="true"
          active-class="primary--text"
          x-small
          rounded
          class="text-capitalize caption"
        >
          Authorities
          <template v-if="item.citation">
            {{ item.citation.length ? `(${item.citation.length})` : `` }}
          </template>
        </v-btn>
        <v-btn
          text
          input-value="true"
          active-class="primary--text"
          x-small
          rounded
          class="text-capitalize caption"
        >
          Cited By
          <template v-if="item.citeCount">{{
            item.citeCount ? `(${item.citeCount})` : ``
          }}</template>
        </v-btn>
      </div>
    </div>
    <div>
      <p class="caption" v-html="item.snippet"></p>
    </div>
  </div>
</template>

<script>
import {
  $$arrToString,
  $$formatFullDate,
  $$getYear,
  $$strNumFormat,
} from '@/sat-vue-toolkit/functions'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'

export default {
  name: 'SearchResultsInOpinionsItem',
  components: { BtnLinkInFormation },
  filters: {
    $$arrToString,
    $$formatFullDate,
    $$strNumFormat,
    $$getYear,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    attributesOpinions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    pathParent() {
      return `/odt/opinions`
    },
  },
  methods: {},
}
</script>

<style scoped></style>
