<template>
  <div>
    <v-sheet height="60vh">
      <ThePanelResizableBase height="60vh"
                             :label="labelRoot"
                             color="indigo lighten-1">
        <template v-slot:header>
          <div class="d-flex align-center w-100 overflow-hidden">
            <v-icon class="mr-2">
              mdi-magnify
            </v-icon>
            <input type="text"
                   style="background-color: #f5f5fa"
                   class="text-input-search"
                   :placeholder="placeholder"
                   @input="changeSearch"/>
          </div>
        </template>
        <v-treeview dense
                    :search="search"
                    v-model="tree"
                    @input="data => $emit('input', data)"
                    :items="items"
                    :item-key="itemKey"
                    :item-text="itemText"
                    selected-color="indigo"
                    open-on-click
                    selectable
                    return-object
                    expand-icon="mdi-menu-down"
                    indeterminate-icon="mdi-bookmark-minus">
          <!--<template v-slot:label="{item, leaf}">
            <template v-if="leaf">
              <template v-if="item['ICON']">
                <v-chip color="#f5f5fa">
                  <v-icon small left>{{item["ICON"]}}</v-icon>
                  {{item[itemText]}}
                </v-chip>
              </template>
            </template>
            <template v-else>
              {{item[itemText]}}
            </template>
          </template>-->
        </v-treeview>
      </ThePanelResizableBase>
    </v-sheet>
  </div>
</template>

<script>
  import ThePanelResizableBase from "~/features/odt/ThePanelResizableBase"
  import arrayToTree from "array-to-tree"
  export default {
    name: "PanelTreeChoices",
    components: { ThePanelResizableBase },
    props: {
      choices: {
        type: Array,
        default: () => []
      },
      itemText: {
        type: [String, Number],
        default: () => "name"
      },
      itemKey: {
        type: [String, Number],
        default: () => "id"
      },
      itemKeyCate: {
        type: [String, Number],
        default: () => "brewery_type"
      },
      labelRoot: {
        type: String,
        default: () => "All Category"
      },
      placeholder: {
        type: String,
        default: () => "Search Types..."
      }

    },
    data: () => ({
      tree: [],
      types: [],
      search: "",
      caseSensitive: true
    }),
    computed: {
      items () {
        let { itemText, itemKey, choices, itemKeyCate, labelRoot } = this
        let children = arrayToTree(choices, { parentProperty: itemKeyCate, customID: itemKey })
        return [{
          [itemKey]: 'root',
          [itemText]: `${labelRoot}`,
          children
        }]
      },
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },
    },
    methods: {
      changeSearch(evt) {
        console.log(arguments)
        let searchText = evt.target.value
        this.search = searchText
      }
    }
  }
</script>

<style scoped lang="scss">
  .text-input-search {
    &:focus, &:active {
      outline: none;
      border: none;
    }
  }
</style>
