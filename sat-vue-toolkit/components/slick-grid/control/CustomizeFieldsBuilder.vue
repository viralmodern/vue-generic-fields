<template>
  <MenuShowHideFields :title="titleButton">
    <v-card>
      <v-card-text class="head-customize py-0">
        <v-card class="head-customize pb-0" flat>
          <v-text-field solo-inverted
                        flat
                        dense
                        hide-details
                        v-model="searchQuery"
                        clearable
                        :label="placeholder"></v-text-field>
        </v-card>
      </v-card-text>
      <v-card-text>
        <draggable
          class="list-group no_style"
          tag="ul"
          v-model="fields_setting"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false" handle=".handle-drag"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <li class="list-group-item" :class="{ghost: element[itemValue] === itemGhost}"
                v-for="(element, index) in fields_setting"
                :key="`${element[itemValue]}-${index}`">
              <div class="d-flex align-center">
                <div class="flex-grow-1 d-flex align-center">
                  <v-icon class="handle-drag" v-if="!disabledDraggable">mdi-drag</v-icon>
                  <div class="flex-grow-1 text-left">
                    <template v-if="showIcon">
                      <v-chip small>
                        <v-icon v-if="showIcon" small left>
                          {{ element["type"]}}
                        </v-icon>
                        {{ element[itemText] }}
                      </v-chip>
                    </template>
                    <template v-else>
                      <template v-if="link">
                        <router-link class="text-decoration-none"
                                     :to="`${element.rootPath}/${element.path}`"
                                     v-html="element[itemText]"/>
                      </template>
                      <template v-else>
                        {{ element[itemText] }}
                      </template>
                    </template>
                  </div>
                </div>
                <div>
                  <v-switch
                    hide-details
                    dense
                    @change="change($event, element, index)"
                    class="mt-0"
                    :ripple="false"
                    :input-value="!element.hide"
                  ></v-switch>
                </div>
              </div>
            </li>
          </transition-group>
        </draggable>
      </v-card-text>
    </v-card>
  </MenuShowHideFields>
</template>

<script>
  import draggable from "vuedraggable"
  import MenuShowHideFields from "./MenuShowHideFields"
  import debounce from "lodash/debounce"

  export default {
    name: "CustomizeFieldsBuilder",
    display: "Transitions",
    order: 7,
    components: {
      MenuShowHideFields,
      draggable
    },
    data () {
      return {
        drag: false,
        searchQuery: ""
      }
    },
    props: {
      fieldsConfig: {
        type: Array,
        default: () => []
      },
      itemText: {
        type: String,
        default: () => "text"
      },
      itemIcon: {
        type: String,
        default: () => "icon"
      },

      itemValue: {
        type: String,
        default: () => "value"
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      itemGhost: {
        type: String,
        default: () => ""
      },
      placeholder: {
        type: String,
        default: () => "Search attributes"
      },
      titleButton: {
        type: String,
        default: () => "Customize"
      },
      link: {
        type: Boolean,
        default: () => false
      },
      multiple: {
        type: Boolean,
        default: () => true
      },
      disabledDraggable: {
        type: Boolean,
        default: () => false
      }

    },
    methods: {
      change: debounce(function (e, item, _index) {
        let { multiple, fieldsConfig, itemValue } = this
        let field = { ...item }
        let hide = !e
        field.hide = hide
        let fields = [...fieldsConfig]
        let index = fields.findIndex(
          (f) => f[itemValue] === field[itemValue]
        )
        if (index >= 0) {
          fields[index] = field
        }
        if (!multiple) {
          fields = fields.map(f => {
            let t = { ...f }
            if (t[itemValue] !== field[itemValue]) {
              t["hide"] = true
            }
            return t
          })
        }
        this.$emit("resetFields", { field, fields })
      }, 50)

    },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      // return this.$store.getters["matters/fields_setting"]
      fields_setting: {
        get () {
          let { searchQuery, fieldsConfig, itemText } = this
          let _search = searchQuery || ""
          console.log(searchQuery, fieldsConfig, itemText)
          return fieldsConfig.filter((field) => {
            if (field) {
              let t = field[itemText] || ''
              return t.toLowerCase().includes(_search.toLowerCase())
            }
          })
        },
        set (fields) {
          if (this.searchQuery !== "") {
            return
          }
          try {
            this.$emit("resetFields", { fields })
          } catch (e) {
          }
        }
      }
    },
    filters: {}
  }
</script>

<style lang="scss">
  .button {
    margin-top: 35px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    height: 0px;
    overflow: hidden;
  }

  .list-group {
    min-height: 20px;
    list-style: none;
    list-style-type: unset;
  }

  .list-group-item {

    .handle-drag {
      cursor: move;
    }
  }

  .list-group-item i {
    cursor: pointer;
  }

  ul.no_style {
    list-style: none !important;
    margin: unset !important;
    padding: unset !important;
  }

  .head-customize {
    position: sticky;
    top: 0;
    padding-top: 20px;
    z-index: 9;
  }
</style>
