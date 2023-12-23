<template>
  <div class="mb-2">
    <v-text-field
      v-if="!disabledInputSearch"
      v-model="val"
      rounded
      filled
      dense
      placeholder="Search"
      single-line
      label="Search Company Directory"
      flat
      :disabled="disabledInputSearch"
      clearable
      hide-details
      append-icon="mdi-magnify"
      @click:clear="searchResults"
      @click:append="searchResults"
      @keydown.enter="searchResults"
    >
    </v-text-field>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'SearchInputContentDocket',
  props: {
    value: {},
    disabledInputSearch: {
      type: Boolean,
      default: () => false,
    },
    endPoint: {
      type: String,
      default: '',
    },
    includeParams: {
      type: Object,
      default: () => ({}),
    },
    typeOdtSearch: {},
  },
  data() {
    return {
      submitting: false,
      text: '',
    }
  },
  mounted() {
    this.searchResults()
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.text = v
        this.searchResults()
      },
    },
    $route: {
      immediate: true,
      handler(v) {
        const { query } = v
        if (query.hasOwnProperty('q')) {
          this.text = query['q']
        }
      },
    },
  },
  computed: {
    val: {
      get() {
        return this.text
      },
      set: debounce(function (v) {
        this.$emit('input', v)
      }, 800),
    },
  },
  methods: {
    async searchResults() {
      try {
        this.submitting = true
        let includeParams = { ...this.includeParams }
        const { query } = this.$route
        let q = { q: this.val }
        let params = { ...query, ...q }
        if (Object.keys(includeParams).length > 0) {
          params = { ...includeParams, ...params }
        }
        this.$emit('submitting', { query: params })
        let res = await this.$api.get(this.endPoint, { params })
        this.$emit('submitted', res['data'])
      } catch (err) {
        this.$emit('errored', err)
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>

<style scoped></style>
