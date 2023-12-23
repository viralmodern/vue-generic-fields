<template>
  <v-menu offset-y max-height="45vh" max-width="320px">
    <template v-slot:activator="{ on }">
      <v-btn
        color="transparent"
        class="px-0"
        style="min-width: unset !important;"
        small
        text
        dark
        v-on="on"
      >
        <v-icon :color="active">mdi-checkbox-blank-circle</v-icon>
        <v-icon dark color="primary">mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-card dense>
      <v-card-text>
        <v-btn
          :value="item"
          :input-value="item === active"
          v-for="(item, index) in colors"
          icon
          :key="index"
          @click="active = item"
        >
          <v-icon :color="item">mdi-checkbox-blank-circle</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { COLORS } from './fields'

export default {
  name: 'ChooseColor',
  data: () => ({
    active: COLORS[0],
    colors: COLORS
  }),
  model: {
    event: 'change-color'
  },
  mounted() {
  },
  computed: {},
  methods: {},
  watch: {
    active(n) {
      this.$emit('change-color', { color: n })
    }
  }
}
</script>

<style scoped></style>
