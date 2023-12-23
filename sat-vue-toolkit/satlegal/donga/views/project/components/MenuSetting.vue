<template>
  <v-menu
    :close-on-content-click="true"
    offset-y
    origin="center center"
    transition="scale-transition">
    <template v-slot:activator="{ on }">
      <a class="fds">
        <v-icon v-on="on">settings</v-icon>
      </a>
    </template>
    <v-card>
      <v-list dense>
        <v-list-item-title class="v-subheader">Settings</v-list-item-title>
        <template v-for="item in settings.child">
          <v-list-item v-if="item.to"
                       :key="`${item.title}-sub`"
                       :to="{hash: item.to, path: item.path}"
                       ripple>
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>

          <v-list-item v-else
                       :key="`${item.title}-sub`"
                       @click="onClickMenu(item.action)"
                       ripple>
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>

        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  import {LINKS} from './constant';

  export default {
    name: "MenuSetting",
    data() {
      return {
        settings: {
          child: [
            {title: 'Workflow', icon: 'playlist_add_check', to: LINKS.WORKFLOW, path: "overview"},
            {title: 'Manage people', icon: 'verified_user', action: LINKS.MANAGE},
            {title: 'Edit', icon: 'edit', action: LINKS.EDIT},
            {title: 'Delete', icon: 'delete', action: LINKS.DEL},
          ]
        }
      }
    },
    methods: {
      onClickMenu(_type) {
        this.$eventHub.$emit(this.$eventTypes.menuProjectSetting, _type);
      }
    }
  }
</script>

<style scoped>

</style>
