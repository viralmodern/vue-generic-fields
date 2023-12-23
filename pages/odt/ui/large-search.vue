<template>
  <v-container>
    <div>
      <v-text-field v-model="search" @input="onSearch" />
      <div>
        <p>
          Total: <strong>{{ results.length }}</strong>
        </p>
        <template v-for="item in results">
          <div>
            {{ item.obj.company_name }}
            {{ item }}
          </div>
        </template>
        <!--<v-virtual-scroll :items="results" item-height="64" height="400">
          <template v-slot:default="{ item }">
            <div :key="item.cik_number">
              {{item.company_name}}
            </div>
          </template>
        </v-virtual-scroll>-->
      </div>
    </div>
  </v-container>
</template>

<script>
import fuzzySort from 'fuzzysort'
import Worker from '~/sat-vue-toolkit/workers/choices.worker'
import debounce from 'lodash/debounce'

const worker = new Worker()
export default {
  name: 'large-search',
  data() {
    return {
      items: [],
      results: [],
      search: '',
    }
  },
  mounted() {
    worker.onmessage = this.onReceived
    this.fetchList()
  },
  methods: {
    onReceived({ data }) {
      this.items = JSON.parse(data['stringData'])
    },
    fetchList() {
      let urlJson = '/json/cik/cik-0.json'
      worker.postMessage({ url: urlJson, type: urlJson })
    },
    onSearch: debounce(function (queryText) {
      let results = fuzzySort.go(queryText, this.items, {
        // keys: ["company_name", "cik_number"],
        key: 'company_name',
      })
      this.results = results
    }, 800),
  },
}
</script>

<style scoped></style>
