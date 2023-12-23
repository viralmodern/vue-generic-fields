<template>
  <v-menu
    offset-y
    max-height="45vh"
    max-width="320px"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="transparent"
        class="px-0"
        style="min-width: unset !important"
        small
        text
        dark
        v-on="on"
      >
        <v-icon :color="active">mdi-checkbox-blank-circle</v-icon>
        <v-icon v-if="!disabledCaret" dark color="primary"
          >mdi-menu-down</v-icon
        >
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
import { COLORS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

export default {
  name: 'ChooseColor',
  props: {
    value: {},
    disabledCaret: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    colors: COLORS,
    color: COLORS[0],
  }),
  mounted() {},
  computed: {
    active: {
      get() {
        try {
          return this.value || this.color
        } catch (e) {
          console.log('COLORS', e.message)
          return COLORS[0]
        }
      },
      set(color) {
        this.color = color
        this.$emit('input', color)
      },
    },
  },
  methods: {},
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(v) {
        if (v) {
          this.color = v
          // this.color = COLORS[0]
        }
      },
    },
    color: {
      deep: true,
      immediate: true,
      handler(v) {
        if (v) {
          this.$emit('input', v)
        }
      },
    },
  },
}
</script>

<style scoped></style>
