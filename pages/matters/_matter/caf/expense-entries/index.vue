<template>
  <expense />
</template>

<script>
import expenseEntries from '../../../../../components/matters/caf/categories/expense-entries/index'

export default {
  name: 'expense-entries',
  components: {
    expense: expenseEntries
  }
}
</script>

<style scoped></style>
