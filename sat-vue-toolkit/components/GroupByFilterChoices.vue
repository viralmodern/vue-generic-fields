<template>
  <div class="box_group_by text-left">
    <!--<div>
      {{options}}
    </div>-->
    <!--<div>
      {{value}}
    </div>
    <div>
      {{val}}
    </div>-->

    <v-btn small
           active-class="primary--text"
           depressed
           style="border-color: transparent !important;"
           :input-value="hasValue"
           text
           rounded
           class="text-capitalize cursor--pointer caption tree_choices_link"
           @click.native="openMenu">
      <v-icon small left>mdi-view-stream</v-icon>
      {{value | l_label}} {{parentBranchValue}}
    </v-btn>
    <TreeSelect :multiple="multiple"
                ref="treeFilterSelect"
                class="tree_choices_action"
                :options="options"
                :normalizer="normalizer"
                search-nested open
                joinValues
                :alwaysOpen="false"
                showCount
                :disableBranchNodes="false"
                :placeholder="placeholder"
                :always-open="alwaysOpen"
                :limit="limit"
                @close="close"
                v-model="value">
      <template v-slot:after-list>
      </template>
      <template v-slot:before-list>
        <div class="px-3 before-list-custom">
          <label class="cursor--pointer" @click="clearGroup">None</label>
        </div>

      </template>
    </TreeSelect>
  </div>
</template>

<script>
  import TreeSelect from "@riophae/vue-treeselect"
  import { $$labelByName } from "@/sat-vue-toolkit/functions"
  import "@riophae/vue-treeselect/dist/vue-treeselect.css"
  export default {
    name: "GroupByFilterChoices",
    components: {
      TreeSelect
    },
    props: {
      options: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: () => "Group by"
      },
      val: {},
      groupType: {
        type: String,
        default: () => ''
      },
      alwaysOpen: {
        type: Boolean,
        default: () => true
      },
      limit: {
        type: Number,
        default: () => 1
      },


    },
    data: () => ({
      value: [],
      multiple: true,
      parentBranchValue: ''
    }),
    computed: {
      hasValue () {
        try {
          return this.value && this.value.length
        } catch (e) {
          return false
        }
      },
    },
    watch: {
      value (v) {
        try {
          const { treeFilterSelect } = this.$refs
          // todo case 1
          if (!this.value || !this.value.length || this.value.length === 1) {
            return
          }
          // todo case 2
          let lastValue = this.value.slice().reverse()[0]
          let prevLastValue = this.value.slice().reverse()[1]

          let nodeLastValue = treeFilterSelect.getNode(lastValue)
          let nodePrevLastValue = treeFilterSelect.getNode(prevLastValue)
          // node branch
          if (nodeLastValue.children) {
            return this.value = [lastValue]
          }
          // todo case 3
          if (nodeLastValue.parentNode !== nodePrevLastValue.parentNode) {
            return this.value = [lastValue]
          }
        } catch (e) {

        }finally {
          this.getParentBranchValue()
        }
      },
      val: {
        immediate: true,
        handler (v) {
          if(v && v.length) {
           this.convertValToFromMD5()
          }
        }
      },
      options: {
        immediate: true,
        handler (v) {
          if(v && v.length) {
           this.convertValToFromMD5()
          }
        }
      },

    },
    methods: {
      convertValToFromMD5() {
        try {
          let {val, options, groupType} = this
          let value = val.split(',').filter(t => t !== '0')
          let selected = []
          console.error({ value, options, groupType })
          if(!groupType) return this.value = []
          let group = options.filter(option => option['uuidField'] == groupType)
          let list = group[0]['list']
          list.forEach((t, index) => {
            let uuid_field_value = t['uuidField']
            let field_value = t[uuid_field_value]
            if(value.includes(field_value)) {
              selected.push(uuid_field_value)
            }
            this.value = selected
          })
        }catch (e) {

        }
      },
      normalizer (node) {
        return {
          id: node['uuidField'],
          label: node['uuidLabel'],
          children: node.children || node.list
        }
      },
      close (value, instanceId) {
        // console.log('CLOSE_MENU', value, instanceId)
        return this.reduceValue(value)
      },
      reduceValue (value) {
        let { $refs: { treeFilterSelect } } = this,
          items = [],
          group_by,
          k = 'uuidField',
          group_items, list = []
        if (!value || !value.length) {
          this.$emit("clearable")
          return console.log("REDUCE_VALUE")
        }
        let n = treeFilterSelect.getNode(value[0])
        if (n.children) {
          items = n.children
          items = n.children.map(t => {
            let uuid_field_value = t.raw['uuidField']
            return t.raw[uuid_field_value]
          })
          list = n.children.map(t => {
            return t.raw
          })
          group_by = n.raw.name
        } else {
          items = value.map(v => {
            let nodeChild = treeFilterSelect.getNode(v)
            group_by = nodeChild.parentNode ? nodeChild.parentNode.raw.name : nodeChild.raw['uuidField']
            let uuid_field_value = nodeChild.raw['uuidField']
            return nodeChild.raw[uuid_field_value]
          })
          list = value.map(v => {
            let nodeChild = treeFilterSelect.getNode(v)
            return nodeChild.raw
          })
        }
        if (items.length) {
          group_items = [...items, 0].join()
        } else {
          group_items = "0"
        }
        // todo: compare with old value
        let isNoChange = false
        let val = this.val
        if(val) {
          isNoChange = val.toString().localeCompare(group_items) === 0
        }
        if(isNoChange) return console.log("DUPLICATE_GROUP_BY", {val, group_items})
        console.log("CHANGED_GROUP_BY", {items, group_by, group_items, list})
        this.$emit("changed", { items, group_by, group_items, list })
      },
      clearGroup () {
        try {
          const { treeFilterSelect } = this.$refs
          treeFilterSelect.clear()
          treeFilterSelect.closeMenu()
        } catch (e) {
          console.log(e.message)
        }
      },

      openMenu () {
        try {
          const { treeFilterSelect } = this.$refs
          treeFilterSelect.openMenu()
        } catch (e) {
        }
      },
      getParentBranchValue () {
        try {
          if (!this.value || !this.value.length) {
            return this.parentBranchValue = ''
          }
          let node = this.value[0]
          const { treeFilterSelect } = this.$refs
          // console.log(node, treeFilterSelect)
          let currentNode = treeFilterSelect.getNode(node)
          return this.parentBranchValue = currentNode.parentNode ? currentNode.parentNode.label : currentNode.label
        } catch (e) {
          console.error('ERROR',e.message)
          return this.parentBranchValue = ''
        }
      }

    },
    filters: {
      l_label (v) {
        if (v && v.length) {
          return "Grouped by "
        }
        return "Group"
      },
      $$labelByName
    }
  }
