<template>
  <v-row no-gutters fill-height>
    <v-list>
      <div>
        <v-list-item class="pa-2">
          <v-btn block color="primary" @click="$emit('openModal')">
            <span>Add activity</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <h3 class="ml-3">Filters</h3>
      <div v-for="item in filters " :key="item.id">
        <v-list-item @click="showContent">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <h3 class="ml-3">Tags</h3>
      <div class="filterCheckbox">
        <v-list-item v-for="item in tag" :key="item.id">
          <v-list-item-action>
            <v-checkbox v-model="tagTimeline" :value="item.name"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip small :color="item.color" class="white--text pb-1">
                <span>{{ item.name }}</span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <h3 class="ml-3">Characters</h3>
      <v-list-item v-for="val in members.map(x => ({...x, color: '#'+Math.random().toString(16).substr(-6)}))" :key="val.id">
        <v-list-item-action>
          <v-checkbox :value="val.name"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-chip small :color="val.color" class="white--text pb-1">
              <span>{{ val.name }}</span>
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tagTimeline: [],
      filters: [
        {
          id: Math.random(),
          name: "Starred",
          icon: "star"
        },
        {
          id: Math.random(),
          name: "Priority",
          icon: "warning"
        }
      ]
    };
  },
  methods: {
    showContent() {}
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  }
};
</script>

