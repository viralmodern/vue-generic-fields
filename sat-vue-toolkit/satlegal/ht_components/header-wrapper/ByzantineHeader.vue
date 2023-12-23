<template>
  <!-- <div class="row no-gutters"> -->
  <v-row no-gutters>
    <!-- <HeaderDescription :isOpen="isOpenDescription" /> -->
    <ProjectDetailToolbar :itemsMenu="itemsMenu" />
    <v-navigation-drawer fixed :value="rightType==='project-general-news-feed'" right clipped app>
      <NewsFeed :projectId="$route.params.matter || $route.params.projectId" />
    </v-navigation-drawer>
  </v-row>
  <!-- </div> -->
</template>
<script>
import { mapGetters } from "vuex";
import ProjectDetailToolbar from "../toolbars/ProjectDetailToolbar";
// import HeaderDescription from "./HeaderDescription";
import NewsFeed from "../right-menus/ProjectNewsFeed";

export default {
  components: {
    ProjectDetailToolbar,
    // HeaderDescription,
    NewsFeed
  },
  props: {
    isOpenDescription: Boolean
  },
  data() {
    return {
      itemsMenu: [
        {
          id: 1,
          name: "Overview",
          link: "overview"
        },
        {
          id: 11,
          name: "Service",
          link: "service"
        },
        {
          id: 9,
          name: "Patient Profile",
          link: "patient"
        },
        {
          id: 10,
          name: "Med War",
          link: "med-war"
        },

        {
          id: 2,
          name: "Research",
          subMenu: [
            { name: "Summary", icon: "toc", link: "summary" },
            { name: "Facts", icon: "track_changes", link: "facts" },
            { name: "Character", icon: "memory", link: "character" },
            { name: "Time Line", icon: "timeline", link: "timeline" }
          ]
        },
        {
          id: 13,
          name: "Plaintiff",
          link: "plaintiff"
        },
        {
          id: 14,
          name: "Helpdesk",
          subMenu: [
            { name: "Helpdesk View", icon: "graphic_eq", link: "helpdesk" }
          ]
        },
        { id: 8, name: "Desk", link: "taskboard" },
        {
          id: 17,
          name: "References",
          link: "references"
        },
        { id: 4, name: "Citations", link: "citations" },
        {
          id: 6,
          name: "Discovery",
          subMenu: [
            { name: "Summary", icon: "graphic_eq", link: "discovery-summary" },
            {
              name: "Evidences",
              icon: "equalizer",
              link: "discovery-evidences"
            },
            { name: "Log", icon: "polymer", link: "discovery-log" },
            { name: "Index", icon: "wifi_tethering", link: "discovery-index" },
            { name: "ToolBox", icon: "local_offer", link: "discovery-toolBox" },
            {
              name: "Documents",
              icon: "library_books",
              link: "document-requests"
            },
            {
              name: "Status Old",
              icon: "chrome_reader_mode",
              link: "discovery-status"
            },
            {
              name: "Status New",
              icon: "chrome_reader_mode",
              link: "status"
            },
            {
              name: "Deposition",
              icon: "card_travel",
              link: "discovery-deposition"
            }
          ]
        },
        {
          id: 7,
          name: "Testimony",
          link: "testimony-list",
          subMenu: [
            {
              name: "Testimony List",
              icon: "mdi-view-list",
              link: "testimony-list"
            },
            {
              name: "Testimony Witness List",
              icon: "mdi-account-multiple",
              link: "testimony-witness"
            },
            {
              name: "Testimony Witness Reliability List",
              icon: "mdi-message",
              link: "testimony-witness-reliability"
            },
             {
              name: "Testimony Witness Sustainability List",
              icon: "mdi-briefcase",
              link: "testimony-witness-sustainability"
            }
          ]
        }
        // { id: 7, name: "strategies", link: "strategies" },
        // {
        //   id: 12,
        //   name: "Digital Howey Checklist",
        //   link: "digital-howey-checklist"
        // }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"])
  }
};
</script>
