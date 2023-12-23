<template>
  <table-expense-logs />
</template>

<script>
import TableExpenseLogs from './logs/TableExpenseLogs'

export default {
  name: 'ExpenseCalendarBase',
  components: {
    TableExpenseLogs
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
