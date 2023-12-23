<template>
  <v-menu v-model="menu" :close-on-content-click="false" left offset-y>
    <template v-slot:activator="{ on }">
      <div v-on="on" class="text-capitalize d-flex align-center cusor--pointer">
        <v-icon small>mdi-swap-horizontal</v-icon>
        <div class="text-caption mx-1">
          Customize
        </div>
      </div>
    </template>

    <v-card dense>
      <v-list dense>
        <v-list-item dense>
          <v-list-item-subtitle>
            Show/Hide or Reorder Attributes
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="list-customize">
        <v-list-item>
          <v-list-item-title>
            <span class="text-caption">Card name</span>
          </v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <span class="text-caption">Labels</span>
          </v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Due date</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Members</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Progress</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Check list</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Estimation</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Attachment</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Notes</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Comments</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption"
            >Card activities</v-list-item-title
          >
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-caption">Sub tasks</v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuCustomizeBoard',
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
}
</script>

<style lang="scss">
.list-customize {
  .v-list-item--dense,
  .v-list--dense .v-list-item,
  .v-list-item {
    min-height: unset;
  }
  .v-list-item__action {
    margin: 0px;
    transform: scale(0.6);
  }
}
</style>
