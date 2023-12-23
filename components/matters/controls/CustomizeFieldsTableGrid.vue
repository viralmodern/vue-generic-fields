<template>
  <v-card>
    <v-card-text class="head-customize pb-0 white">
      <v-text-field
        solo-inverted
        flat
        dense
        hide-details
        v-model="searchQuery"
        clearable
        label="Search attributes"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <draggable
        class="list-group"
        tag="ul"
        v-model="fields_setting"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            class="list-group-item"
            v-for="(element, index) in fields_setting"
            :key="`${element[itemValue]}-${index}`"
          >
            <div class="d-flex align-center">
              <div class="flex-grow-1 d-flex align-center">
                <v-icon>mdi-drag</v-icon>
                <div class="flex-grow-1">
                  <template v-if="showIcon">
                    <v-chip small>
                      <v-icon v-if="showIcon" small left>
                        {{ element['type'] | getAttrIcon }}
                      </v-icon>
                      {{ element[itemText] }}
                    </v-chip>
                  </template>
                  <template v-else>
                    {{ element[itemText] }}
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
                  :input-value="element.active"
                ></v-switch>
              </div>
            </div>
          </li>
        </transition-group>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import { getAttributeByProp } from '../../../features/generic-fields/fields_config'

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]
export default {
  name: 'CustomizeFieldsTableGrid',
  display: 'Transitions',
  order: 7,
  components: {
    draggable
  },
  data() {
    return {
      list1: message.map((name, index) => {
        return { name, order: index + 1 }
      }),
      drag: false,

      searchQuery: ''
    }
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: () => 'text'
    },
    itemIcon: {
      type: String,
      default: () => 'icon'
    },

    itemValue: {
      type: String,
      default: () => 'value'
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(e, item, _index) {
      console.log('CHANGE', e, item, _index)
      let field = { ...item }
      field.active = e
      // this.$store.dispatch("matters/updateFields", { field })
      let fields = [...this.fields]
      let index = fields.findIndex(
        (f) => f[this.itemValue] === field[this.itemValue]
      )
      if (index >= 0) {
        fields[index] = field
      }

      this.$emit('resetFields', { field, fields })
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    // return this.$store.getters["matters/fields_setting"]
    fields_setting: {
      get() {
        let _search = this.searchQuery || ''
        return this.fields.filter((field) => {
          if (field) {
            return field[this.itemText]
              .toLowerCase()
              .includes(_search.toLowerCase())
          }
        })
      },
      set(fields) {
        console.error('fields', fields)
        if (this.searchQuery !== '') {
          return
        }
        try {
          this.$emit('resetFields', { fields })
        } catch (e) {
          console.log(e.message)
        }
      }
    }
  },
  filters: {
    getAttrIcon(type) {
      try {
        return getAttributeByProp({ type, prop: 'icon' })
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style>
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
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
  list-style: none;
  list-style-type: unset;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

ul {
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
