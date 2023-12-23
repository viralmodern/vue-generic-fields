<template>
  <v-menu offset-y left allow-overflow max-height="45vh" max-width="320px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" small>
        <v-icon small>mdi-invert-colors</v-icon>
      </v-btn>
    </template>
    <v-card dense>
      <v-card-text>
        <v-btn
          v-for="(item, index) in colors"
          icon
          :key="index"
          @click="clickItem(item)"
        >
          <v-icon :color="item">mdi-checkbox-blank-circle</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { COLORS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

import matterMixin from '~/mixins/mx_matter'

export default {
  name: 'TheMatterColor',
  mixins: [matterMixin],
  data: () => ({
    colors: COLORS,
  }),
  computed: {
    matter() {
      try {
        return this.$store.getters['matters/matterDetail']
      } catch (e) {
        return null
      }
    },
    colorMatter() {
      try {
        return '#' + this.matter.color
      } catch (e) {
        console.log('colorMatter', e.message)
        return '#ffffff'
      }
    },
  },
  methods: {
    async clickItem(item) {
      try {
        this.$emit('change', item)
        let _color = item.replace('#', '')
        await this.$_updateMatter({
          matterID: this.matter.matterID,
          data: { color: _color },
        })
      } catch (e) {
        console.log('clickItem', e.message, this.matter)
      }
    },
  },
}
</script>

<style scoped></style>
