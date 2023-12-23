<template>
  <div>
    <v-card-text>
      <div>
        <v-btn
          icon
          small
          @click="$emit('input', false)"
          absolute
          top
          right
          style="z-index: 10;"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <AttributeCreateNew
          :type="type"
          disabled-notify
          :attributes="attributes"
          disabled-header
          :label-header="labelHeader"
          :title-button-submit="titleButtonSubmit"
          :end-point="endPoint"
          @submitted="submitted"
          @errored="errored"
        />
        <v-card-text>
          <slot name="footer"></slot>
        </v-card-text>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import AttributeCreateNew from '@/sat-vue-toolkit/components/slick-grid/attributes/AttributeCreateNew'

export default {
  name: 'AuthODTAccountDetail',
  components: { AttributeCreateNew },
  props: {
    endPoint: {
      type: String,
      required: true,
      default: () => 'https://satchaos.demo.satproj.io/api/users/auth/login/',
    },
    attributes: {
      type: Array,
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      default: () => 'post',
    },
    labelHeader: {
      type: String,
      default: () => 'Account Detail',
    },
    titleButtonSubmit: {
      type: String,
      default: () => 'Update',
    },
  },
  methods: {
    submitted(data) {
      this.$emit('input', false)
      this.$emit('submitted', data)
    },
    errored(err) {
      this.$emit('errored', err)
    },
  },
}
</script>

<style scoped></style>
