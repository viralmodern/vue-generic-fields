<template>
  <v-row fill-height no-gutters>
    <div class="left-resource">
      <ResearchTimeline :tags="tag" @openModal="isShowModelCreate = true" />
    </div>
    <v-col class="pl-2 ml-1">
      <v-row no-gutters class="list-timeline">
        <v-col cols="12" sm="12" v-for="item in dataTimeline" :key="item.id">
          <ItemTimeline :item="item" />
        </v-col>
      </v-row>
      <v-col class="text-xs-center" v-if="showShowMore">
        <v-btn color="primary" @click="showMore">
          <v-progress-circular
            v-if="isShowLoading"
            indeterminate
            color="white"
          ></v-progress-circular>
          <span v-else>LOAD MORE</span>
        </v-btn>
      </v-col>
    </v-col>
    <FormCreateTimeline
      :isShowPopup="isShowModelCreate"
      @closeModal="isShowModelCreate = false"
      @addTimeline="addTimeline"
      :tags="tag"
    />
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ResearchTimeline from "../../ht_components/left-menus/ResearchTimeline";
import ItemTimeline from "../../ht_components/cards/ItemTimeline";
import FormCreateTimeline from "../../ht_components/dialogs/FormCreateTimeline";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  data() {
    return {
      isShowModelCreate: false,
      page: 1,
      isShowLoading: false
    };
  },
  components: {
    ResearchTimeline,
    ItemTimeline,
    FormCreateTimeline
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline", [
      "getDataResearchTimelineRequest"
    ]),
    ...mapActions("ht_store/project/research/timeline", ["addNewTimeline"]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    addTimeline(data) {
      this.addNewTimeline(data);
      this.isShowModelCreate = false;
    },
    showMore() {
      this.page += 1;
      this.isShowLoading = true;
      this.getDataResearchTimelineRequest({
        page: this.page,
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isShowLoading = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline", [
      "dataTimeline",
      "showShowMore"
    ]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  },
  mounted() {
    this.getDataResearchTimelineRequest({
      page: 1,
      matterId: this.$route.params.matter || this.$route.params.projectId
    });
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "tag"
    });
    this.getDataMemberRequest();
  }
};
</script>
<style scoped>
.left-timeline {
  width: 300px;
}
.list-timeline {
  background-color: white;
}
.left-resource {
  width: 250px;
}
</style>
