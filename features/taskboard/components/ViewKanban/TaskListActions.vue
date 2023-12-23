<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text small dense v-on="on" style="min-width: unset; padding: 0px;">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item @click="showListEditPopup">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
      <v-list-item @click="showArchiveListPopup">
        <v-list-item-title>Archive</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Assign Members</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Add Task</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Add to Favorites</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Hide</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Duplicate</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Rename</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Change Color</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { Bus } from '../../utils/bus'

export default {
  name: 'TaskListActions',
  props: ['board', 'list'],
  methods: {
    showListEditPopup() {
      Bus.$emit('tasklist-editing', this.list)
      // this.$refs.dropdown.close()
    },
    showArchiveListPopup() {
      Bus.$emit('tasklist-archiving', {
        board: this.board,
        list: this.list
      })
      // this.$refs.dropdown.close()
    }
  }
}
</script>
<style scoped lang="scss">
.content-item {
  width: 100%;
  display: block;
  font-size: 12px;
  position: static;
  line-height: unset;
  min-height: unset;
  max-height: unset;
  cursor: pointer;
}
</style>
