<template>
  <div>
    <v-app-bar
      dense
      height="38px"
      flat
      v-bind="vBind"
      style="border-top: solid 1px rgba(0, 0, 0, 0.05);"
    >
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
  name: 'BaseTabLinksPageEntries',
  props: {
    rootPath: {
      type: String,
      default: '/odt/dockets',
    },
    links: {
      type: Array,
      default: () => [],
    },
    vBind: {
      type: Object,
      default: () => ({
        app: true,
      }),
    },
  },
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    items() {
      return this.links
    },
  },
}
</script>

<style scoped></style>
