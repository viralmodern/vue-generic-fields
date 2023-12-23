<template>
  <v-row fill-height no-gutters>
    <div class="left-resource">
      <TimelineDetailLeftMenu @openModal="isShowModelCreate = true" />
    </div>
    <v-col cols="12" sm="9" md="10" class="pl-2 ml-1">
      <v-row no-gutters class="list-timeline pa-2">
        <HeaderTimelineDetail
          :item="dataTimeLineDetail"
          @updateMembers="updateMembers"
        />
        <ActivityTimeline />
      </v-row>
    </v-col>
    <CreateActivity
      :isShow="isShowModelCreate"
      @closeModal="isShowModelCreate = false"
      @addActivity="addActivity"
    />
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TimelineDetailLeftMenu from "../../../ht_components/left-menus/TimelineDetailLeftMenu";
import HeaderTimelineDetail from "../../../ht_components/cards/HeaderTimelineDetail";
import ActivityTimeline from "../../../ht_components/list/ActivityTimeline";
import CreateActivity from "../../../ht_components/dialogs/CreateActivity";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  data() {
    return {
      isShowModelCreate: false
    };
  },
  components: {
    TimelineDetailLeftMenu,
    HeaderTimelineDetail,
    ActivityTimeline,
    CreateActivity
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline", [
      "getDetailTimeLine",
      "updateMembers"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "getDataActivitiesRequest",
      "addActivityTimelineRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    addActivity(data) {
      this.addActivityTimelineRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline", ["dataTimeLineDetail"])
  },
  mounted() {
    const { projectId, timelineId } = this.$route.params;
    this.getDetailTimeLine({ matterId: projectId, timelineId });
    this.getDataTagsRequest({
      matterId: projectId,
      type: "tag"
    });
    this.getDataCharacterRequest();
    this.getDataActivitiesRequest({ matterId: projectId, timelineId });
    this.getDataMembersRequest({ matterId: projectId });
  }
};
</script>
<style scoped>
.list-timeline {
  background-color: white;
}
</style>
