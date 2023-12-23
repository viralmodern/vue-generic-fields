<template>
  <ChooseItems
    @change="change"
    :create-new-search="false"
    :items="items"
    item-text="text"
    item-value="value"
  >
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
import ChooseItems from '../../../../../../utils/ChooseItems'

export default {
  name: 'SelectModeBudgeting',
  components: { ChooseItems },
  data() {
    return {
      items: [
        {
          text: 'Expense Code',
          value: 0,
          query: 'expense_code'
        },
        {
          text: 'Expense Members',
          value: 1,
          query: 'expense_members'
        }
      ]
    }
  },
  methods: {
    change({ items }) {
      try {
        let expense_by = items[0].query
        this.$router.replace({ query: { by: expense_by } })
      } catch (e) {
        console.log('SelectModeBudgeting', e.message)
      }
    }
  },
  filters: {
    name(val) {
      try {
        return val.text
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style scoped></style>
