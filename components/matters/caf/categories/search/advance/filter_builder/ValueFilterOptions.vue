<template>
  <component
    :is="layout"
    :item="item"
    avatar
    @edited-data="editData"
  ></component>
</template>

<script>
import BuilderLabels from './BuilderLabels'
import BuilderComBoBox from './BuilderComBoBox'

import BuilderDateTime from './BuilderDateTime'
import BuilderSlider from './BuilderSlider'
import BuilderTextField from './BuilderTextField'

export default {
  name: 'ValueFilterOptions',
  components: {
    BuilderTextField,
    BuilderSlider,
    BuilderDateTime,
    BuilderComBoBox,
    BuilderLabels
  },
  props: ['item'],
  computed: {
    // 'text', 'tagables', 'date', 'combobox', 'slider'
    layout() {
      try {
        switch (this.item.filter_type.value_type) {
          case 'text':
            return 'BuilderTextField'
          case 'labels':
            return 'BuilderLabels'
          case 'date':
            return 'BuilderDateTime'
          case 'combobox':
            return 'BuilderComBoBox'

          default:
            return 'BuilderSlider'
        }
      } catch (e) {
        return false
      }
    }
  },
  methods: {
    editData() {}
  }
}
</script>

<style scoped></style>
