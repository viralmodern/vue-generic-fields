<template>
  <div>
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-tooltip bottom v-on="on">
          <template v-slot:activator="{ on }">
            <UserAvatar :avatarSize="32" :imageUrl="(item.avatar || {}).imageUrl" name="null" v-on="on"/>
          </template>
          <span>{{item.name || ''}}</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in character"
          :key="index"
          avatar
          @click="onChange(item.id)"
          :style="{color: showClassColor(item.id)}"
        >
          <v-list-item-avatar>
            <img :src="(item.avatar|| {}).imageUrl">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle :style="{color: showClassColor(item.id)}">{{ item.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  data() {
    return {
      menu: false
    };
  },
  props: {
    item: Object
  },
  components: {
    UserAvatar
  },
  methods: {
    onChange(id) {
      const data = {
        column: "judge",
        value: id
      };
      this.$emit("updateJudge", data);
      this.menu = false
    },
    showClassColor(e) {
      if (e == this.item.id) {
        return "#512DA8";
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
