<template>
  <v-card flat>
    <v-row>
      <v-col cols="6" class="py-0">
        <v-card-title class="pt-0">Expenses</v-card-title>
        <v-expansion-panels
          multiple
          :flat="flat"
          :focusable="focusable"
          :readonly="readonly"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <div class="text-subtitle-2">condo</div>
                <div class="flex-grow-1 d-flex justify-end">
                  <strong class="error--text">–$ 456</strong>
                  <v-divider vertical class="mx-4" />
                  <strong>100%</strong>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">condo / condo fees 1</div>
                  <div class="flex-grow-1 d-flex justify-end pr-6">
                    <strong class="error--text v-subheader">–$ 104.88</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">23%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="23"
                  color="error"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">condo / condo fees 2</div>
                  <div class="flex-grow-1 d-flex justify-end pr-6">
                    <strong class="error--text v-subheader">–$ 351,12</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">77%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="77"
                  color="error"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <div class="text-subtitle-2">Hosting</div>
                <div class="flex-grow-1 d-flex justify-end">
                  <strong class="error--text">–$ 456</strong>
                  <v-divider vertical class="mx-4" />
                  <strong>100%</strong>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">condo / condo fees</div>
                  <div class="flex-grow-1 d-flex justify-end pr-1">
                    <strong class="error--text v-subheader">–$ 104.88</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">23%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="23"
                  color="error"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">condo / condo fees</div>
                  <div class="flex-grow-1 d-flex justify-end pr-1">
                    <strong class="error--text v-subheader">–$ 351,12</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">77%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="77"
                  color="error"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div>
          <!--          <TreemapExpense />-->
        </div>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-card-title class="pt-0">Incomes</v-card-title>
        <v-expansion-panels
          multiple
          :flat="flat"
          :focusable="focusable"
          :readonly="readonly"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <div class="text-subtitle-2">AWS</div>
                <div class="flex-grow-1 d-flex justify-end">
                  <strong class="success--text">+$ 456</strong>
                  <v-divider vertical class="mx-4" />
                  <strong>100%</strong>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">aws / services</div>
                  <div class="flex-grow-1 d-flex justify-end pr-1">
                    <strong class="success--text v-subheader">+$ 104.88</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">23%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="23"
                  color="success"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
              <div>
                <v-divider />
                <div class="d-flex align-center">
                  <div class="v-subheader">condo / condo fees</div>
                  <div class="flex-grow-1 d-flex justify-end pr-1">
                    <strong class="success--text v-subheader">+$ 351,12</strong>
                    <v-divider vertical class="mx-4" />
                    <strong class="v-subheader">77%</strong>
                  </div>
                </div>
                <v-progress-linear
                  value="77"
                  color="success"
                  background-opacity="0.3"
                  height="2"
                ></v-progress-linear>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TreemapExpense from './TreemapExpense'
export default {
  name: 'BreakDownExpense',
  components: { TreemapExpense },
  data() {
    return {
      headers: [
        {
          text: 'Expense name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Category', value: 'category' },
        { text: 'Expense', value: 'expense' },
        { text: 'Expense Percent', value: 'expense_percent' },
        { text: '', value: 'data-table-expand' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          category: 159,
          expense: 159,
          expense_percent: 35,
        },
        {
          name: 'Ice cream sandwich',
          category: 237,
          expense: 159,
          expense_percent: 35,
        },
      ],

      accordion: false,
      popout: false,
      inset: false,
      multiple: false,
      disabled: false,
      readonly: false,
      focusable: false,
      flat: true,
      hover: false,
      tile: false,
    }
  },
}
</script>

<style scoped lang="scss">
.grid-container {
  border: solid 1px red;
  display: flex;
}
</style>
