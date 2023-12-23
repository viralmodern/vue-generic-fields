<template>
  <v-app-bar dense height="38px" flat :style="styles" v-bind="vBind || {}">
    <slot name="left-attach-content"></slot>
    <v-spacer />
    <slot name="right-attach-content"></slot>
    <CustomizeFieldsBuilder
      :fields-config="views"
      item-text="label"
      item-value="name"
      disabled-draggable
      :multiple="false"
      placeholder="Select views"
      :title-button="titleButton"
      @resetFields="orderViews"
    />
    <div class="mr-2"></div>
    <CustomizeFieldsBuilder
      :fields-config="panels"
      item-text="label"
      item-value="name"
      placeholder="Search panels"
      title-button="Customize Panels"
      @resetFields="orderPanels"
    />
    <div class="mr-2"></div>
    <template v-if="isAbstractDocument">
      <v-btn
        v-if="isAdmin"
        class="text-capitalize caption"
        rounded
        small
        depressed
        dark
        color="primary"
        @click="startActionSync"
        :loading="isSyncing"
        title="Convert PDF document to text"
      >
        Start OCR Extraction
        <v-icon right small>mdi-sync</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
import debounce from 'lodash/debounce'
import CustomizeFieldsBuilder from '~/sat-vue-toolkit/components/slick-grid/control/CustomizeFieldsBuilder.vue'

let animateID = null
export default {
  name: 'TopBarDocumentDetailOdt',
  components: { CustomizeFieldsBuilder, BtnLink },
  props: {
    views: {
      type: Array,
      default: () => [],
    },
    panels: {
      type: Array,
      default: () => [],
    },

    styles: {
      type: Object,
      default: () => ({
        position: 'sticky',
        top: '38px',
        'z-index': 1,
        'border-top': 'solid 1px rgba(0, 0, 0, 0.05)',
      }),
    },
    isAbstractDocument: {
      type: Boolean,
      default: () => false,
    },
    isAdmin: {
      type: Boolean,
      default: () => true,
    },
    endPointAbstractDocument: {
      type: String,
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    rootPath: {
      type: String,
      default: () => '',
    },
    vBind: {
      type: Object,
      default: () => ({}),
    },
    excludeLinks: {
      type: Array,
      default: () => [],
    },
    includeLinks: {
      type: Object,
      default: () => {
        return {}
      },
    },
    titleButton: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isSyncingAbstract: false,
      fieldsConfig: [],
    }
  },

  computed: {
    isSyncAbstractDocumentRow() {
      try {
        return this.row.hasOwnProperty('ocr_status') //
      } catch (e) {
        return false
      }
    },
    isSyncing() {
      return this.row['ocr_status'] == 5 || this.isSyncingAbstract
    },
  },
  watch: {
    row: {
      deep: true,
      immediate: true,
      handler(v) {
        if (this.isSyncAbstractDocumentRow) {
          this.stepSync()
        }
      },
    },
  },
  methods: {
    async startActionSync() {
      try {
        this.isSyncingAbstract = true
        this.$emit('requestSyncingAbstractDocument')
        await this.$api.post(`${this.endPointAbstractDocument}`)
        this.$emit('syncAbstractDocument')
      } catch (e) {
      } finally {
        this.isSyncingAbstract = false
      }
    },
    stepSync: debounce(function (v) {
      if (this.row['ocr_status'] == 5) {
        this.$emit('syncAbstractDocument')
        animateID = window.requestAnimationFrame(this.stepSync)
      } else {
        window.cancelAnimationFrame(animateID)
      }
    }, 4000),
    orderViews(data) {
      if (data && data.fields) {
        this.$trigger('orderViews', data)
      }
    },
    orderPanels(data) {
      if (data && data.fields) {
        this.$trigger('orderPanels', data)
      }
    },
  },
  destroyed() {
    try {
      this.isSyncingAbstract = false
      window.cancelAnimationFrame(animateID)
    } catch (e) {}
  },
}
</script>

<style scoped></style>
