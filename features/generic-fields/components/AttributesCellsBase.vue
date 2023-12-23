<template>
  <div>
    <v-edit-dialog v-if="showDialog">
      <slot name="activator">
        <div class="d-flex align-center">
          <div>
            <div class="fa-user-plus1">
              <v-icon x-small color="#c1c2c3">
                {{ iconType }}
              </v-icon>
            </div>
          </div>
          <div class="flex-grow-1">
            <div class="px-2">
              <template v-if="attrType === 'Link'">
                <nuxt-link
                  v-for="item in selected"
                  class="text-caption pa-1"
                  :key="item"
                  to="#"
                  >{{ item }}
                </nuxt-link>
              </template>
              <template
                v-else-if="attrType === 'Attachment' || attrType === 'Image'"
              >
                <div style="width: 100px;" class="d-flex flex-wrap">
                  <template v-for="(item, index) in selected">
                    <img
                      :key="index"
                      :src="item['dataURL']"
                      width="25"
                      class="img_border d-block ma-1"
                      height="16"
                    />
                  </template>
                </div>
              </template>
              <template v-else>
                {{ selected }}
              </template>
            </div>
          </div>
        </div>
      </slot>
      <template v-slot:input>
        <div class="pa-4">
          <component
            :is="attrLayout"
            :attr-type="attrType"
            v-model="selected"
          ></component>
        </div>
      </template>
    </v-edit-dialog>
    <template v-else>
      <component
        :is="attrLayout"
        :attr-type="attrType"
        v-model="selected"
      ></component>
    </template>
  </div>
</template>

<script>
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import {
  getAttributeByProp,
  getAttributeComponentCellName,
} from '../fields_config'

let rootAttributes = 'AttributesCells'
const view = (name, resolve) => {
  // eslint-disable-line
  return function (resolve) {
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
  name: 'AttributesCellsBase',
  components: {
    ...getComponentAttributes,
  },
  data() {
    return {
      selected: null,
    }
  },
  props: {
    attrType: {
      type: String,
    },
  },
  computed: {
    attrLayout() {
      return getAttributeComponentCellName({ type: this.attrType })
    },
    showDialog() {
      return getAttributeByProp({ type: this.attrType, prop: 'dialog_cell' })
    },
    iconType() {
      return getAttributeByProp({ type: this.attrType, prop: 'icon' })
    },
  },
}
</script>
