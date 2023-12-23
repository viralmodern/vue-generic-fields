<template>
  <div>
    <v-autocomplete
      multiple
      small-chips
      dense
      return-object
      hide-details
      item-text="name"
      item-value="name"
      label="Selects item"
      v-model="friends"
      :items="components"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          small
          style="white-space: nowrap; text-overflow: ellipsis;"
          v-if="data.index === 0"
          :input-value="data.selected"
          @click="data.select"
        >
          <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
        <span v-if="data.index === 1" class="grey--text text-caption"
          >(+{{ friends.length - 1 }} others)</span
        >
      </template>
      <template v-slot:item="data">
        <v-list-item-avatar>
          <img :src="data.item.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'BuilderComBoBox',
  props: ['avatar'],
  data: () => ({
    friends: [],
    components: [
      {
        name: 'Sandra Adams',
        group: 'Group 1',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        name: 'Violet',
        group: 'Group 1',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
    ],
  }),
}
</script>

<style scoped></style>
