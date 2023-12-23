<template>
  <div>
    <v-btn :icon="icon" :title="isPinned ? 'Pinned' : 'Pin'"
           small
           @click.stop="doPinned"
           depressed class="caption text-capitalize"
           :rounded="!icon"
           :disabled="submitting$"
           :loading="submitting$">
      <template v-if="!icon">
        {{isPinned ? `Pinned` : `Pin`}}
      </template>
      <v-icon :color="isPinned ? 'warning' : 'default'"
              small
              :right="!icon">
        mdi-pin
      </v-icon>
    </v-btn>
  </div>
</template>

<script>

  import { getSESSION } from "~/utils"

  export default {
    name: "PinnedEntry",
    props: {
      pinned: {
        type: [Boolean, String, Number],
        default: () => ''
      },
      sessionId: {
        type: String,
        default: () => ''
        // default: () => 'rangy-t-61-14806170-814367-880182-selection-docket-search'
      },
      icon: {
        type: Boolean,
        default: () => true
      },
      row: {
        type: Object,
        default: () => ({})
      },

    },
    data () {
      return {
        submitting$: false,
        pin: false,
        val: {}
      }
    },
    mounted () {
      // let {pinned} = this
      // this.pin = Boolean(pinned)
    },
    watch: {
      row: {
        immediate: true,
        handler(v) {
          if(Boolean(v)) {
            this.val = v
          }
        }
      }
    },
    computed: {
      canReport () {
        return this.submitting$ === false
      },
      isPinned() {
        let {pinned, row, pin, entriesBySessionId, val} = this
        return Boolean(val['pinned']) || Boolean(pinned) || Boolean(entriesBySessionId) || Boolean(pin)
      },
      entriesBySessionId() {
        let {sessionId, row} = this
        let session = `${sessionId}-entries`, entry
        let entries = getSESSION(session) || []
        let rowId = row.hasOwnProperty('pk') && `pk` || `id`
        let entryId = row[rowId]
        entry = entries.find(et => et[rowId] == entryId)
        // console.error('ENTRY_PINNED', entry)
        return entry
      }
    },
    methods: {
      async doPinned () {
        let {row, isPinned} = this
        let  val, pinned = !isPinned
        val = {...row, pinned}
        this.pin = pinned
        this.val = val
        this.$emit("pinned", val)
        this.$trigger('$pinEntity', {response: val})
      }
    }
  }
</script>


