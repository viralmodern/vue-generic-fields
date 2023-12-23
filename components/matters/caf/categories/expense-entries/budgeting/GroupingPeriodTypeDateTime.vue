<template>
  <ChooseItems :create-new-search="false">
    <template v-slot:content="{ selected, on }">
      <div class="legal_box_select" v-on="on">
        <div class="flex-grow-1">
          {{ selected | name }}
        </div>
        <v-icon right>mdi-chevron-down</v-icon>
      </div>
    </template>
  </ChooseItems>
</template>

<script>
import ChooseItems from '../../../../../utils/ChooseItems'

export default {
  name: 'GroupingPeriodTypeDateTime',
  components: { ChooseItems },
  filters: {
    name(val) {
      try {
        return val.name
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style scoped></style>
