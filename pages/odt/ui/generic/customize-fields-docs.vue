<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card class="px-4" tile flat>
          <FieldsOfSubGeneric @onFieldsChange="onFieldsChange" />
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="px-4" tile flat>
          <div class="json-viewer-box1">
            <json-viewer :value="strFields"></json-viewer>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FieldsOfSubGeneric from '~/features/odt/generic/FieldsOfSubGeneric'
const DEBUGGER = false
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    FieldsOfSubGeneric,
    JsonViewer,
  },
  data() {
    return {
      DEBUGGER,
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

<style scoped lang="scss">
.json-viewer-box {
  font-size: 12px;
}
</style>
