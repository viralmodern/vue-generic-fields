<template>
  <v-dialog no-click-animation
            persistent
            max-width="75vw"
            v-model="uiShowModal">
    <v-card min-height="55vh">
      <v-btn icon absolute top small right @click="handleModalClose">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="headline">
        Compare Entries
      </v-card-title>
      <!--<v-card-text>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps
        are running.
      </v-card-text>-->
      <v-card-text>
        <ListCompareEntries :rows="rows"
                            :fields-config="fieldsConfig"
                            :main-cell-id="mainCellId"
                            :unique-id="uniqueId"/>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
  import { ROWS_SETTINGS } from "~/sat-vue-toolkit/components/slick-grid/configs/slickgrid.json"
  let {
    COMPARE
  } = ROWS_SETTINGS
  let prefix = COMPARE.PREFIX
  export default {
    name: "TheModalCompareEntriesRows",
    components: {
      ListCompareEntries:() => import("~/sat-vue-toolkit/components/slick-grid/components/ListCompareEntries")
    },
    data () {
      return {
        uiShowModal: false,
        fieldsConfig: [],
        rows: [],
        mainCellId: 'name',
        uniqueId: 'pk',
      }
    },
    mounted () {
      // todo received event rows entries settings
      this.$events.on(`${prefix}`, this.receivedData)
    },
    methods: {
      receivedData (evt, data) {
        console.log(arguments)
        this.handleSetReceiveData(data)
        this.handleModalShown()
      },
      handleSetReceiveData ({ fieldsConfig, rows, mainCellId, uniqueId }) {
        this.fieldsConfig = [...fieldsConfig]
        this.rows = [...rows]
        this.mainCellId = mainCellId
        this.uniqueId = uniqueId
      },
      handleModalShown () {
        this.uiShowModal = true
      },
      handleModalClose () {
        this.uiShowModal = false
      }

    }
  }
</script>

<style scoped>

</style>
