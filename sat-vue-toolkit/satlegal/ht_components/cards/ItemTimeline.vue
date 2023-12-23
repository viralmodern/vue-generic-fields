<template>
  <v-card class="pa-1 ma-1">
    <v-card-text class="pb-1">
      <v-row no-gutters>
        <v-col cols="8">
          <v-row no-gutters>
            <v-col cols="2">
              <UserAvatar
                :imageUrl="((item.creator || {}).avatar || {}).imageUrl"
                :avatarSize="40"
                :name="(item.creator || {}).name"
              />
            </v-col>
            <v-col cols="10">
              <div class="pl-3">
                <div class="text-card subheading font-weight-bold">
                  {{ (item.creator || {}).name }}
                </div>
                <div class="text-card text--secondary">
                  {{ (item.creator || {}).email }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="4"
          class="justify-center align-center"
          style="display: flex"
        >
          <v-list-item>
            <user-avatar
              v-for="(member, index) in item.members.slice(0, dataFor)"
              :key="member.pk"
              :imageUrl="((member.user || {}).avatar || {}).imageUrl"
              :name="(member.user || {}).name"
              :backgroundColor="colorsListForAvatars[index]"
              :isInList="true"
              width="24px"
              class="d-block"
            />
            <v-list-item-avatar
              class="d-block"
              v-if="item.members.length > 3"
              color="primary"
              :style="{ zIndex: 3, width: '24px', minWidth: '24px' }"
            >
              <span class="white--text">{{ lengthMember }}</span>
            </v-list-item-avatar>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <div class="description-timeline pa-3">
      <span class="text--secondary" v-html="item.desc"></span>
    </div>
    <v-card-actions class="mb-1">
      <v-chip
        class="white--text mx-1 chip-timeline pb-1"
        :color="val.color"
        small
        v-for="(val, index) in item.tags"
        :key="index"
        >{{ val.name }}</v-chip
      >
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :to="{ name: 'TimelineDetail', params: { timelineId: item.pk } }"
        block
        class="primary"
        >View Detail</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import { colorsListForAvatars } from "../../config";

export default {
  props: {
    item: Object
  },
  data() {
    return {
      colorsListForAvatars,
      nameSymbol: ""
    };
  },
  computed: {
    dataFor() {
      if (this.item.members.length > 3) {
        return 2;
      } else {
        return 3;
      }
    },
    lengthMember() {
      if (this.item.members.length > 99) {
        return this.item.members.length + " + ";
      } else {
        return " +" + (this.item.members.length - 2);
      }
    }
  },
  components: {
    UserAvatar
  }
};
</script>

<style scoped>
.text-card {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.avatars-list .img-avatar:first {
  margin-left: 0px;
}
.chip-timeline {
  line-height: normal;
}
.card-notebook {
  border-top: 5px solid grey !important;
  position: relative;
}
.delete-notebook {
  position: absolute;
  right: 0;
  bottom: 7px;
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
</style>
