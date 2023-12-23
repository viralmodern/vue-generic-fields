<template>
  <div class="d-flex fill-height">
    <div style="flex: 3">
      <v-card elevation="0" outlined flat>
        <v-toolbar flat dense>
          <v-toolbar-title class="subtitle-2">Filter By</v-toolbar-title>
        </v-toolbar>
        <ChoicesCategories
          v-model="cate"
          multiple
          :categories="categories.reduceCategories"
        />
      </v-card>
    </div>
    <div class="mx-2"></div>
    <div style="flex: 9">
      <v-card elevation="0" outlined flat>
        <v-toolbar flat dense>
          <v-toolbar-title class="subtitle-2">Filter results</v-toolbar-title>
        </v-toolbar>
        <template v-for="(category, index) in categories.l">
          <v-divider :key="`choice-divider-${category.name}`" />
          <v-card-text :key="`choice-${category.name}`">
            <ChoicesChipsGroup
              multiple
              v-model="models[category.name]"
              :category="category"
              :item-value="category.itemValue"
              :item-text="category.itemText"
              :list="category.list"
            />
          </v-card-text>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import { reduceAttributes } from '@/sat-vue-toolkit/components/slick-grid/helpers/attributes'
import ChoicesChipsGroup from '~/features/odt/ChoicesChipsGroup'
import ChoicesCategories from '~/features/ChoicesCategories'
let filterRules = {
  entry_type: {
    name: 'entry_type',
  },
  filed_by: {
    name: 'filed_by',
  },
  jurisdiction: {
    name: 'jurisdiction',
  },
  nature_of_suit: {
    name: 'nature_of_suit',
  },
  cause: {
    name: 'cause',
  },
  entities: {
    name: 'entities',
  },
}
export default {
  name: 'SearchBuilderDocketTrackerOdt',
  components: { ChoicesCategories, ChoicesChipsGroup },
  props: {
    isDocket: {
      type: [Boolean, String, Number],
      default: () => false,
    },
  },
  data() {
    return {
      cate: [],
      models: {},
    }
  },
  computed: {
    categories() {
      let { cate, isDocket } = this
      let temp = []
      let f = this.$store.getters['appConfigs/getChoicesConfigByName']
      let entryTypes = f('DocketEntryType')
      let filedBy = f('DocketEntry.FiledBy')
      let courts = this.$store.getters['appConfigs/courts']
      if (isDocket) {
        temp = [
          { ...filterRules.entry_type, list: entryTypes },
          { ...filterRules.filed_by, list: filedBy },
          { ...filterRules.entities },
        ]
      } else {
        temp = [
          { ...filterRules.entry_type, list: entryTypes },
          { ...filterRules.filed_by, list: filedBy },
          {
            ...filterRules.jurisdiction,
            list: courts,
            itemText: 'short_name',
            itemValue: 'pk',
          },
          { ...filterRules.nature_of_suit },
          { ...filterRules.cause },
        ]
      }

      let reduceCategories = reduceAttributes(temp)

      let l = []
      if (cate.length === 0) {
        l = [...reduceCategories]
      } else {
        l = [...reduceCategories].filter((t) => {
          return cate.includes(t['name'])
        })
      }
      return { l, reduceCategories }
    },
  },
}
</script>

<style scoped lang="scss">
.box-choices {
  position: relative;
}

.theme--dark {
  .box-choices {
  }
}
</style>
