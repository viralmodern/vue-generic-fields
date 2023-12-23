<template>
  <v-card flat max-width="500">
    <v-card-text v-if="active.length">
      <ChipType
        dark
        close
        class="ma-1"
        v-for="(i, index) in active"
        :text="`${i['name']}`"
        :key="`select-${index}`"
      />
    </v-card-text>
    <v-divider />
    <v-text-field
      :placeholder="placeholder"
      flat
      solo
      style="font-size: 14px;"
      v-model="search"
      hide-details
      clearable
    ></v-text-field>
    <v-divider />
    <v-card-text>
      <v-treeview
        :multiple-active="multipleActive"
        activatable
        :active.sync="active"
        :return-object="returnObject"
        v-model="selection"
        :items="items"
        :search="search"
        :filter="filter"
        :item-text="itemText"
        :item-key="itemValue"
        @update:active="updateActive"
        :open.sync="open"
      >
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import ChipType from '../../sat-vue-toolkit/components/ChipType'

export default {
  name: 'ChooseItemsTree',
  components: { ChipType },
  data: () => ({
    selection: [],
    active: [],
    open: [1, 2],
    search: null,
    caseSensitive: true,
  }),
  props: {
    items: {
      type: Array,
      default: () => [
        {
          id: 'L110',
          value: 'L110',
          name: 'L110 Fact Investigation/Development',
        },
      ],
    },
    itemText: {
      type: String,
      default: () => 'name',
    },
    itemValue: {
      type: String,
      default: () => 'id',
    },
    multipleActive: {
      type: Boolean,
      default: () => false,
    },
    returnObject: {
      type: Boolean,
      default: () => true,
    },

    placeholder: {
      type: String,
      default: () => 'Search Entries',
    },
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  methods: {
    updateActive(items) {
      this.$emit('change', { items })
    },
  },
  watch: {
    active(items) {
      // this.$emit("change", { items })
    },
  },
}
</script>

<style scoped></style>
