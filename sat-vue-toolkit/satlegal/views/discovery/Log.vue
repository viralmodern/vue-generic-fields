<template>
  <v-col cols="12">
    <v-col class="pl-2">
      <v-row no-gutters class="justify-end">
        <FilterDiscoveryLog @filterLog="filterLog" />
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="4" v-for="item in logs" :key="item.id">
          <CardDiscoveryLog :item="item" />
        </v-col>
      </v-row>
      <v-col class="text-xs-center" v-if="logs.length > 8">
        <v-btn color="primary" @click="showMore" v-if="showShowMore">
          <v-progress-circular v-if="isShowLoading" indeterminate color="white"></v-progress-circular>
          <span v-else>LOAD MORE</span>
        </v-btn>
      </v-col>
      <v-btn class="addLog" fab dark color="primary" @click="isShowModelCreate = true">
        <v-icon dark>mdi-add</v-icon>
      </v-btn>
    </v-col>
    <FormCreateLog
      :isShowPopup="isShowModelCreate"
      @closeModal="isShowModelCreate = false"
      @addLog="addLog"
    />
  </v-col>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import CardDiscoveryLog from "../../ht_components/cards/CardDiscoveryLog";
import FormCreateLog from "../../ht_components/dialogs/FormCreateLog";
import FilterDiscoveryLog from "../../ht_components/filter/FilterDiscoveryLog";

export default {
  data() {
    return {
      isShowModelCreate: false,
      page: 1,
      isShowLoading: false
    };
  },
  components: {
    CardDiscoveryLog,
    FormCreateLog,
    FilterDiscoveryLog
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/log", [
      "getDataDiscoveryLogRequest",
      "getDataLogFilterRequest",
      "addDataDiscoveryLogRequest"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/workspace/logType", ["getLogTypeRequest"]),
    ...mapMutations("ht_store/matter/discovery/log", ["addNewLog"]),
    addLog(data) {
      this.addDataDiscoveryLogRequest({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        ...data
      });
      this.isShowModelCreate = false;
    },
    async showMore() {
      this.page += 1;
      this.isShowLoading = true;
      await this.getDataDiscoveryLogRequest({
        page: this.page,
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isShowLoading = false;
    },
    filterLog(data) {
      this.getDataLogFilterRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log", ["logs", "showShowMore"]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  },
  mounted() {
    this.getDataDiscoveryLogRequest({
      page: 1,
      matterId: this.$route.params.matter || this.$route.params.projectId
    });
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "tag"
    });
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getLogTypeRequest();
  }
};
</script>
<style scoped>
.left-resource {
  width: 230px;
}
.addLog {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
