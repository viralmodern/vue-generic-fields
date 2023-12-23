<template>
  <div class="d-flex align-center fill-height flex-grow-1 px-0"
       :title="$$attribute.label">
    <div class="fill-height w-100 color-content-heatmap">
      <template v-if="val">
        <div class="d-flex fill-height" :id="idCell" @click="onMouseover">
          <template v-if="$$attribute.enabledTrendValue">
            <div class="d-flex align-center justify-center px-2">
              <v-chip small outlined :color="trendConfig.color" v-if="trendConfig.isChip">
                <v-icon x-small :color="trendConfig.color" left>
                  {{trendConfig.icon}}
                </v-icon>
                {{trendConfig.label}}
              </v-chip>
            </div>
          </template>
          <template v-else>
            <v-progress-linear :color="val | getColor"
                               class="cursor--pointer"
                               :height="height"
                               background-opacity="1"
                               dark
                               reactive
                               :value="val | getValue">
              <strong class="color_label_heatmap caption text-no-wrap"
                      :class="{ 'black--text': !$$lightOrDark(val.color), 'white--text': $$lightOrDark(val.color) }"
                      :title="getTitle">{{ getLabel }}</strong>
            </v-progress-linear>
          </template>
        </div>
      </template>
      <p v-else class="text-center w-100 ma-0 caption text-no-wrap"
         :title="getTitle">
        <strong>{{getLabel}}</strong>
      </p>
    </div>
    <v-chip class="chip-content-heatmap"
            :color="val | getColor"
            small>{{getTitle}}
    </v-chip>
  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { $$lightOrDark } from "@/sat-vue-toolkit/functions"
  import debounce from "lodash/debounce"

  export default {
    name: "HeatMapCell",
    data () {
      return {
        val: {},
        height: "100%"
        // height: '25px',
      }
    },
    mixins: [mxAttributeItem],
    computed: {
      percent () {
        try {
          return Math.ceil(this.val.percent)
        } catch (e) {
          return 0
        }
      },
      getTitle () {
        try {
          let { title } = this.val
          if (title) {
            return title
          }
          return this.getLabel
        } catch (e) {
          return this.getLabel
        }
      },
      getLabel () {
        try {
          return this.val.label === null ? this.val.percent : this.val.label
        } catch (e) {
          return ""
        }
      },
      trendConfig() {
        let {percent} = this
        let up = percent > 30
        let down = percent < 0
        let color = up ? 'green' : down ? 'red' : ''
        // console.log({up, down, percent})
        let label = up ? `+${percent}%` : down ? `-${percent}%` : ``
        let icon = up ? `mdi-arrow-up-bold` : down ? `mdi-arrow-down-bold` : `mdi-arrow-right-bold`
        let isChip = up || down
        let clsOption = {
          up, down,
        }
        return {
          up, down, color, label, clsOption, icon, isChip
        }
      },
      idCell () {
        let { cellPk } = this
        return `${cellPk}-hm`
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },
    methods: {
      $$lightOrDark,
      onMouseover: debounce(function (e) {
        let { idCell, $$attribute } = this
        if (!$$attribute.enabledTooltip) {
          return
        } // turn on tooltip hover
        let evt = `heatMapTrendLine`, activatorId = idCell
        this.$trigger(evt, { activatorId, options: {} })
      }, 100)

    },
    filters: {
      getIsDark (prc) {
        return $$lightOrDark(prc.color)
      },
      getColor (prc) {
        try {
          return `#${prc.color}`
        } catch (e) {
          return ""
        }
      },
      getValue (prc) {
        if (prc && prc.percent && typeof prc.percent === "number") {
          return 100
          return prc.percent
        }
        return 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .color_label_heatmap {
    /*border: solid 1px red;*/
    display: block;
    align-self: center;
    flex: 1;
    padding-left: 5%;
  }

  .chip-content-heatmap {
    display: none;
  }

  .color-content-heatmap {
    position: relative;
    z-index: 1;
  }

  .cell_list {
    .color-content-heatmap {
      display: none;
    }

    .chip-content-heatmap {
      display: block;
    }
  }
</style>
