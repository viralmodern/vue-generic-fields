<template>
  <div class="w-100 d-flex align-center justify-center">
    <div class="text-border text-left flex-grow-1 ft_v cursor--pointer"
         @click="$$openDropDownSource">
      <template v-if="val">
        <TimeAgo :datetime="val"/>
      </template>
      <div class="text-center" v-else></div>
    </div>

    <div v-if="isSyncTimeRow"
         class="cursor--pointer" title="Sync">
      <template>
        <v-btn icon :loading="isSyncing" @click="startSyncRow">
          <v-icon small>mdi-sync</v-icon>
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
  import mxAttributeItem from "../mixins/mxAttributeItem"
  import { $formatFullDateTime } from "@/sat-vue-toolkit/functions"
  import debounce from "lodash/debounce"
  import TimeAgo from "@/sat-vue-toolkit/components/TimeAgo/TimeAgo.vue"
  let animateID = null
  export default {
    name: "DateTimeCell",
    components: { TimeAgo },
    mixins: [mxAttributeItem],
    filters: {
      $formatFullDateTime
    },
    data() {
      return {
        val: '',
        isSyncingRow: false
      }
    },
    computed: {
      isSyncTimeRow() {
        try {
          return this.row.hasOwnProperty('is_syncing') // last_synced | is_syncing
        }catch (e) {
          return false
        }
      },
      isSyncing() {
        return this.row['is_syncing'] || this.isSyncingRow
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      },
      row: {
        deep: true,
        immediate: true,
        handler(v) {
          if(this.isSyncTimeRow) {
            // console.log('SYNC_ROW', v)
            this.stepSync()
          }
        }
      }
    },
    methods: {
      async startSyncRow() {
        try {
          this.isSyncingRow = true
          // todo: start sync
          let res = await this.$api.post(`${this.endPoint}sync-docket-entries/`)
          // todo: fetch row
          let {busEventLoadRow, row, uniqueId} = this
          let rowId = row[uniqueId]
          this.$eventHub.$emit(busEventLoadRow, rowId)
        }catch (e) {

        }finally {
          this.isSyncingRow = false
        }
      },
      stepSync: debounce(function (v) {
        if(this.row['is_syncing'] === true) {
          let {busEventLoadRow, row, uniqueId} = this
          let rowId = row[uniqueId]
          this.$eventHub.$emit(busEventLoadRow, rowId)
          animateID = window.requestAnimationFrame(this.stepSync)
        }else {
          window.cancelAnimationFrame(animateID)
        }
      }, 4000),
    },
    destroyed () {
      window.cancelAnimationFrame(animateID)
    }
  }
</script>

<style scoped lang="scss">

</style>
