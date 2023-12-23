<template>
  <CurdModel
    $$endpoint="/api/workspace/attributes/"
    @success="save"
    @error="error"
  >
    <div slot-scope="{ data: post, loading, create }">
      <v-form v-model="valid" @submit.prevent="create(newPost)">
        <div>
          <v-text-field
            label="Attribute Name"
            dense
            v-model="name"
            clearable
            required
            :rules="nameRules"
            outlined
          ></v-text-field>
          <slot>
            <component
              :is="attrLayout"
              :attr-type="attrType"
              @cancel="cancel"
              @save="save"
            ></component>
          </slot>
        </div>
        <div class="mb-4"></div>
        <div>
          <div class="row">
            <div class="col-6">
              <v-btn block @click="$emit('cancel')">Cancel</v-btn>
            </div>
            <div class="col-6">
              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="!validForm"
                type="submit"
                >Save
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </CurdModel>
</template>

<script>
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import CurdModel from './CurdModel'

const rootAttributes = 'Attributes'
const view = (name, resolve) => {
  // eslint-disable-line
  return function(resolve) {
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
  name: 'AttributesCreateNewBase',
  components: { ...getComponentAttributes, CurdModel },
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required'
        // (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ]
    }
  },
  props: {
    attrName: {
      type: String
    },
    attrType: {
      type: String
    },
    toModel: {
      type: String
    }
  },
  computed: {
    attrLayout() {
      return this.attrName
    },
    validForm() {
      try {
        return this.valid && this.attrName
      } catch (e) {
        return false
      }
    },
    newPost() {
      return {
        name: this.name,
        type: this.attrType,
        to_model: this.toModel,
        options: {}
      }
    }
  },
  methods: {
    cancel() {},
    save(response) {
      this.$eventHub.$emit('alert-curd', {
        type: 'success',
        text: `${response.data.name} has been created`
      })
      this.$emit('saved')
    },
    error(error) {
      this.$eventHub.$emit('alert-curd', {
        type: 'error',
        text: `Attribute do not created`
      })
    }
  }
}
</script>

<style scoped></style>
