<template>
  <div>
    <SearchKeyWordOpinions
      :end-point="endPoint"
      :results-docket="resultsDocket"
      @submitting="submitting"
      @submitted="submitted"
      @errored="errored"
    />
  </div>
</template>

<script>
import { TYPE_ODT_SEARCH } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SearchKeyWordOpinions from '~/features/odt/SearchKeyWordOpinions'

export default {
  components: {
    SearchKeyWordOpinions,
  },
  filters: {},
  props: {
    TYPE_ODT_SEARCH: {
      default: () => TYPE_ODT_SEARCH,
    },
  },
  data() {
    return {
      resultsDocket: {},
      q: '',
      endPoint: 'https://www.courtlistener.com/api/rest/v3/search/',
    }
  },
  mounted() {},
  computed: {},
  methods: {
    submitting({ query }) {
      this.$router.replace({ query })
    },
    submitted(data) {
      this.resultsDocket = data
    },
    errored(err) {},
  },
}
</script>

<style scoped>
.box_content_search {
  border: solid 1px rgba(0, 0, 0, 0.05);
}
</style>
