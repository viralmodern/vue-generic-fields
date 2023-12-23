
<template>
  <draggable v-bind="dragOptions" v-model="listItem" class="bigger-area">
    <transition-group name="list-complete">
      <div
        v-for="item in listItem"
        :key="item.id"
        class="drag-item flex flex-justify-betweeen"
        @dragend="dragAndDrop"
      >
        <v-list-item avatar>
          <v-list-item-avatar>
            <UserAvatar
              :avatarSize="35"
              :imageUrl="(item.avatar || {}).imageUrl"
              :name="item.avatar.name"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <div>{{item.avatar.name}}</div>
            <div class="text--secondary text-body-1">{{item.avatar.email}}</div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </transition-group>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    items: Array
  },
  components: {
    draggable,
    UserAvatar
  },
  data() {
    return {
      listItem: []
    };
  },
  methods: {
    dragAndDrop() {
      var arrId = this.listItem.map(i => i.id);
      return arrId;
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "listItem",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  mounted() {
    this.listItem = this.items;
  }
};
</script>
