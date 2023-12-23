<template>
  <div>
    <AttributeCreateNew
      label-header="Refine Your Query"
      :attributes="attributes"
      :end-point="endPoint"
      :include-params="includeParams"
      type="get"
      :bus-event-name="busEventName"
      title-button-submit="Apply"
      disabled-header
      @submitting="submitting"
      @submitted="submitted"
    />
    <!--    <v-autocomplete small-chips/>-->
  </div>
</template>

<script>
import AttributeCreateNew from '~/sat-vue-toolkit/components/slick-grid/attributes/AttributeCreateNew'

export default {
  name: 'QueryFilterSearchInDocket',
  components: { AttributeCreateNew },
  props: {
    busEventName: {
      type: String,
      default: () => 'query_filter_docket',
    },
    endPoint: {
      type: String,
      default: () => 'https://www.courtlistener.com/api/rest/v3/search/',
    },
    attributes: {
      type: Array,
      default: () => [],
    },
    includeParams: {
      type: Object,
      default: () => {
        return {
          q: 'docket_id:4354316',
          type: 'r',
        }
      },
    },
  },
  computed: {},
  methods: {
    submitted() {},
    submitting(data) {
      console.log('SUBMITTING', data)
      this.$router.replace({ query: data })
    },
  },
}
</script>

<style scoped></style>
