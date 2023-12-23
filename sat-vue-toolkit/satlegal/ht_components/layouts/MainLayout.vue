<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      fixed
      :value="rightType === 'mention'"
      right
      clipped
      app
    >
      <Mentions />
    </v-navigation-drawer>
    <v-navigation-drawer
      fixed
      :value="rightType === 'newsFeed'"
      right
      clipped
      app
    >
      <NewsFeed />
    </v-navigation-drawer>
    <v-navigation-drawer
      fixed
      :value="rightType === 'matterHearing'"
      right
      clipped
      app
    >
      <MatterHearing />
    </v-navigation-drawer>

    <DialogSelectTheTest
      :isDialog="isDialog"
      @closeDialog="isDialog = false"
      @isTracking="isTracking"
    />
    <v-app-bar color="primary" dark fixed app clipped-right>
      <v-app-bar-nav-icon
        @click.stop="changeLeftMenu(!leftMenu)"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
        My Byzantine project name
        <v-btn
          v-if="$route.params.matter || $route.params.projectId"
          icon
          @click="isShowBriefcase = true"
          class="ml-1"
        >
          <v-icon>card_travel</v-icon>
        </v-btn>
      </v-toolbar-title>
      <!-- <Briefcase :isShow="isShowBriefcase" @closeDialogBriefcase="isShowBriefcase = false"/> -->
      <v-spacer></v-spacer>
      <v-row no-gutters>
        <v-col class="text-md-right">
          <TimeTracking
            @emitStartTimer="receiveStartTimer"
            @snackbar="receiveSnackbar"
            @hideTimeTrack="receiveHideTimeTrack"
            :showTimeTrack="showTimeTrack"
          />
        </v-col>
      </v-row>
      <v-toolbar-items>
        <v-row no-gutters class="align-center">
          <v-btn to="/category" icon>
            <v-icon medium>category</v-icon>
          </v-btn>
          <v-btn v-if="!showTimeTrack" @click="timerTrack" icon>
            <v-icon medium>timer</v-icon>
          </v-btn>
          <v-btn @click="openRight('matterHearing')" icon>
            <v-icon medium>gavel</v-icon>
          </v-btn>
          <v-btn @click="openRight('newsFeed')" icon>
            <v-icon medium>flash_on</v-icon>
          </v-btn>
          <v-btn @click="openRight('mention')" icon>
            <v-icon medium>alternate_email</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon medium>fiber_new</v-icon>
          </v-btn>
          <v-switch
            class="pt-0"
            hide-details
            :inputValue="dark"
            @change="switchTheme"
          ></v-switch>
        </v-row>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer fixed app :value="leftMenu" @input="changeLeftMenu">
      <LeftMenu />
    </v-navigation-drawer>
    <v-content>
      <div class="pa-0" fluid fill-height>
        <slot />
      </div>
    </v-content>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :right="true"
      :bottom="true"
      >{{ message }}</v-snackbar
    >
    <v-snackbar
      v-model="snackbarStatus"
      :timeout="5000"
      :right="true"
      :bottom="true"
    >
      <div v-for="(m, index) in messages" :key="index">{{ m }}</div>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import LeftMenu from "./LeftMenu";
import Mentions from "./Mentions";
import NewsFeed from "./NewsFeed";
import DialogSelectTheTest from "./DialogSelectTheTest";
import TimeTracking from "./TimeTracking";
import MatterHearing from "../right-menus/MatterHearing";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    LeftMenu,
    Mentions,
    NewsFeed,
    DialogSelectTheTest,
    TimeTracking,
    MatterHearing,
  },
  data: () => ({
    right: null,
    isDialog: false,
    showTimeTrack: false,
    message: "",
    snackbar: false,
    startTimer: null,
    isShowBriefcase: false
  }),
  mounted() {
    // this.$store.dispatch("ht_store/user/getCurrentUser");
    this.getDataMemberRequest();
  },
  computed: {
    ...mapGetters("ht_store/layout", [
      "dark",
      "leftMenu",
      "rightType",
      "isToolbarProjectType",
      "isToolbarNotebookType",
      "isToolbarHomeType",
      "isShowingProjectHeader",
      "isToolbarSettingType"
    ]),
    ...mapGetters("ht_store/project", ["projectDetail"]),
    ...mapGetters("ht_store/notebookDetail", ["notebookName"]),
    ...mapGetters("ht_store/snackbar", ["messages"]),
    needEditButton() {
      return (
        ["byzantine", "filing"].indexOf(
          this.projectDetail && this.projectDetail.type
        ) >= 0
      );
    },
    snackbarStatus: {
      get: function() {
        return this.messages && this.messages.length;
      },
      set: function(v) {
        if (!v) {
          this.setMessages([]);
        }
      }
    }
  },
  methods: {
    receiveStartTimer(click) {
      this.startTimer = click;
    },
    ...mapMutations("ht_store/layout", [
      "switchTheme",
      "changeLeftMenu",
      "openRight",
      "showProjectHeader",
      "hideProjectHeader"
    ]),
    ...mapMutations("ht_store/snackbar", ["setMessages"]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    timerTrack() {
      this.isDialog = true;
    },
    isTracking(val) {
      this.showTimeTrack = val;
      this.startTimer();
    },
    receiveHideTimeTrack(hideTimeTrack) {
      this.showTimeTrack = hideTimeTrack;
    },
    receiveSnackbar(snackbar, message) {
      this.snackbar = snackbar;
      this.message = message;
    }
  }
};
</script>

<style scoped></style>