</script>

<style scoped lang="scss">
  .before-list-custom {
    /*border: solid 1px blue;*/
  }
</style>
<style lang="scss">
  .box_group_by {
    /*border: solid 1px blue;*/
    position: relative;

    .tree_choices_link {
      border: solid 1px green;
      /*position: absolute;*/
      position: relative;
      z-index: 6;
      left: 0px;
      top: 0px;
    }
    .tree_choices_action {
      /*border: solid 1px red;*/
      position: absolute;
      top: 0px;
      top: 100%;
      left: 0px;
      /*z-index: 5;*/
      &.vue-treeselect--open {
        z-index: 5;
      }
      .vue-treeselect__control {
        /*height: 31px !important;
        display: block;
        opacity: 0;
        pointer-events: none;*/
        opacity: 0;
        pointer-events: none;
        min-width: 250px;
        border-color: rgba(0,0,0,0.05) !important;
        outline: none;
        &:hover {
          border-color: rgba(0,0,0,0.05);
          outline: none;
        }
      }
      &:hover {
        .vue-treeselect__control {
          border-color: rgba(0,0,0,0.05);
          outline: none;
        }
      }
      .vue-treeselect__menu-container {
        min-width: 150px;
        min-width: 250px;
        /*border: solid 1px red;*/
      }
      .vue-treeselect__single-value {
        line-height: 28px;
      }

      .vue-treeselect__placeholder {
        /*line-height: 28px;*/
      }
      &.vue-treeselect--open-below .vue-treeselect__menu {
        border-color: rgba(0,0,0,0.05);
      }
      &.vue-treeselect--searchable:not(.vue-treeselect--disabled) .vue-treeselect__value-container {
        /*cursor: pointer;*/
      }
      &.vue-treeselect--open {
        .vue-treeselect__control {
          opacity: unset;
          pointer-events: unset;
        }
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
  }
</style>

