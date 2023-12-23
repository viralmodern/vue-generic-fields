<template>
  <div class="name-card">
    <v-card :color="color" ref="card" :dark="dark" :img="cardBgImage">
      <v-card-media v-if="showTopNav">
        <v-row no-gutters class="ma-0 justify-space-between">
          <v-col cols="2">
            <v-icon color="pink">mdi-favorite</v-icon>
          </v-col>
          <v-col cols="2" class="text-sm-right">
            <v-icon>mdi-more_vert</v-icon>
          </v-col>
        </v-row>
      </v-card-media>
      <v-card-text>
        <div class="layout ma-0 align-center" :class="computeCardLayout">
          <UserAvatar
            :avatarSize="computeAvatarSize"
            :imageUrl="imageUrl"
            :name="name"
          />
          <div class="flex" :class="computeTextAlgin">
            <div class="subheading">{{ name }}</div>
            <span class="caption">{{ jobTitle }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-bottom-nav
      :value="true"
      color="transparent"
      :height="64"
      v-if="showBottomNav"
    >
      <v-btn color="teal" value="recent">
        <span>Recent</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn color="teal" value="favorites">
        <span>Favorites</span>
        <v-icon>mdi-favorite</v-icon>
      </v-btn>
      <v-btn color="teal" value="nearby">
        <span>Nearby</span>
        <v-icon>mdi-place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: null
    },
    jobTitle: {
      type: String,
      default: ""
    },
    cardBgImage: {
      type: String
    },
    color: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: false
    },
    bottomNav: {
      type: Boolean,
      default: false
    },
    topNav: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),

  computed: {
    computeCardLayout() {
      return this.mini ? "row" : "column";
    },
    computeTextAlgin() {
      return this.mini ? " ml-2 text-sm-left" : "text-sm-center";
    },
    computeAvatarSize() {
      return this.mini ? 32 : 64;
    },
    imageUrl() {
      return this.avatar !== null ? this.avatar.imageUrl : null;
    },
    showBottomNav() {
      return this.mini === false && this.bottomNav;
    },
    showTopNav() {
      return this.mini === false && this.topNav;
    }
  },
  methods: {}
};
</script>
