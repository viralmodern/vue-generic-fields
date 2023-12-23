<template>
  <v-list>
    <div>
      <v-list-item class="pb-2">
        <v-btn block color="primary" @click="$emit('openModal')">
          <span>Add Contact</span>
          <v-icon class="pl-1">mdi-add_circle</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item v-for="item in listFilter" :key="item.id" @click="filterRequest(item.link)">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="projectDetailType === 'byzantine'"></v-divider>
      <v-list-item v-if="projectDetailType === 'byzantine'">
        <v-list-item-content>
          <v-list-item-title>
            <b>TYPES</b>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-if="projectDetailType === 'byzantine'" class="filterCheckbox">
      <v-list-item v-for="item in listTags" :key="item.id">
        <v-list-item-action>
          <v-checkbox v-model="tags" :value="item.type"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle>
            <Types :type="item.type"/>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import Types from "../chips/ContactsType";
export default {
  components: {
    Types
  },
  props: {
    listTags: Array,
    listFilter: Array,
    projectDetailType: String
  },
  data() {
    return {
      tags: []
    };
  },
  methods: {
    filterRequest(link) {
      this.$emit("filterRequest", link)
    }
  },
  watch: {
    tags(e) {
      this.$emit("filterType", e);
    }
  }
};
</script>
<style scoped>
.filterCheckbox {
  max-height: 56.5vh;
  overflow: auto;
}
</style>
