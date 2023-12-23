<template>
  <div>
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
    <keep-alive>
      <slot></slot>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'BaseDocketOdtEntries',
  props: {
    rootPath: {
      type: String,
      default: '/odt/dockets',
    },
  },
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    items() {
      return [
        {
          text: 'Docket Entries',
          to: `${this.rootPath}`,
        },
        {
          text: 'Documents',
          to: `${this.rootPath}/documents`,
        },
        {
          text: 'Entities',
          to: `${this.rootPath}/entities`,
        },
        {
          text: 'Depositions',
          to: `${this.rootPath}/depositions`,
        },
        {
          text: 'Fact Timeline',
          to: `${this.rootPath}/fact-timeline`,
        },

        {
          text: 'Litigation Calendar',
          to: `${this.rootPath}/litigation-analytics`,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
