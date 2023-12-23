<template>
  <v-card tile style="border-bottom: solid 1px rgba(0, 0, 0, 0.1);">
    <!--    :style="{borderLeft: `solid 4px ${item.headerColor}`}"-->
    <v-card-title class="py-2">
      <v-menu
        :close-on-content-click="false"
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon small v-on="on">
            <v-icon small>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-arrow-up</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div class="text-caption">Collapse group</div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div class="text-caption">New group</div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
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
      <div class="mx-2">
        <div class="text-subtitle-2">
          {{ item.name }}
        </div>
      </div>
      <v-chip small label>{{ item.items.length | strPrex }}</v-chip>
      <v-spacer />
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'TaskBoardHeaderList',
  props: {
    item: {},
  },
  filters: {
    strPrex(total) {
      try {
        return total >= 2 ? `${total} Tasks` : `${total} Task`
      } catch {
        return 'N/A'
      }
    },
  },
}
</script>

<style scoped></style>
