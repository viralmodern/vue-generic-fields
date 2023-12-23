<template>
  <v-list>
    <v-list-item class="pb-2">
      <v-btn block color="primary" @click="addItemList">
        <span>Add List</span>
        <v-icon class="pl-1">mdi-add_circle</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <b>FILTER</b>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="item in filter" :key="item.id" @click="filterRequest">
      <v-list-item-action>
        <v-icon>{{item.icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <b>TAGS</b>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="item in listTags" :key="item.id">
      <v-list-item-action>
        <v-checkbox v-model="tags" :value="item.text"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-subtitle>
          <FilingRoomTag :color="item.color" :text="item.text"/>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import FilingRoomTag from "../chips/FilingRoomTag";

export default {
  components: {
    FilingRoomTag
  },
  props: {
    listTags: Array,
    filter: Array
  },
  data() {
    return {
      tags: []
    };
  },
  methods: {
    filterRequest() {},
    addItemList(){
      this.$emit("addItemFillingRoom",true)
    }
  }
};
</script>
