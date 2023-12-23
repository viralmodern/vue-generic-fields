<template>
  <v-app :dark="dark">
    <PortalToolbar></PortalToolbar>
    <v-main>
      <PortalHeader/>
      <v-container class="pa-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import PortalToolbar from "../toolbars/PortalToolbar";
import PortalHeader from "../header-wrapper/PortalHeader";
export default {
  name: "PortalLayout",
  components: {
    PortalToolbar,
    PortalHeader
  },
  computed: {
    ...mapGetters("ht_store/layout", ["dark"])
  }
};
</script>

<style scoped>
</style>
