<template>
  <v-menu
    transition="slide-y-transition"
    max-height="45vh"
    dense
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <div class="text-capitalize d-flex align-center cusor--pointer" v-on="on">
        <v-icon small>mdi-sort</v-icon>
        <div class="mx-1 text-caption">
          Group by: <strong>{{ grouped | nameGroup }}</strong>
        </div>
      </div>
    </template>
    <v-card>
      <div style="position: sticky; top: 0px; z-index: 2;" class="pa-2 white">
        <v-text-field
          dense
          v-model="searchQuery"
          label="Search Attributes"
          solo-inverted
          flat
          hide-details
          append-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <v-list dense shaped v-model="grouped">
        <v-list-item
          v-for="n in items"
          active-class="primary--text"
          :key="n.pk"
          link
          @click="clickItem(n)"
          :input-value="grouped === n"
          :value="n.pk"
        >
          <v-list-item-icon class="mr-1">
            <v-icon small>
              {{ n.type | getAttrIcon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title
            v-text="n.name"
            class="text-caption"
          ></v-list-item-title>
          <v-list-item-action>
            <v-icon small color="success" v-if="grouped === n"
              >mdi-check</v-icon
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
import _ from 'lodash'
import mx_taskboard from '../../mixins/mx_taskboard'
import { getAttributeByProp } from '../../../generic-fields/fields_config'

export default {
  name: 'MenuShowBy',
  mixins: [mx_taskboard],
  data() {
    return {
      active: '',
      searchQuery: '',
      itemText: 'name',
      grouped: '',
    }
  },

  computed: {
    items: {
      get() {
        try {
          return this.$$getAttributesExitsGroupBy().filter((field) => {
            if (field) {
              return field[this.itemText]
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            }
          })
        } catch (e) {
          console.log('XXX', e.message)
          return []
        }
      },
    },
  },
  watch: {},
  methods: {
    clickItem(n) {
      this.grouped = n
      // dispatch event
    },
  },
  filters: {
    getAttrIcon(type) {
      try {
        return getAttributeByProp({ type, prop: 'icon' })
      } catch (e) {
        return 'N/A'
      }
    },
    nameGroup(val) {
      try {
        return val.name
      } catch (e) {
        return 'N/A'
      }
    },
  },
}
</script>

<style scoped></style>
