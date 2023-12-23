<template>
  <div>
    <!--<v-menu offset-y v-model="open" max-height="45vh" :close-on-content-click="false" transition="slide-y-transition">
      <template v-slot:activator="{on}">
        <div v-on="on">XXX</div>
      </template>
      <Treeselect :options="getItems"
                  :multiple="multiple"
                  show-count
                  :placeholder="label" :normalizer="normalizer">
        <label slot="option-label"
               slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
          {{ node.isBranch ? "Branch" : "Leaf" }}: {{ node.label }}
          <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
        </label>
      </Treeselect>
    </v-menu>-->
      <TreeSelect :options="getItems"
                  append-to-body
                  :multiple="multiple"
                  :value="value"
                  @input="data => $emit('input', data)"
                  show-count
                  valueFormat="object"
                  :placeholder="label" :normalizer="normalizer" @search-change="searchChange">
        <label slot="option-label"
               slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
          <TextHighlight :queries="queries" case-sensitive diacritics-sensitive class="caption" style="font-family: Roboto">
            {{ node.label }}
          </TextHighlight>
          <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
        </label>
      </TreeSelect>
    <!--<v-menu offset-y v-model="open" :close-on-content-click="false" transition="slide-y-transition">
      <template v-slot:activator="{on}">
        <v-sheet class="py-2">
          <div class="py-2 selection_tree_box " v-on="on" :class="{hasValue: getValues.length}">
            <label class="label_text">{{label}}</label>
            <div class="ma-n1">
              <template v-for="v in getValues">
                <v-chip small class="ma-1">{{v}}</v-chip>
              </template>
            </div>
          </div>
        </v-sheet>
      </template>
      <v-sheet color="#f5f5fa" class="pa-2">
        <div class="d-flex align-center w-100 overflow-hidden">
          <v-icon class="mr-2">
            mdi-magnify
          </v-icon>
          <input type="text" autofocus
                 style="background-color: #f5f5fa"
                 class="text-input-search d-block flex-grow-1"
                 :placeholder="label"
                 @input="changeSearch"/>
        </div>
      </v-sheet>
      <v-sheet outlined max-height="45vh" class="overflow-y-auto">
        <v-treeview :items="getItems"
                    :value="value"
                    @input="data => $emit('input', data)"
                    :search="search"
                    selectable open-all
                    return-object
                    open-on-click
                    :item-text="typeOptionalConfig.itemText"
                    :item-key="typeOptionalConfig.itemValue">
          <template v-slot:label="{ item, leaf }">
            <TextHighlight :queries="queries" case-sensitive diacritics-sensitive>
              {{ item.label }}
            </TextHighlight>
          </template>
        </v-treeview>
      </v-sheet>
    </v-menu>-->
  </div>
</template>

<script>
  import arrayToTree from "array-to-tree"
  import TextHighlight from "vue-text-highlight"
  import TreeSelect from "@riophae/vue-treeselect"
  import "@riophae/vue-treeselect/dist/vue-treeselect.css"
  import Worker from "~/sat-vue-toolkit/workers/choices.worker"
  export default {
    name: "FormFieldTreeChoices",
    props: {
      vBind: {
        type: Object,
        default: () => ({})
      },
      label: {},
      items: {
        type: Array,
        default: () => [],
        validator: (value) => {
          return Array.isArray(value)
        }
      },
      value: {},
      multiple: {
        type: Boolean,
        default: () => false
      },
      limitCount: {
        type: Number,
        default: () => 2
      },
      typeOptionalConfig: {
        type: Object,
        default: () => ({
          itemText: "label",
          itemValue: "value",
          itemKeyCate: "value",
          tableFormat: false,
          colHeaders: []
        })
      }
    },
    components: {
      TextHighlight,
      TreeSelect
    },
    data () {
      return {
        tree: [],
        search: "",
        open: false,
        worker: new Worker(),
        asyncItems: [],
        normalizer: (node) => {
          let { typeOptionalConfig: { itemText, itemValue, labelRoot, itemKeyCate } } = this
          return {
            id: node[itemValue],
            label: node[itemText]
          }
        }
      }
    },
    mounted () {
      this.worker.onmessage = this.onReceived
    },
    computed: {
      combinedItems() {
        let { typeOptionalConfig: { asyncData, urlJson }, items, asyncItems } = this
        if (asyncData && urlJson) {
          return asyncItems
        }
        return items
      },
      queries () {
        let { search } = this
        let query = search || ""
        query = query.toString()
        return query.split(/\s+/) || []
      },
      urlJson() {
        let {typeOptionalConfig = {}} = this
        return typeOptionalConfig.urlJson
      },
      getItems () {
        let { typeOptionalConfig: { itemText, itemValue, labelRoot, itemKeyCate }, combinedItems } = this
        let _l = arrayToTree(combinedItems, { parentProperty: itemKeyCate, customID: itemValue })
        return _l
      },
    },
    methods: {
      changeSearch (evt) {
        let searchText = evt.target.value
        this.search = searchText
      },
      searchChange(searchQuery, instanceId) {
        this.search = searchQuery
        console.error(arguments)
      },
      fetchAsyncJson(v) {
        // asyncData
        let { typeOptionalConfig: { asyncData, urlJson, headerJson = {} } } = this
        if (asyncData && urlJson) {
          this.worker.postMessage({ url: urlJson, headerJson, type: urlJson })
        }
      },
      onReceived ({ data }) {
        this.asyncItems = JSON.parse(data["stringData"])
      }
    },
    watch: {
      urlJson: {
        immediate: true,
        handler: 'fetchAsyncJson'
      }
    },
    beforeDestroy () {
      this.worker.terminate()
      this.worker = undefined
    }
  }
</script>

<style lang="scss">
  .selection_tree_box {
    border-bottom: solid 1px rgba(0, 0, 0, 0.87);
    cursor: text;

    .label_text {
      font-size: 16px;
      display: block;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transform-origin: top left;
      color: rgba(0, 0, 0, 0.6);
    }

    &.hasValue {
      .label_text {
        transform: translateY(-18px) scale(0.75);
        transform: translateY(-10px) scale(0.75);
        transform: translateY(3px) scale(0.75);
      }
    }
  }

  .text-input-search {
    &:focus, &:active {
      outline: none;
      border: none;
    }
  }
</style>
