<template>
  <v-card class="pa-1 ma-1">
    <v-card-text class="pb-1">
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-row no-gutters class="ma-0">
            <v-col cols="3">
              <UserAvatar
                :imageUrl="(creator.avatar || {}).imageUrl"
                :avatarSize="40"
                :name="creator.name || ''"
              />
            </v-col>
            <v-col cols="8">
              <div class="pl-2">
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
          <v-list-item class="grow avatars-list pl-2">
            <user-avatar
              v-for="(member, index) in listMember.slice(0, dataFor)"
              :key="member.id"
              :imageUrl="member.avatar.imageUrl"
              :name="member.name"
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
    <div class="my-2">
      <span class="subheading font-weight-bold pa-3">{{ item.name }}</span>
    </div>
    <div class="description-timeline px-3">
      <span class="text--secondary" v-html="item.description"></span>
    </div>
    <v-card-actions class="mb-1">
      <v-chip
        class="white--text mx-1 chip-timeline pb-1"
        :color="getType.color"
        small
        >{{ getType.name }}</v-chip
      >
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        block
        class="primary"
        :to="{ name: 'discovery-log-detail', params: { logId: item.id } }"
        >View Detail</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import { colorsListForAvatars } from "../../config";
import { mapGetters } from "vuex";
import moment from "moment";
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
      if (this.item.members.length > 99) {
        return this.item.members.length + " + ";
      } else {
        return " +" + (this.item.members.length - 2);
      }
    },
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/logType", ["types"]),
    creator() {
      return this.members.find(x => x.id === this.item.creator) || {};
    },
    listMember() {
      return this.members.filter(x => {
        return this.item.members.includes(x.id);
      });
    },
    getType() {
      return this.types.find(x => x.id === this.item.type) || {};
    }
  },
  components: {
    UserAvatar
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
