<template>
  <v-card>
    <v-card-text class="py-2">
      <v-row no-gutters class="align-center">
        <v-col cols="12" md="8">
          <v-row no-gutters class="ma-0  align-center">
            <v-col cols="2">
              <UserAvatar
                :imageUrl="(creator.avatar || {}).imageUrl"
                :avatarSize="40"
                :name="creator.name || ''"
              />
            </v-col>
            <v-col cols="10">
              <div class="pl-3">
                <div class="subheading font-weight-bold">
                  {{ creator.name }}
                </div>
                <span class="text--secondary">{{ creator.email }}</span>
                <v-row no-gutters>
                  <v-col class="caption">{{ formatTimeCreator }}</v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-list-item class="grow avatars-list pl-3">
            <user-avatar
              v-for="(item, index) in listMember.slice(0, dataFor)"
              :key="item.id"
              :imageUrl="item.avatar.imageUrl"
              :name="item.name"
              :backgroundColor="colorsListForAvatars[index]"
              :isInList="true"
              width="24px"
              class="d-block"
            />
            <v-list-item-avatar
              class="d-block ma-0"
              v-if="(item.members || []).length > 3"
              :style="{ zIndex: 3, width: '24px', minWidth: '24px' }"
            >
              <div class="primary avatars-list-max">
                <span class="white--text">{{ lengthMember }}</span>
              </div>
            </v-list-item-avatar>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <div class="px-3 py-1 font-weight-bold subheading">{{ item.name }}</div>
    <div class="description-timeline px-3 py-1">
      <span class="text--secondary" v-html="item.description"></span>
    </div>
    <v-card-actions class="mb-1">
      <v-chip
        class="white--text"
        :color="type.color"
        small
        >{{ type.name }}</v-chip
      >
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn block class="primary" :to="to">View Detail</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import { colorsListForAvatars } from "../../config";
import moment from "moment";
export default {
  components: {
    UserAvatar
  },
  props: {
    item: Object,
    members: Array,
    types: Array,
    to: [Object, String]
  },
  data() {
    return {
      colorsListForAvatars
    };
  },
  computed: {
    formatTimeCreator() {
      return moment(this.item.created_at).fromNow();
    },
    dataFor() {
      if (this.listMember.length > 3) {
        return 2;
      } else {
        return 3;
      }
    },
    lengthMember() {
      if ((this.item.members || []).length > 99) {
        return (this.item.members || []).length + " + ";
      } else {
        return " +" + ((this.item.members || []).length - 2);
      }
    },
    creator() {
      return this.members.find(x => x.id === this.item.creator) || {};
    },
    listMember() {
      return (this.members || []).filter(x => {
        return this.item && this.item.members.includes(x.id);
      });
    },
    type() {
      return this.types.find(x => x.id === this.item.type);
    }
  }
};
</script>

<style scoped>
.avatars-list .img-avatar:first {
  margin-left: 0px;
}
.chip-timeline {
  line-height: normal;
}
.description-timeline {
  height: 80px;
  overflow: auto;
}
.description-timeline::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
.description-timeline::-webkit-scrollbar {
  width: 3px;
  background-color: #f5f5f5;
}
.description-timeline::-webkit-scrollbar-thumb {
  background-color: #000000;
}
.avatars-list-max {
  width:40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
