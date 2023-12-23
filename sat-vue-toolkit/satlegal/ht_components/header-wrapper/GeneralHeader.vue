<template>
  <v-app-bar height="50">
    <v-toolbar-items
      v-for="item in itemTotalbar"
      :key="item.id"
      class="hidden-sm-and-down"
    >
      <v-btn
        small
        :to="`/project/${projectId}/${item.link}`"
        class="text-capitalize"
        >{{ item.name }}</v-btn
      >
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-create</v-icon>
    </v-btn>
    <v-btn rounded small>360View</v-btn>
    <ListThemeColor
      @snackbar="snackbar"
      @emitBackgroundColor="emitBackgroundColor"
    />
    <v-btn icon @click="openRight">
      <v-icon>mdi-rss_feed</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import ListThemeColor from "./ListThemeColor";

export default {
  components: {
    ListThemeColor
  },
  data() {
    return {
      itemTotalbar: [
        { id: 1, name: "Overview", link: "overview" },
        { id: 2, name: "Taskboard", link: "taskboard" },
        { id: 3, name: "Discussion", link: "discussion" },
        { id: 4, name: "Meeting", link: "meeting" },
        { id: 5, name: "Dataroom", link: "dataroom" },
        { id: 6, name: "Ticket", link: "ticket" },
        { id: 7, name: "Wiki", link: "wiki" },
        { id: 8, name: "Journals", link: "journals" },
        { id: 9, name: "Contacts", link: "contacts" }
      ]
    };
  },
  methods: {
    emitBackgroundColor(color) {
      this.color = color.backgroundColor;
    },
    snackbar(snackbar, messageSnackbar) {
      this.snackbar = snackbar;
      this.messageSnackbar = messageSnackbar;
      this.$emit("snackbar", snackbar, messageSnackbar);
    },
    openRight() {
      this.$emit("toggleRight");
    }
  },
  computed: {
    projectId() {
      return this.$route.params.matter || this.$route.params.projectId;
    }
  }
};
</script>
