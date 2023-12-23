<template>
  <div>
    <v-app-bar height="50">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in itemsMenu"
          :key="item.id"
          small
          class="text-capitalize"
          :to="`/project/${projectId}/character/${characterId}/${item.link}`"
          >{{ item.name }}</v-btn
        >
      </v-toolbar-items>
      <v-spacer />
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      itemsMenu: [
        {
          id: 1,
          name: "About",
          link: "about"
        },
        { id: 2, name: "Activity", link: "activity" },
        { id: 3, name: "Linked Records", link: "linked-records" },
        { id: 4, name: "Mapping", link: "mapping" },
        { id: 5, name: "Credibility", link: "credibility" },
        { id: 6, name: "Goals", link: "goals" },
        { id: 7, name: "Notes", link: "notes" },
        { id: 8, name: "Documents", link: "documents" }
      ]
    };
  },
  computed: {
    projectId() {
      return this.$route.params.matter || this.$route.params.projectId;
    },
    characterId() {
      return this.$route.params.characterId;
    },
    ...mapGetters("ht_store/layout", ["rightType"])
  }
};
</script>
