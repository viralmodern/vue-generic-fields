<template>
  <!-- <v-col cols="12" class="pa-0"> -->
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar height="50" style="background-color: rgb(245,245,245);">
        <v-toolbar-items class="hidden-sm-and-down">
          <template v-for="item in itemsMenu">
            <v-menu v-if="item.subMenu" :key="item.id" :nudge-width="100" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn elevation="0" v-on="on" small class="text-capitalize">
                  {{ item.name }}
                  <v-icon dark> mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list v-if="item.subMenu">
                <v-list-item
                  :to="`/project/${projectId}/${sub.link}`"
                  v-for="sub in item.subMenu"
                  :key="sub.id"
                >
                  <v-list-item-action>
                    <v-icon>{{ sub.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-title v-text="sub.name"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              elevation="0"
              :key="item.id"
              small
              class="text-capitalize"
              :to="`/project/${projectId}/${item.link}`"
              v-else
            >
              {{ item.name }}
              <v-icon v-if="item.subMenu" dark> mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-md-and-up">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" small icon>
                <v-icon>mdi-apps</v-icon>
              </v-btn>
            </template>
            <v-list>
              <template v-for="item in itemsMenu">
                <v-list-item
                  v-if="!item.subMenu"
                  :key="item.id"
                  :to="`/project/${projectId}/${item.link}`"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
                <v-list-group v-else :key="item.id">
                  <template v-slot:activator="{ on }">
                    <v-list-item v-on="on">
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-list-item
                    :to="`/project/${projectId}/${sub.link}`"
                    v-for="sub in item.subMenu"
                    :key="sub.id"
                  >
                    <v-list-item-action>
                      <v-icon>{{ sub.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title v-text="sub.name"></v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </template>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-row no-gutters class="justify-end">
          <v-btn icon>
            <v-icon size="30">mdi-rss_feed</v-icon>
          </v-btn>
        </v-row>
      </v-app-bar>
    </v-col>
  </v-row>
  <!-- </v-col> -->
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    itemsMenu: Array
  },
  computed: {
    projectId() {
      return this.$route.params.matter || this.$route.params.projectId;
    },
    ...mapGetters("ht_store/layout", ["rightType"])
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"])
  }
};
</script>
