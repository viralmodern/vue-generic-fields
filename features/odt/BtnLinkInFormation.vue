<template>
  <v-btn
    @click="onClick"
    title="Information"
    small
    text
    :icon="icon"
    rounded
    :loading="loading"
    class="text-capitalize caption"
  >
    <template v-if="!icon">
      Information
    </template>
    <v-icon :right="!icon" small>mdi-information</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnLinkInFormation',
  props: {
    icon: {
      type: Boolean,
      default: () => false,
    },
    attributes: {
      type: Array,
      default: () => [],
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    rowId: {
      type: [String, Number],
      default: () => '',
    },
    mainCellId: {
      type: String,
      default: () => 'pk',
    },

    hasReportRow: {
      type: Boolean,
      default: () => false,
    },
    disabledBookmarkRow: {
      type: Boolean,
      default: () => false,
    },
    isOwnerRow: {
      type: Boolean,
      default: () => false,
    },
    endPoint: {
      type: String,
    },
    busEventName: {},
    group: {},
    groupType: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      detail: null,
    }
  },
  methods: {
    async fetchRowDetail() {
      try {
        this.loading = true
        let res = await this.$api.get(`${this.endPoint}${this.rowId}`)
        this.detail = res['data']
        return Promise.resolve(res['data'])
      } catch (e) {
        return Promise.resolve(false)
      } finally {
        this.loading = false
      }
    },
    async onClick() {
      let row = { ...this.row }
      if (this.rowId) {
        let res = await this.fetchRowDetail()
        if (res) {
          row = { ...res }
        }
      }
      let configs = {
        row,
        attributes: this.attributes,
        mainCellId: this.mainCellId,
        isOwnerRow: this.isOwnerRow,
        endPoint: this.endPoint,
        disabledBookmarkRow: this.disabledBookmarkRow,
        hasReportRow: this.hasReportRow,
      }
      this.$trigger('uiShowAttributeModalDetail', configs)
    },
  },
}
</script>

<style scoped></style>
