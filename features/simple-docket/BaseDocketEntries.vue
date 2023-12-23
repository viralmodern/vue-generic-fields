<template>
  <v-main style="position: relative;">
    <v-app-bar dense height="38px" flat>
      <div>
        <v-tabs
          height="38px"
          v-model="tab"
          slider-color="warning"
          background-color="transparent"
        >
          <v-tab
            v-for="tab in items"
            :key="tab.text"
            :to="`${tab.to}`"
            class="text-capitalize caption"
          >
            <v-icon small left>{{ tab.icon }}</v-icon>
            {{ tab.text }}
          </v-tab>
        </v-tabs>
      </div>
    </v-app-bar>
    <slot></slot>
  </v-main>
</template>

<script>
import mx_matter from '../../mixins/mx_matter'

export default {
  name: 'BaseDocketEntries',
  mixins: [mx_matter],
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    rootMatterPath() {
      try {
        return `/matters/${this.$$matterID}/caf/simple-docket`
      } catch (e) {
        return false
      }
    },
    items() {
      return [
        {
          text: 'Court Docket',
          to: `${this.rootMatterPath}`,
        },
        {
          text: 'Filing Status ',
          to: `${this.rootMatterPath}/filing-status`,
        },
        {
          text: 'Docket Knowledge',
          to: `${this.rootMatterPath}/docket-knowledge`,
        },
        {
          text: 'Task-Based Docket',
          to: `${this.rootMatterPath}/task-based`,
        },
        {
          text: 'Expense-Based Docket',
          to: `${this.rootMatterPath}/expense-based`,
        },
        {
          text: 'Docket InsightTM',
          to: `${this.rootMatterPath}/insight-tm`,
        },
        {
          text: 'OpponentTM',
          to: `${this.rootMatterPath}/opponent-tm`,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
