<template>
  <v-combobox
    v-model="model"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Search for an option"
    multiple
    small-chips
    hide-details
    class="custom_builder"
    flat
    dense
  >
    <template v-slot:no-data>
      <v-list-item dense>
        <span class="subheading">Create</span>
        <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
          {{ search }}
        </v-chip>
      </v-list-item>
    </template>
    <!--<template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey&#45;&#45;text text-caption"
      >(+{{ value.length - 1 }} others)</span>
    </template>-->
    <template v-slot:selection="{ attrs, item, index, parent, selected }">
      <v-chip
        v-if="item === Object(item) && index === 0"
        v-bind="attrs"
        :color="`${item.color} lighten-3`"
        :input-value="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
        <v-icon small @click="parent.selectItem(item)">mdi-close </v-icon>
      </v-chip>
      <span v-if="index === 1" class="grey&#45;&#45;text text-caption"
        >(+{{ model.length - 1 }} others)</span
      >
    </template>
    <template v-slot:item="{ index, item }">
      <v-text-field
        v-if="editing === item"
        v-model="editing.text"
        autofocus
        background-color="transparent"
        hide-details
        solo
        single-line
        flat
        @keyup.enter="edit(index, item)"
      ></v-text-field>
      <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
        {{ item.text }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-list-item-action @click.stop dense>
        <v-btn icon small dense @click.stop.prevent="edit(index, item)">
          <v-icon small>{{
            editing !== item ? 'mdi-pencil' : 'mdi-check'
          }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: 'BuilderLabels',
  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    index: -1,
    items: [
      { header: 'Select an option or create one' },
      {
        text: 'Foo',
        color: 'blue',
      },
      {
        text: 'Bar',
        color: 'red',
      },
      {
        text: 'success',
        color: 'pink',
      },
      {
        text: 'Virus',
        color: 'teal',
      },
    ],
    nonce: 1,
    menu: false,
    model: [
      {
        text: 'Foo',
        color: 'blue',
      },
    ],
    x: 0,
    search: null,
    y: 0,
  }),

  watch: {
    model(val, prev) {
      if (val.length === prev.length) return

      this.model = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
      this.$eventHub.$emit('change-tagables', this.model)
    },
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        this.editing = null
        this.index = -1
      }
    },
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
}
</script>

<style scoped></style>
