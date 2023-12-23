<template>
  <v-container fluid>
    <v-card>
      <v-card-text class="py-0">
        <v-row>
          <v-col cols="12" sm="12">
            <v-row>
              <v-col cols="12" sm="4">
                <label class="black--text mb-2 d-block">Expense codes:</label>
                <ChooseExpenseCode />
              </v-col>
              <v-col cols="12" sm="4">
                <label class="black--text mb-2 d-block">Members:</label>
                <ChooseMembers />
              </v-col>
              <v-col cols="12" sm="4">
                <label class="black--text mb-2 d-block">Date time:</label>
                <ChooseDateTime />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" sm="6">
        <PieChartAnalytics />
      </v-col>
      <v-col cols="12" sm="6">
        <BudgetingResultBarChart />
      </v-col>
      <v-col cols="12" sm="6">
        <LineChartAnalytics />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PieChartAnalytics from './PieChartAnalytics'
import BudgetingResultBarChart from '../budgeting/BudgetingResultBarChart'
import LineChartAnalytics from './LineChartAnalytics'
import ChooseExpenseCode from './ChooseExpenseCode'
import ChooseMembers from './ChooseMembers'
import ChooseDateTime from './ChooseDateTime'

export default {
  name: 'ExpenseAnalyticsBase',
  components: {
    ChooseDateTime,
    ChooseMembers,
    ChooseExpenseCode,
    LineChartAnalytics,
    BudgetingResultBarChart,
    PieChartAnalytics
  }
}
</script>

<style scoped></style>
