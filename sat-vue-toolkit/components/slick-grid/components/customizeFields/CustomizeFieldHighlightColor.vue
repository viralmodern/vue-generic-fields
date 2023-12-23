<template>
  <div class="fill-height d-flex align-center">
    <v-menu transition="slide-y-transition"
            :close-on-content-click="false"
            offset-y>
      <template v-slot:activator="{on}">
        <v-btn v-on="on"
               :color="color"
               depressed
               :dark="showColor | isDark"
               class="text-capitalize caption">
          <v-icon left>mdi-palette</v-icon>
          Color
        </v-btn>
      </template>
      <v-color-picker v-model="color" show-swatches/>
    </v-menu>
  </div>
</template>

<script>
  import { $$lightOrDark } from "~/sat-vue-toolkit/functions"

  export default {
    name: "CustomizeFieldHighlightColor",
    props: {
      value: {
        type: [String, Number],
        default: () => ''
      },
    },
    data() {
      return {
        types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
        type: 'hex',
        hex: '#FF6F00',
        hexa: '#ff6f00',
        rgba: { r: 255, g: 0, b: 255, a: 1 },
        hsla: { h: 300, s: 1, l: 0.5, a: 1 },
        hsva: { h: 300, s: 1, v: 1, a: 1 },
      }
    },
    mounted () {
      this.$watch('value', (v) => {
        // console.error("SECOND")
        this[this.type] = v
      })
    },
    computed: {
      color: {
        get () {
          // console.error("FIRST")
          return this[this.type]
          // return this.value
        },
        set (v) {
          this[this.type] = v
          this.$emit('input', {data: this.showColor, k: 'field_color'})
        },
      },

      showColor () {
        if (typeof this.color === 'string') return this.color
        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    },
    filters: {
      isDark(colorStr) {
        let color = colorStr.replace('#','')
        return $$lightOrDark(color)
      }
    }
  }
</script>

<style scoped>

</style>
