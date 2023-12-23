<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 pb-0">
      <v-text-field
        dense
        single-line
        filled
        rounded
        v-model="search"
        label="Search Task"
        hide-details
        clearable
      ></v-text-field>
    </v-sheet>
    <v-card-text>
      <v-treeview
        dense
        open-all
        :multiple-active="false"
        activatable
        :active.sync="active"
        :return-object="true"
        v-model="selection"
        expand-icon="mdi-chevron-down"
        :items="items"
        :search="search"
        :filter="filter"
        item-text="name"
        item-key="pk"
        @update:active="updateActive"
        :open.sync="open"
      >
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import faker from 'faker'

export default {
  name: 'TreeTaskBoardWorkLogListTask',
  data() {
    return {
      // Tree
      selection: [],
      active: [],
      open: [],
      search: null,
      caseSensitive: true,
      items: [
        {
          // taskboard
          pk: faker.random.number(),
          value: faker.random.number(),
          name: faker.name.findName(),
          children: [
            {
              // list
              pk: faker.random.number(),
              value: faker.random.number(),
              name: faker.name.findName(),
              children: [
                // task
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                }
              ]
            },
            {
              // list
              pk: faker.random.number(),
              value: faker.random.number(),
              name: faker.name.findName(),
              children: [
                // task
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                }
              ]
            }
          ]
        },
        {
          // taskboard
          pk: faker.random.number(),
          value: faker.random.number(),
          name: faker.name.findName(),
          children: [
            {
              // list
              pk: faker.random.number(),
              value: faker.random.number(),
              name: faker.name.findName(),
              children: [
                // task
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                },
                {
                  pk: faker.random.number(),
                  value: faker.random.number(),
                  name: faker.name.findName()
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    }
  },
  methods: {
    async updateActive() {}
  }
}
</script>

<style scoped></style>
