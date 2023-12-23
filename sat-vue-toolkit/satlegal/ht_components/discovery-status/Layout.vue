<template>
  <v-row class="white" fill-height no-gutters>
    <v-col cols="12">
      <Header />
    </v-col>
    <v-row fill-height no-gutters class="pt-2" style="width: 100vh;">
      <v-col cols="12">
        <RequestSetSlickGrid v-if="type === 1" />
        <StatusSlickgrid v-else-if="type === 2" />
        <RequestStatus v-else-if="type === 3" />
        <ResponseStatus v-else-if="type === 4" />
        <Priority v-else-if="type === 5" />
        <!-- <TableRequestTask v-else-if="type === 6" /> -->
        <RequestSetTaskGrid v-else-if="type === 6" />
        <RequestTaskKanban v-else-if="type === 7" />
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import Header from "./Header";
import RequestSetSlickGrid from "../../views/CAF/Status/RequestSetSlickGrid";
import StatusSlickgrid from "./request-item/StatusSlickgrid";
// import TableRequestTask from "../discovery-status/request-task/TableRequestTask";
import RequestTaskKanban from "./request-task/RequestTaskKanban";
import RequestStatus from "./request-item/RequestStatus";
import ResponseStatus from "./request-item/ResponseStatus";
import Priority from "./request-item/Priority";
import RequestSetTaskGrid from "../../views/CAF/Status/RequestSetTaskGrid";
export default {
  components: {
    Header,
    RequestSetSlickGrid,
    StatusSlickgrid,
    RequestTaskKanban,
    RequestStatus,
    ResponseStatus,
    Priority,
    RequestSetTaskGrid,
  },
  props: {
    type: Number
  },
  methods: {
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getDataMembersRequest({ matterId });
  }
};
</script>
