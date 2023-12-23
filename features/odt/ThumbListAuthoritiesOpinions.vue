<template>
  <v-list dense class="panel_right_list font_courier" v-if="total">
    <v-subheader class="font-weight-black" v-if="!disabledLabel">
      {{ label }} {{ labelTotal }}
    </v-subheader>
    <template v-for="(result, index) in results">
      <v-divider v-if="index !== 0" :key="`divider-${result.pk}`" />
      <v-list-item
        :to="{ params: { opinion: result.pk } }"
        :key="`authorities-${result.pk}`"
      >
        <v-list-item-content
          class="caption font_courier"
          v-html="result.matter_name"
        >
        </v-list-item-content>
        <v-list-item-action class="caption font_courier">
          <template v-if="result.hasOwnProperty('times')">
            ({{ result.times }}
            {{ Number(result.times) > 1 ? `times` : `time` }} )
          </template>
          <template v-else> ({{ result.year }}) </template>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-list-item color="primary" :input-value="true" v-if="hasPagingResults">
      <router-link
        :to="path"
        class="caption font_courier"
        v-html="labelLinkPaging"
      />
    </v-list-item>
  </v-list>
</template>

<script>
import { $$strNumFormat } from '@/sat-vue-toolkit/functions'

export default {
  name: 'ThumbListAuthoritiesOpinions',
  filters: {
    $$strNumFormat,
  },
  props: {
    list: {
      type: [Array, Object],
      default: () => [],
    },
    height: {
      type: String,
      default: () => '45vh',
    },
    disabledLabel: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => `Results`, // 'Authorities' | 'Cited By'
    },
    labelLinkPaging: {
      type: String,
      default: () => `View All Results`, // 'View all Authorities' | 'View Citing Opinions'
    },
    path: {
      type: String,
      default: '#',
    },
  },
  computed: {
    results() {
      try {
        return this.list.results
      } catch (e) {
        return []
      }
    },
    total() {
      let total = 0
      try {
        total = this.list.count
      } catch (e) {
        total = this.results.length
      }
      return total
    },
    labelTotal() {
      return this.total ? `(${$$strNumFormat(this.total)})` : ``
    },
    hasPagingResults() {
      return this.total > 20
    },
  },
}
</script>

<style lang="scss">
.v-application .caption.font_courier {
  font-family: 'Courier Prime', monospace !important;
  /*border: solid 1px red;*/
}
</style>
<style scoped lang="scss">
.v-application {
  .font_courier {
    font-family: 'Courier Prime', monospace !important;
  }
}
.panel_right_list.font_courier {
  font-family: 'Courier Prime', monospace !important;
  * {
    font-family: 'Courier Prime', monospace !important;
  }
}
</style>
