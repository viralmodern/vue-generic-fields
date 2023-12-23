<template>
  <v-app-bar
    app
    fixed
    dense
    height="38px"
    flat
    :dark="darkHeader"
    :color="colorMatter"
  >
    <v-btn icon small>
      <v-icon small>mdi-at</v-icon>
    </v-btn>
    <v-btn icon small>
      <v-icon small>mdi-bell-off</v-icon>
    </v-btn>
    <v-btn icon small>
      <v-icon small>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon small>
      <v-icon small>mdi-flash</v-icon>
    </v-btn>
    <v-btn icon small @click="$eventHub.$emit('drawer-matter-setting')">
      <v-icon small>mdi-information</v-icon>
    </v-btn>
    <TheMatterColor />
    <v-spacer></v-spacer>
    <SearchInput placeholder="Search..." />
  </v-app-bar>
</template>

<script>
import TheMatterColor from '../TheMatterColor'
import SearchInput from '../../../utils/SearchInput'

export default {
  name: 'TheMatterHeader',
  components: { SearchInput, TheMatterColor },
  data() {
    return {
      colorDefault: '#ffffff',
    }
  },
  computed: {
    matterDetail() {
      return this.$store.getters['matters/matterDetail']
    },
    colorMatter() {
      try {
        return `#${this.matterDetail.color}`
      } catch (e) {
        return `${this.colorDefault}`
      }
    },
    darkHeader() {
      return this.colorMatter !== this.colorDefault
    },
  },
}
</script>

<style scoped></style>
