<template>
    <div class="box_group_by text-left">
      <v-btn small
             active-class="primary--text"
             depressed
             style="border-color: transparent !important;"
             :input-value="value"
             text
             class="text-transform-unset caption tree_choices_link"
             @click.native="openMenu">
        <v-icon small left>mdi-view-stream</v-icon>
        {{value | l_label}} {{value | $$labelByName}}
      </v-btn>
      <TreeSelect v-model="value"
                  class="tree_choices_action"
                  ref="treeselect"
                  :multiple="multiple"
                  search-nested
                  joinValues
                  :disableBranchNodes="false"
                  :flat="false"
                  showCount
                  :placeholder="placeholder"
                  :normalizer="normalizer"
                  :options="options"
                  @input="inputEvt"
                  @select="select">
        <template v-slot:before-list>
          <div class="vue-treeselect__list-item" @click="clearGroup">
            <div class="vue-treeselect__option1">
              <div class="vue-treeselect__label-container">
                <label class="vue-treeselect__label">None</label>
              </div>
            </div>
          </div>
        </template>
      </TreeSelect>
    </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect"
  import "@riophae/vue-treeselect/dist/vue-treeselect.css"
  import { $$labelByName } from "@/sat-vue-toolkit/functions"

  export default {
    name: "TreeChoices",
    components: { TreeSelect: Treeselect },
    props: {
      options: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        // default: () => ''
        default: () => "Group by"
      },

      multiple: {
        type: Boolean,
        default: () => false
      },
      val: {}
    },
    data () {
      return {
        // define the default value
        value: null,
        // define options
        normalizer: (node) => {
          return {
            // id: uniqueId(node.value || node.pk || node.name),
            id: node.name,
            label: $$labelByName(node)
            // label: node.label || node.name
            // children: node.list,
          }
        }
      }
    },
    mounted () {

    },
    watch: {
      value () {
        return
        const { treeselect } = this.$refs
        // todo case 1
        if (!this.value || !this.value.length || this.value.length === 1) {
          return
        }
        // todo case 2
        let lastValue = this.value.slice().reverse()[0]
        let prevLastValue = this.value.slice().reverse()[1]

        let nodeLastValue = treeselect.getNode(lastValue)
        let nodePrevLastValue = treeselect.getNode(prevLastValue)
        // node branch
        if (nodeLastValue.children) {
          return this.value = [lastValue]
        }
        // todo case 3

        if (nodeLastValue.parentNode !== nodePrevLastValue.parentNode) {
          return this.value = [lastValue]
        }

      },
      val: {
        immediate: true,
        handler (v) {
          this.value = v
        }
      }
    },
    methods: {
      getRawIdNode (raw) {
        let k = ""
        if (raw.hasOwnProperty("pk")) {
          k = "pk"
        } else if (raw.hasOwnProperty("value")) {
          k = "value"
        } else if (raw.hasOwnProperty("id")) {
          k = "id"
        } else {
          k = "name"
        }
        return k
      },
      inputEvt (value) {
        if (!value) {
          this.$emit("clearable")
        }
      },
      select (node, nodeId) {
        try {
          let items = [],
            group_by,
            k,
            group_items, list = []
          k = this.getRawIdNode(node.list ? node.list[0] : {})

          items = node.list ? node.list.map(item => item[k]) : []
          group_by = node["name"]
          list = node.list || []
          if (items.length) {
            let conditions = [null, "null"],
              items_conditions = []
            items.forEach(item => {
              if (!conditions.includes(item)) {
                items_conditions.push(item)
              }
            })
            group_items = [...items_conditions, 0].join()

          } else {
            group_items = "0"
          }
          this.$emit("changed", { items, group_by, group_items, list })
        } catch (e) {
        }
      },
      close () {
        console.log('CLOSE_MENU')
        let { value, $refs: { treeselect } } = this,
          items = [],
          group_by,
          k,
          group_items, list = []
        if (!value || !value.length) {
          return
        }
        let n = treeselect.getNode(value[0])
        if (n.children) {
          items = n.children
          items = n.children.map(t => {
            k = this.getRawIdNode(t.raw)
            return t.raw[k]
          })
          list = n.children.map(t => {
            k = this.getRawIdNode(t.raw)
            return t.raw
          })
          group_by = n.raw.name
        } else {
          items = value.map(v => {
            let nodeChild = treeselect.getNode(v)
            k = this.getRawIdNode(nodeChild.raw)
            group_by = nodeChild.parentNode ? nodeChild.parentNode.raw.name : nodeChild.raw[k]
            return nodeChild.raw[k]
          })
          list = value.map(v => {
            let nodeChild = treeselect.getNode(v)
            return nodeChild.raw
          })
        }
        if (items.length) {
          group_items = [...items, 0].join()
        } else {
          group_items = "0"
        }
        this.$emit("changed", { items, group_by, group_items, list })
      },
      clearGroup () {
        try {
          console.log(this.$refs.treeselect)
          this.$refs.treeselect.clear()
          this.$refs.treeselect.closeMenu()
        } catch (e) {

        }
      },
      openMenu () {
        try {
          this.$refs.treeselect.openMenu()
        } catch (e) {
        // 13,500,000 + 5,686,000 - 6000000
        }
      }
    },
    filters: {
      l_label (v) {
        if (v) {
          return "Grouped by "
        }
        return "Group"
      },
      $$labelByName
    }
  }
</script>

<style lang="scss">
  /*.box_group_by {
    !*border: solid 1px blue;*!
    position: relative;

    .tree_choices_link {
      border: solid 1px green;
      !*position: absolute;*!
      position: relative;
      z-index: 6;
      left: 0px;
      top: 0px;
    }
    .tree_choices_action {
      !*border: solid 1px red;*!
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 5;
      .vue-treeselect__control {
        height: 31px !important;
        display: block;
        opacity: 0;
        pointer-events: none;
      }

      .vue-treeselect__menu-container {
        min-width: 150px;
        min-width: 250px;
        !*border: solid 1px red;*!
      }
      .vue-treeselect__single-value {
        line-height: 28px;
      }

      .vue-treeselect__placeholder {
        line-height: 28px;
      }
      &.vue-treeselect--open-below .vue-treeselect__menu {
        border-color: rgba(0,0,0,0.05);
      }
      &.vue-treeselect--searchable:not(.vue-treeselect--disabled) .vue-treeselect__value-container {
        cursor: pointer;
      }
    }
  }
  .theme--dark {
    .box_group_by {
      .tree_choices_action {
        .vue-treeselect__menu {
          background: rgba(30,30,30, 1) !important;
          .vue-treeselect__option--highlight {
            background: none;
          }
          .vue-treeselect__option--selected {
            background: rgba(255,255,255, 0.4) !important;
          }
        }
      }
    }
  }*/
</style>
