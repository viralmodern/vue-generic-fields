<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="3" class="py-0">
          <v-chip label color="transparent">
            <v-icon small left>
              {{ iconType }}
            </v-icon>
            {{ attrName }}
          </v-chip>
        </v-col>
        <v-col class="py-0">
          <component
            :is="attrLayout"
            :attr-type="attrType"
            v-model="selected"
          ></component>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { getAttributeByProp } from '../fields_config'

let rootAttributes = 'AttributesCells'
const view = (name, resolve) => {
  // eslint-disable-line
  return function(resolve) {
    return require([`./${rootAttributes}/${name}.vue`], resolve)
  }
}
let requireComponent = require.context(
  // The relative path of the components folder
  `./AttributesCells`
)
const X = _.uniqBy(
  _.map(requireComponent.keys(), (fileName) => {
    const componentName = upperFirst(
      camelCase(
        // Strip the leading `./` and extension from the filename
        fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
      )
    )
    return componentName
  })
)
const getComponentAttributes = (() => {
  let obj = {}
  for (let i = 0; i < X.length; i++) {
    obj[X[i]] = view(X[i])
  }
  return obj
})()

export default {
  name: 'AttributesCardBase',
  components: {
    ...getComponentAttributes
  },
  data() {
    return {
      selected: null
    }
  },
  props: {
    attrType: {
      type: String
    },
    attrName: {
      type: [String, Number]
    }
  },
  computed: {
    attrLayout() {
      // return getAttributeByProp({ type: this.attrType, prop: 'card_component' })
      return getAttributeByProp({ type: this.attrType, prop: 'cell_component' })
    },
    showDialog() {
      return getAttributeByProp({ type: this.attrType, prop: 'dialog_cell' })
    },
    iconType() {
      return getAttributeByProp({ type: this.attrType, prop: 'icon' })
    }
  }
}
</script>

<style scoped></style>
