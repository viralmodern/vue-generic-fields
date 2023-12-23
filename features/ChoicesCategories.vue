<template>
  <v-list flat dense>
    <v-list-item-group
      :multiple="multiple"
      :value="value"
      color="indigo"
      @change="change"
    >
      <template v-for="category in categories">
        <v-divider :key="`cate-divider-${category[itemValue]}`" />
        <v-list-item
          dense
          :key="`cate-${category[itemValue]}`"
          :value="category[itemValue]"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                hide-details
                :ripple="false"
                :input-value="active"
                color="indigo accent-4"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-text="category[itemText]"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'ChoicesCategories',
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: () => false,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: () => 'label',
    },
    itemValue: {
      type: String,
      default: () => 'name',
    },
  },
  methods: {
    change(v) {
      this.$emit('input', v)
    },
  },
}
</script>

<style scoped></style>
