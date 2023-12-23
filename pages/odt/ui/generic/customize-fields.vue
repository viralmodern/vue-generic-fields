<template>
  <v-container fluid>
    <div class="d-flex overflow-hidden">
      <div class="flex-grow-1">
        <SlickGrid
          disable-add-new-to-many
          no-link-detail
          is-offline
          disabled-owner-row
          height="85vh"
          @fieldsChange="onFieldsChange"
        />
      </div>
      <div class="pl-4">
        <ThePanelResizableBase label="Debug">
          <json-viewer :value="strFields"></json-viewer>
        </ThePanelResizableBase>
      </div>
    </div>
  </v-container>
</template>

<script>
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import JsonViewer from 'vue-json-viewer'
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
export default {
  components: {
    ThePanelResizableBase,
    SlickGrid,
    JsonViewer,
  },
  data() {
    return {
      strFields: '',
    }
  },
  methods: {
    onFieldsChange({ fields }) {
      console.log(arguments)
      let textedJson = JSON.stringify(fields, undefined, 4)
      this.strFields = { fields }
    },
  },
}
</script>

<style scoped></style>
