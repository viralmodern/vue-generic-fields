<template>
  <div>
    <HeaderDescription :isOpen="isOpenDescription"/>
    <ProjectDetailToolbar :itemsMenu="itemsMenu"/>
  </div>
</template>
<script>
import ProjectDetailToolbar from "../toolbars/ProjectDetailToolbar";
import HeaderDescription from "./HeaderDescription";

export default {
  components: {
    ProjectDetailToolbar,
    HeaderDescription
  },
  props: {
    projectDetail: String,
    isOpenDescription: Boolean
  },
  data() {
    return {
      itemsMenu: [
        {
          id: 1,
          name: "Overview",
          subMenu: [
            { name: "General", link: "general", icon: "view_quilt" },
            { name: "Discussion", link: "discussion", icon: "recent_actors" },
            { name: "Notebook", link: "notebook", icon: "book" },
            { name: "Time Entries", link: "time-entries", icon: "timer" },
            { name: "Permission", link: "permission", icon: "offline_pin" }
          ]
        },
        {
          id: 2,
          name: "Filling Room",
          link: "filing-room"
        },
        {
          id: 3,
          name: "Exhibits",
          link: "exhibits"
        },
        {
          id: 4,
          name: "Discovery",
          subMenu: [
            {
              name: "Documents",
              link: "documents",
              icon: "featured_play_list"
            },
            { name: "Spreadheet", link: "spreadheet", icon: "list_alt" },
            {
              name: "Transactions",
              link: "transactions",
              icon: "account_balance"
            }
          ]
        },
        { id: 5, name: "Signatures", link: "signatures" },
        { id: 6, name: "Taskboard", link: "taskboard" },
        { id: 7, name: "contacts", link: "contacts" }
      ]
    };
  }
};
</script>
