<template>
  <v-form @submit.prevent="$emit('searchSubmit', query)">
    <v-text-field
      ref="input"
      filled
      flat
      :style="defaultStyle || { 'font-size': `12px` }"
      rounded
      hide-details
      height="35px"
      dense
      prepend-inner-icon="mdi-magnify"
      v-model="query"
      aria-autocomplete="none"
      :placeholder="getPlaceholder"
    >
    </v-text-field>
  </v-form>
</template>
<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    value: {
      type: String,
      default: () => '',
    },
    placeholder: { type: String },
    focus: {
      type: Boolean,
    },
    defaultStyle: {
      type: [Boolean, Object],
      default: () => ({
        'font-size': '12px',
        transform: 'scale(0.8) translateX(15%)',
      }),
    },

    vBin: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      internalValue: '',
    }
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    query: {
      get() {
        return this.value || this.internalValue
      },
      set: debounce(function (value) {
        this.internalValue = value
        this.$emit('input', value)
      }, 200),
    },
    getPlaceholder() {
      return (
        // this.placeholder || 'Search label' || 'this.$t(general.label.search)'
        this.placeholder || 'Search label'
      )
    },
  },
}
</script>
<style scoped lang="scss"></style>
