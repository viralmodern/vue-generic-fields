<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-card-text>
        <div class="d-flex">
          <div class="mx-2">
            <label class="black--text mb-2 d-block">Period grouping</label>
            <GroupingPeriodTypeDateTime />
          </div>
          <div class="mx-2">
            <label class="black--text mb-2 d-block">Categories by</label>
            <SelectModeTopBarBudgeting />
          </div>
          <div class="mx-2">
            <label class="black--text mb-2 d-block">Date range</label>
            <SelectDateRangeTopBarBudgeting />
          </div>
          <div class="flex-grow-1"></div>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="d-flex mb-4">
      <div class="flex-grow-1 pa-3">
        Eamed value report for the period from
        <strong>1/Jan/15</strong> to <strong>18/Mar/15</strong>
      </div>
      <div class="pa-3">
        <table style="border-spacing: 5px;">
          <tr>
            <td class="text-right text-caption">Variance:</td>
            <td class="error--text">
              <strong class="mr-1">$</strong>93,995,75
            </td>
          </tr>
          <tr>
            <td class="text-right text-caption">Original Estimate:</td>
            <td><strong class="mr-1">$</strong>93,995,75</td>
          </tr>
          <tr>
            <td class="text-right text-caption">Actual:</td>
            <td><strong class="mr-1">$</strong>93,995,75</td>
          </tr>
        </table>
      </div>
    </v-card>
    <v-card class="mb-4">
      <BudgetingResultBarChart />
    </v-card>
    <v-card>
      <BudgetingResultGrid />
    </v-card>
  </v-container>
</template>

<script>
import GroupingPeriodTypeDateTime from './GroupingPeriodTypeDateTime'
import SelectModeTopBarBudgeting from './SelectModeTopBarBudgeting'
import SelectDateRangeTopBarBudgeting from './SelectDateRangeTopBarBudgeting'
import BudgetingResultGrid from './BudgetingResultGrid'
import BudgetingResultBarChart from './BudgetingResultBarChart'

export default {
  name: 'ExpenseBudgetingBase',
  components: {
    BudgetingResultBarChart,
    BudgetingResultGrid,
    SelectDateRangeTopBarBudgeting,
    SelectModeTopBarBudgeting,
    GroupingPeriodTypeDateTime,
  },
  data() {
    return {
      modeBudgeting: 'EXPENSE_CODE', // EXPENSE_CODE || 'EXPENSE_MEMBERS'
    }
  },
}
</script>

<style scoped></style>
