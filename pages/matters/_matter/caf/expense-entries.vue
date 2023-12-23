<template>
  <BaseExpenseEntries>
    <nuxt-child />
  </BaseExpenseEntries>
</template>

<script>
import BaseExpenseEntries from '../../../../components/matters/caf/categories/expense-entries/BaseExpenseEntries'
export default {
  components: { BaseExpenseEntries }
}
</script>

<style scoped></style>
