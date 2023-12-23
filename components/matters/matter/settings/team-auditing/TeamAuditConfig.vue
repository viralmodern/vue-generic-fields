<template>
  <div>
    <div class="d-flex align-center">
      <div class="flex-grow-1">
        <v-btn aria-readonly="true" text class="text-capitalize" small>
          <v-icon left>mdi-filter</v-icon>
          Filter by
        </v-btn>
      </div>
      <v-select
        :items="allCaf"
        dense
        v-model="value"
        flat
        outlined
        small-chips
        single-line
        solo
        hide-details
        label="Select Caf"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 1" small>
            <span>{{ item.text }}</span>
          </v-chip>
          <span v-if="index === 1" class="grey--text text-caption">
            (+{{ value.length - 1 }} others)
          </span>
        </template>
      </v-select>
      <div class="ml-2">
        <date-range />
      </div>
      <div class="ml-2">
        <autocomplete-list
          text="name"
          :solo="false"
          outlined
          placeholder="Activity By User"
        />
      </div>
    </div>
    <div>
      <results-audit-config></results-audit-config>
    </div>
  </div>
</template>

<script>
import DateRange from '../../../../utils/DateRange'
import { mapGetters } from 'vuex'
import matter from '../../../../../mixins/mx_matter'
import ResultsAuditConfig from './ResultsAuditConfig'
import AutocompleteList from '../../../../utils/AutocompleteList'

export default {
  name: 'TeamAuditConfig',
  mixins: [matter],
  components: { AutocompleteList, ResultsAuditConfig, DateRange },
  data() {
    return {
      value: [],
    }
  },
  computed: {
    ...mapGetters({
      findCafsByMatter: 'matter/cafs/findCafsByMatter',
    }),
    allCaf() {
      return this.findCafsByMatter(this.$$matterID)
    },
  },
}
</script>

<style scoped></style>
