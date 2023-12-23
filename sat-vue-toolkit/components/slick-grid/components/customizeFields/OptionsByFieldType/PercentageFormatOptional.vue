<template>
  <div class="percentage-number-field">
    <v-card flat>
      <v-switch :ripple="false"
                @change="data => setValueOptional({[types.showHeatMap]: Boolean(data)})"
                :input-value="optionalField[types.showHeatMap]"
                :value="optionalField[types.showHeatMap]"
                label="Display heatmap percentage style?"/>
      <v-slide-y-transition hide-on-leave>
        <div class="palettes-color" v-show="optionalField[types.showHeatMap]">
          <template v-for="color in colorsHeatmap">
            <v-btn :color="color | toColor"
                   :input-value="color.startsWith(optionalField[types.colorType])"
                   :dark="color | isDark"
                   depressed
                   tile @click.stop="changeColor(color, types.colorType)"
                   class="text-capitalize caption">
              <v-icon small v-if="color.startsWith(optionalField[types.colorType])" left>
                mdi-check
              </v-icon>
            </v-btn>
          </template>
        </div>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
  import { $$lightOrDark } from "~/sat-vue-toolkit/functions"
  import { optionalFieldOptionsMixin } from "./optionalFormatMixin"
  export default {
    name: "PercentageFormatOptional",
    props: {
      colorsHeatmap: {
        type: Array,
        default: () => [
          'AMBER-FFC107',
          'BLUE-2196F3',
          'BLUE_GREY-607D8B',
          'BROWN-795548',
          'CYAN-00BCD4',
          'DEEP_ORANGE-FF5722',
          'DEEP_PURPLE-673AB7',
          'GREEN-4CAF50',
          'GREY-9E9E9E',
          'INDIGO-3F51B5',
          'LIGHT_BLUE-03A9F4',
          'LIGHT_GREEN-8BC34A',
          'LIME-CDDC39',
          'ORANGE-FF9800',
          'PINK-E91E63',
          'PURPLE-9C27B0',
          'RED-F44336',
          'TEAL-009688',
          'YELLOW-FFEB3B',
        ]
      },
    },
    data() {
      return {
        types: {
          colorType: 'colorType',
          showHeatMap: 'showHeatMap'
        },
      }
    },
    mixins: [optionalFieldOptionsMixin],
    methods: {
      changeColor(color, type) {
        let colorType = color.split('-')[0]
        let temp = {
          [type]: colorType,
        }
        this.setValueOptional(temp)
      },
    },
    filters: {
      toColor(upperCase) {
        let color = upperCase.toLowerCase()
        let str = color.split('-')
        color = str[0].replace(/_/gmi,'-')
        return color
      },
      isDark(upperCase) {
        let color = upperCase.toLowerCase()
        let str = color.split('-')
        let isDark = $$lightOrDark(str[1])
        return isDark
      },

    },

  }
</script>

<style scoped>

</style>
