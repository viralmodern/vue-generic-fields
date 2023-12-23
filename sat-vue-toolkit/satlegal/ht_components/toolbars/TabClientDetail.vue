<template>
  <div style="width: 100%">
    <v-app-bar height="50">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in itemsMenu"
          :key="item.id"
          small
          class="text-capitalize"
          :to="{ name: item.link }"
          >{{ item.name }}</v-btn
        >
        <v-btn
          @click="openRight('rightMenuCommon')"
          icon
          class="text-capitalize v-btn-activities"
          small
        >
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
        <v-spacer />
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      fixed
      :value="rightType === 'rightMenuCommon'"
      right
      clipped
      app
    >
      <RightMenuCommon>
        <template slot="rightmenu">
          <ActivitiesOverView />
        </template>
      </RightMenuCommon>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import RightMenuCommon from "../right-menus/RightMenuCommon";
import ActivitiesOverView from "../client-detail/ActivitiesOverView";

export default {
  components: {
    RightMenuCommon,
    ActivitiesOverView
  },
  data() {
    return {
      itemsMenu: [
        { id: 1, name: "Overview", link: "OverViewClient" },
        { id: 2, name: "Matter", link: "MatterClient" },
        { id: 3, name: "Time", link: "TimeClient" },
        { id: 4, name: "Billing", link: "BillingClient" },
        { id: 5, name: "Meeting", link: "MeetingClient" },
        { id: 6, name: "Note", link: "NoteClient" }
      ]
    };
  },
  computed: {
    clientId() {
      return this.$route.params.id;
    },
    ...mapGetters("ht_store/layout", ["rightType"])
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"])
  }
};
</script>
<style scoped>
.v-btn-activities {
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
