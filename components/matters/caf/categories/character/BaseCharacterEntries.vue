<template>
  <div>
    <v-app-bar fixed app dense>
      <div>
        <v-tabs
          v-model="tab"
          slider-color="warning"
          background-color="transparent"
        >
          <v-tab
            v-for="tab in items"
            :key="tab.text"
            exact
            :to="`${rootMatterPath}/${tab.to}`"
            class="text-capitalize text-subtitle-2"
          >
            <v-icon small left>{{ tab.icon }}</v-icon>
            {{ tab.text }}
          </v-tab>
        </v-tabs>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <slot :owner-pk="ownerPk"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCafCharactersEntries',
  data() {
    return {
      tab: 0,
      items: [
        {
          text: 'Characters',
          to: '',
        },
        {
          text: 'Characters Related',
          to: 'related',
        },
        {
          text: 'Characters Relation ship',
          to: 'relationship',
        },
      ],
    }
  },
  computed: {
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
