<template>
  <div>
    <!--    <v-menu close-on-content-click-->
    <v-autocomplete
      outlined
      deletable-chips
      hide-details
      dense
      item-value="pk"
      item-text="name"
      :menu-props="{ closeOnContentClick: false }"
      v-model="model"
      :items="$store.getters['workspace/workspaceLabels']"
      :search-input.sync="search"
      hide-selected
      label="Add some labels"
      multiple
      small-chips
    >
      <!-- <template v-slot:item="{item}">
      {{item}}
    </template>-->
      <template v-slot:selection="{ item }">
        <v-chip small :color="`#${item.color}`">{{ item.name }}</v-chip>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong
              >".
              <!--<ChooseColor v-model="color"/>-->
              <br />
              Press <kbd>enter</kbd> to create a new label
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
  <!-- <div>
    <v-text-field
      label="Add a new label"
      v-model="text"
      dense
      outlined
      append-outer-icon="mdi-plus"
      @keyup.enter="addNew"
      @click:append-outer="addNew"
      hide-details
    >
      <template v-slot:append>
        <ChooseColor v-model="color"/>
      </template>
    </v-text-field>
    <v-list dense shaped v-if="list.length">
      <v-subheader>Labels</v-subheader>
      <template v-for="item in list">
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              &lt;!&ndash;<nuxt-link to="#link" v-text="item"/>&ndash;&gt;
              <ChipType
                :color="item.color"
                :text="item.name"
                close
                @click-close="clearLink(item)"
              />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon @click="clearLink(item)">
            <v-icon small>mdi-close</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </div>-->
</template>

<script>
import ChipType from '../../../../sat-vue-toolkit/components/ChipType'
import ChooseColor from '../../../../components/utils/ChooseColor'

export default {
  name: 'AttributesLabelCell',
  components: { ChooseColor, ChipType },
  data() {
    return {
      text: '',
      list: [],
      color: null,
      search: '',

      editing: null,
    }
  },
  props: {
    value: {},
  },
  computed: {
    model: {
      get() {
        return this.list
      },
      set(val) {
        this.list = val
      },
    },
  },
  methods: {
    async addNew() {
      try {
        if (!this.text) {
          return
        }
        console.log('addNew', arguments)
        await this.$axios.post(`api/labels/`, {
          name: this.text,
          color: this.color.replace('#', ''),
        })
        // this.list.push({ text: this.text, color: this.color })
        // this.text = ''
      } catch (e) {}
      return false
    },
    clearLink(item) {
      console.log(item, typeof item, this.list)
      try {
        let _index = this.list.findIndex((i) => i === item)
        this.list.splice(_index, 1)
      } catch (e) {
        console.log('clearLink', e.message)
      }
    },
    edit() {},
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      )
    },
  },
  watch: {
    list: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true,
    },
  },
}
</script>
