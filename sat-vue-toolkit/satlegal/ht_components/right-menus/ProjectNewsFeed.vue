<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row no-gutters class="align-center">
        <v-col cols="2">
          <v-btn icon @click="openRight('project-general-news-feed')">
            <v-icon>mdi-arrow_forward_ios</v-icon>
          </v-btn>
        </v-col>
        <v-col class="mr-1">
          <v-icon>mdi-person</v-icon>
          <span>Member</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ma-1 justify-center">
          <user-avatar
            :avatarSize="43"
            class="ma-1"
            v-for="member in dataProjectMembers.slice(0, checkHasMore)"
            :imageUrl="member.imageUrl"
            :name="member.name"
            :isInList="false"
            :key="member.id"
          />
          <v-avatar
            size="43px"
            color="primary"
            v-if="dataProjectMembers.length > checkHasMore"
          >
            <span class="white--text text-h5">{{ nameSymbol }}</span>
          </v-avatar>
        </v-col>
      </v-row>

      <IntiveMembers />
      <v-divider></v-divider>
      <v-row no-gutters class="align-center mt-2">
        <v-col cols="2">
          <v-icon class="ml-3">mdi-style</v-icon>
        </v-col>
        <v-col class="mr-1">
          <span>Labels</span>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-1">
        <ProjectTags :items="dataLabelProject" />
      </v-row>
      <CreateThemeColor
        labelColor="Label name"
        btnAdd="Add Label"
        labelTitle="Add label"
        @snackbar="receiveSnackbar"
      />
      <v-divider></v-divider>
      <v-row no-gutters class="align-center mt-2">
        <v-col cols="2">
          <v-icon class="ml-3">mdi-message</v-icon>
        </v-col>
        <v-col class="mr-1">
          <span>Activities</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <UserActivity
      v-for="(item, index) in projectNewsFeeds"
      :key="index"
      :action="item.action"
      :executor="item.executor"
      :executedDate="item.executedDate"
      :destinationObject="item.destinationObject"
    />
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import UserActivity from "../cards/UserActivity";
import UserAvatar from "../avatars/UserAvatar";
import IntiveMembers from "../dialogs/IntiveMembers";
import CreateThemeColor from "../dialogs/CreateThemeColor";
import ProjectTags from "../chips/ProjectTag";

export default {
  components: {
    UserActivity,
    UserAvatar,
    IntiveMembers,
    CreateThemeColor,
    ProjectTags
  },
  props: {
    projectId: [String, Number]
  },
  computed: {
    ...mapGetters("ht_store/newsFeed", ["projectNewsFeeds"]),
    ...mapGetters("ht_store/project", ["dataProjectMembers", "dataLabelProject"]),
    checkHasMore() {
      return this.dataProjectMembers.length === 10 ? 10 : 9;
    },
    nameSymbol: function() {
      let countRest = this.dataProjectMembers.length - this.checkHasMore;
      if (countRest < 99) {
        return "+" + countRest;
      }
      return 99 + "+";
    }
  },
  mounted() {
    this.getProjectNewsFeeds(this.projectId);
    this.getProjectMembers();
    this.getLabelsByProjectRequest();
  },
  methods: {
    receiveSnackbar(snackbar, messageSnackbar) {
      this.$emit("snackbar", snackbar, messageSnackbar);
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapActions("ht_store/newsFeed", ["getProjectNewsFeeds"]),
    ...mapActions("ht_store/project", ["getProjectMembers", "getLabelsByProjectRequest"])
  }
};
</script>
