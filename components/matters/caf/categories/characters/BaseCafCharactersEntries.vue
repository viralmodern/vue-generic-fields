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
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container fluid py-0>
      <slot :owner-pk="ownerPk"></slot>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'BaseCafCharactersEntries',
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    items() {
      return [
        {
          text: 'Characters',
          to: `${this.rootMatterPath}`,
        },
        {
          text: 'Characters Relations Map',
          to: `${this.rootMatterPath}/relationship`,
        },
        {
          text: 'Characters Related',
          to: `${this.rootMatterPath}/related`,
        },
      ]
    },
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    rootMatterPath() {
      try {
        let $$matterID = this.$route.params.matter
        return `/matters/${$$matterID}/caf/characters`
      } catch (e) {
        return ''
      }
    },
  },
}
</script>

<style scoped></style>
