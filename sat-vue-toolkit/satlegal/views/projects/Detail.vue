<template>
  <v-row no-gutters>
    <v-col>
      <div>
        <v-progress-linear v-if="loadingProjectDetail" :indeterminate="true" height="2"></v-progress-linear>
        <ByzantineHeader v-else :isOpenDescription="isShowingProjectHeader" />
        <router-view></router-view>
      </div>
    </v-col>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :right="true"
      :bottom="true"
    >{{ messageSnackbar }}</v-snackbar>
  </v-row>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ByzantineHeader from "../../ht_components/header-wrapper/ByzantineHeader";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ByzantineHeader
  },
  data() {
    return {
      snackbar: false,
      messageSnackbar: ""
    };
  },
  mounted() {
    this.loadProjectDetail();
    this.$store.dispatch("ht_store/project/getDataBackgroundColor");
  },
  methods: {
    loadProjectDetail() {
      const idProject = this.$route.params.matter || this.$route.params.projectId;
      this.getProjectDetailRequest(idProject);
    },
    toogleGeneralNewsFeedMenu() {
      this.openRight("project-general-news-feed");
    },
    receiveEmitBackgroundColor(color) {
      this.color = color.backgroundColor;
    },
    receiveSnackbar(snackbar, messageSnackbar) {
      this.snackbar = snackbar;
      this.messageSnackbar = messageSnackbar;
    },
    ...mapActions("ht_store/project", ["getProjectDetailRequest"]),
    ...mapMutations("ht_store/layout", ["openRight"])
  },
  computed: {
    ...mapGetters("ht_store/project", [
      "themeColor",
      "projectDetail",
      "loadingProjectDetail"
    ]),
    ...mapGetters("ht_store/layout", ["rightType", "isShowingProjectHeader"]),
    projectDetailType() {
      return this.projectDetail && this.projectDetail.type;
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.projectId !== from.params.projectId) {
        this.loadProjectDetail();
      }
    }
  }
};
</script>
