<template>
  <div>
    <div class="px-4" style="max-width: 350px;">
      <v-text-field
        background-color="deep-purple lighten-5"
        @input="onSearch"
        solo
        rounded
        dense
        flat
        append-icon="mdi-magnify"
        single-line
        label="Search Regulations"
        clearable
      />
    </div>
    <v-treeview
      return-object
      ref="treeRegulation"
      :search.sync="search"
      v-model="tree"
      :filter="filter"
      :open="open"
      :items="items"
      activatable
      item-key="name"
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <template v-if="!item.file">
          <v-icon>
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
        </template>
        <template v-else>
          <v-icon>
            {{ files[item.file] }}
          </v-icon>
        </template>
      </template>
      <template v-slot:label="{ item, leaf }">
        <template v-if="leaf && item.file">
          <router-link :to="`/odt/regulation${item.link}`">
            <TextHighlight
              :queries="queries"
              case-sensitive
              diacritics-sensitive
            >
              {{ item.name }}
            </TextHighlight>
          </router-link>
        </template>
        <template v-else>
          <TextHighlight :queries="queries" case-sensitive diacritics-sensitive>
            {{ item.name }}
          </TextHighlight>
        </template>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import regulations from './regulations.json'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import TextHighlight from 'vue-text-highlight'
export default {
  name: 'TreeNestedListRegulation',
  components: {
    TextHighlight,
  },
  data: () => ({
    search: '',
    caseSensitive: true,
    open: [],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-json',
      md: 'mdi-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    tree: [],
    items: [...regulations],
  }),
  computed: {
    queries() {
      return this.search.split(/\s+/)
    },
    filter() {
      if (this.caseSensitive) {
        return (item, search, textKey) => {
          const options = {
            includeScore: true,
            caseSensitive: true,
            // Search in `author` and in `tags` array
            keys: ['name', 'link', 'file'],
          }
          const fuse = new Fuse([item], options)
          const result = fuse.search(search)
          console.log(result, fuse)
          return result.length > 0
          // return item[textKey].toLowerCase().indexOf(search) > -1
        }
      }
      return undefined
    },
  },
  methods: {
    initTreeActivate() {
      let { fullPath } = this.$route
      console.log(fullPath)
      let strFullPath = fullPath.replace('/regulation/', '').split('/')
      console.log('$_ROUTE', strFullPath[0])
      console.log(this.$refs['treeRegulation'])
    },
    onSearch: debounce(function (v) {
      console.log('DEBOUNCE', v)
      this.search = v
    }, 800),
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(v) {
        this.initTreeActivate()
      },
    },
  },
}
</script>

<style scoped></style>
