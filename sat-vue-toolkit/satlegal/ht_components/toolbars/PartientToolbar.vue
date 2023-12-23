<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar height="50">
        <v-app-bar-items class="hidden-sm-and-down">
          <template v-for="item in itemsMenu">
            <v-menu
              v-if="item.subMenu"
              :key="item.id"
              :nudge-width="100"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn small class="text-capitalize" v-on="on">
                  {{ item.name }}
                  <v-icon dark> mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list v-if="item.subMenu">
                <v-list-item
                  :to="`/partient/${item.link}`"
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
            <template v-slot:activator="{ on }" v-else>
              <v-btn
                :key="item.id"
                small
                class="text-capitalize"
                v-on="on"
                :to="`/partient/${item.link}`"
              >
                {{ item.name }}
                <v-icon v-if="item.subMenu" dark> mdi-chevron-down</v-icon>
              </v-btn>
            </template>
          </template>
        </v-app-bar-items>
        <v-spacer></v-spacer>
        <v-row no-gutters class="justify-end">
          <v-btn icon>
            <v-icon size="30">mdi-rss_feed</v-icon>
          </v-btn>
        </v-row>
      </v-app-bar>
    </v-col>
  </v-row>
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
