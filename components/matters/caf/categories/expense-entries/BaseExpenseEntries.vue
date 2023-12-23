<template>
  <div>
    <v-app-bar extended fixed app>
      <v-toolbar-title>Expense Entries</v-toolbar-title>
      <v-spacer />
      <v-btn color="primary" rounded @click="uiShowCreateExpense = true">
        <v-icon>mdi-plus</v-icon>
        Add Expense
      </v-btn>
      <template #extension>
        <v-tabs
          v-model="tab"
          slider-color="warning"
          background-color="transparent"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.text"
            exact
            :to="`${rootMatterPath}${tab.to}`"
            class="text-capitalize text-subtitle-2 black--text"
          >
            <v-icon small left>{{ tab.icon }}</v-icon>
            {{ tab.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
    <!-- <CreateExpenseDialog
      :dialog="uiShowCreateExpense"
      @close="uiShowCreateExpense = false"
    />-->
    <DrawerPicker
      title="Add New Expense"
      :value="uiShowCreateExpense"
      @close="uiShowCreateExpense = false"
      @input="input"
    >
      <LogsRowItemFormAddNew @close="uiShowCreateExpense = false" />
    </DrawerPicker>
  </div>
</template>

<script>
import CreateExpenseDialog from './logs/CreateExpenseDialog'
import DrawerPicker from '../../../../utils/DrawerPicker'
import LogsRowItemFormAddNew from './logs/LogsRowItemFormAddNew'
import mx_matter from '../../../../../mixins/mx_matter'

export default {
  name: 'BaseExpenseEntries',
  components: { LogsRowItemFormAddNew, DrawerPicker, CreateExpenseDialog },
  mixins: [mx_matter],
  data() {
    return {
      uiShowCreateExpense: false,
      tab: null,
      tabs: [
        {
          text: 'Expense logs',
          to: `/`,
          icon: 'mdi-view-agenda',
        },
        {
          text: 'Calendar',
          to: `/calendar`,
          icon: 'mdi-calendar-text',
        },
        {
          text: 'Task-Based Expense',
          to: `/task-based`,
          icon: 'mdi-calendar-text',
        },

        {
          text: 'Budgeting',
          to: `/budgeting`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'Forecasting',
          to: `/forecasting`,
          icon: 'mdi-chart-line',
        },
        {
          text: 'Analytics',
          to: `/analytics`,
          icon: 'mdi-chart-pie',
        },
        {
          text: 'Settings',
          to: `/settings`,
          icon: 'mdi-settings',
        },
      ],
    }
  },
  computed: {
    rootMatterPath() {
      return `/matters/${this.$$matterID}/caf/expense-entries`
    },
  },
  methods: {
    input(drawer) {
      if (!drawer) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style scoped></style>
