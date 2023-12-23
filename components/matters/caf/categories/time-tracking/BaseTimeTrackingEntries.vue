<template>
  <div>
    <v-app-bar extended fixed app>
      <v-toolbar-title>Time tracking</v-toolbar-title>
      <v-spacer />
      <v-btn color="primary" rounded @click="uiShowCreateExpense = true">
        <v-icon>mdi-plus</v-icon>
        Add Time Tracking
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
          <v-spacer />
          <v-menu v-if="more.length" bottom left>
            <template v-slot:activator="{ on }">
              <v-btn text class="text-capitalize mr-4" v-on="on">
                View By: {{ more[selected] | viewBy }}
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group v-model="selected">
                <v-list-item
                  v-for="item in more"
                  exact
                  :to="`${rootMatterPath}/views${item.to}`"
                  :key="item.to"
                >
                  {{ item.text }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
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
import matter from '../../../../../mixins/mx_matter'
import DrawerPicker from '../../../../utils/DrawerPicker'
import LogsRowItemFormAddNew from '../expense-entries/logs/LogsRowItemFormAddNew'

export default {
  name: 'BaseTimeTrackingEntries',
  components: { LogsRowItemFormAddNew, DrawerPicker },
  mixins: [matter],
  data() {
    return {
      uiShowCreateExpense: false,
      tab: null,
      tabs: [
        {
          text: 'General',
          to: `/`,
          icon: 'mdi-view-agenda',
        },
        {
          text: 'Timers Entries',
          to: `/matter-active-timers`,
          icon: 'mdi-calendar-text',
        },

        {
          text: 'TaskBoard',
          to: `/taskboard-time`,
          icon: 'mdi-currency-usd',
        },
        // todo: time tracking views
        /**/
      ],
      more: [
        {
          text: 'Calendar',
          to: `/calendar`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'Timeoverlay',
          to: `/time-overlay`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'User Worklog',
          to: `/user-worklog`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'Taskboard Worklog',
          to: `/taskboard-worklog`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'Admin Mode',
          to: `/admin-mode`,
          icon: 'mdi-currency-usd',
        },
        {
          text: 'User Mode',
          to: `/user-mode`,
          icon: 'mdi-currency-usd',
        },
      ],
      selected: 0,
    }
  },
  computed: {
    rootMatterPath() {
      return `/matters/${this.$$matterID}/caf/time-tracking`
    },
  },
  methods: {
    input(drawer) {
      if (!drawer) {
        this.$emit('close')
      }
    },
  },
  filters: {
    viewBy(val) {
      console.log('viewBy', val)
      try {
        return val.text
      } catch (e) {
        console.log(e.message)
        return 'N/A'
      }
    },
  },
}
</script>

<style scoped></style>
