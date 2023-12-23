<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <CurdModel
        $$endpoint="/api/workspace/attributes"
        @success="update"
        :pk="attributeID"
        :entity="entity"
      >
        <template
          v-slot:default="{
            data: post,
            error,
            loading,
            create,
            destroy,
            update,
          }"
        >
          <v-card :loading="loading">
            <v-card-title>
              <div class="text-subtitle-1">
                Update Attribute
              </div>
              <v-spacer />
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="update(post)">
                <div>
                  <v-text-field
                    autofocus
                    label="Attribute Name"
                    dense
                    v-model="post.name"
                    clearable
                    required
                    :rules="nameRules"
                    outlined
                  ></v-text-field>
                </div>
                <div>
                  <component :is="attributeName"></component>
                </div>
                <div class="mb-4"></div>
                <div>
                  <div class="row">
                    <div class="col-6">
                      <v-btn block @click="dialog = false">Cancel</v-btn>
                    </div>
                    <div class="col-6">
                      <v-btn
                        block
                        color="primary"
                        :loading="loading"
                        type="submit"
                        >Save
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </template>
      </CurdModel>
    </v-dialog>
  </div>
</template>

<script>
import CurdModel from './CurdModel'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const rootAttributes = 'Attributes'
const view = (name, resolve) => {
  // eslint-disable-line
  return function (resolve) {
    return require([`./${rootAttributes}/${name}.vue`], resolve)
  }
}
let requireComponent = require.context(
  // The relative path of the components folder
  `./Attributes`
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
  name: 'DialogEditAttribute',
  components: { ...getComponentAttributes, CurdModel },
  props: {
    value: {
      // type: Boolean,
      // default: false
    },
    attributeID: {
      type: Number,
    },
    attributeName: {
      type: String,
    },
    entity: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: this.value,
      valid: true,
      nameRules: [
        (v) => !!v || 'Name is required',
        // (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
    }
  },
  methods: {
    update(res) {
      console.log('success', arguments)
      if (res.config.method === 'get') {
        return
      }
      try {
        this.$emit('close', { item: res.data })
      } catch (e) {
        console.log('update', e.message)
      }
      this.dialog = false
    },
  },
  watch: {
    dialog(value) {
      this.$emit('input', value)
    },
    value(n) {
      try {
        this.dialog = n
      } catch (e) {
        console.log('XYZ', e.message)
      }
    },
  },
}
</script>

<style scoped></style>
