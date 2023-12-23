<template>
  <ChooseItems
    v-model="select"
    multiple
    :create-new-search="false"
    item-value="code"
    item-text="text"
    :items="list"
  >
    <template v-slot:content="{ selected, on }">
      <div class="legal_box_select" v-on="on">
        <div class="flex-grow-1">
          <v-chip
            x-small
            label
            class="ma-1"
            v-for="item in selected"
            :key="item.code"
          >
            {{ item.text }}
          </v-chip>
        </div>
        <v-icon right>mdi-chevron-down</v-icon>
      </div>
    </template>
  </ChooseItems>
</template>

<script>
import ChooseItems from '../../../../../utils/ChooseItems'
import { EXPENSES_CODE } from '../../../../../../mock/fields'
export default {
  name: 'ChooseExpenseCode',
  components: { ChooseItems },
  data() {
    return {
      list: EXPENSES_CODE,
      select: ''
    }
  }
}
</script>

<style scoped></style>
