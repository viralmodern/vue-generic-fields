<template>
  <v-bottom-sheet v-model="sheet"
                  hide-overlay
                  persistent
                  inset
                  no-click-animation>
    <v-sheet height="50px">
      <div class="w-100 d-flex align-center fill-height px-2"
           style="border: solid 1px rgba(255,0,0,0.2);">
        <p class="ma-0">
          <v-icon left small>
            mdi-checkbox-marked-circle
          </v-icon>
          <span v-html="labelSelected"></span>
        </p>
        <v-spacer/>
        <div class="mx-1">
          <template v-for="action in actionsEntries">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-btn v-on="action.on" v-bind="linkOption">
                    <v-icon left>
                      {{action.ICON}}
                    </v-icon>
                    {{action.LABEL}}
                  </v-btn>
                </div>
              </template>
              <span>
                {{action.LABEL}}
              </span>
            </v-tooltip>
          </template>
        </div>
        <v-btn icon small @click="closeSheet">
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  import {ROWS_SETTINGS} from '~/sat-vue-toolkit/components/slick-grid/configs/slickgrid.json'
  let {
    COMPARE
  } = ROWS_SETTINGS
  let prefix = COMPARE.PREFIX
  export default {
    name: "SnackbarEntriesSettings",
    data: () => ({
      sheet: false,
      rows: [],
      fieldsConfig: [],
      uniqueId: 'pk',
      mainCellId: 'name',
    }),
    props: {
      linkOption: {
        type: Object,
        default: () => ({
          small: true,
          rounded: true,
          depressed: true,
          class: 'caption text-capitalize',
        }),
      },
    },
    mounted () {
      // todo received event rows entries settings
      this.$events.on("uiShowEntriesSetting", this.receivedData)
    },
    computed: {
      actionsEntries() {
        return [
          {
            ...COMPARE,
            on: {
              click: this.handleCompareEntries
            }
          }
        ]
      },
      countItems () {
        let { rows } = this
        return rows.length
      },
      labelSelected () {
        let { countItems } = this
        let label = countItems >= 2 ? "items" : "item"
        return `<strong>${countItems}</strong> ${label} selected`
      }
    },
    methods: {
      receivedData (evt, data) {
        let { fieldsConfig, rows, mainCellId, uniqueId } = data
        let items = [...Object.values(rows)]
        this.sheet = items.length > 0
        this.rows = [...items]
        this.fieldsConfig = [...fieldsConfig]
        this.mainCellId = mainCellId
        this.uniqueId = uniqueId
      },
      closeSheet () {
        this.sheet = false
        this.rows = []
        this.fieldsConfig = []
        this.$trigger("uiShowEntriesSettingClose")
      },
      handleCompareEntries() {
        let {fieldsConfig, rows, mainCellId, uniqueId} = this
        this.$trigger(`${prefix}`, {fieldsConfig, rows, mainCellId, uniqueId}) // 'bus-compare-entries' + `id action`
      }
    }
  }
</script>

<style scoped>

</style>
