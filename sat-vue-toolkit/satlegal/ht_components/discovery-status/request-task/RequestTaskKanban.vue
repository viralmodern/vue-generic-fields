<template>
  <ViewKanban
    ref="requestTaskKanban"
    :tasksInStages="tasksInStatus"
    @addRequestItem="addRequestTask"
    @updateRequestItem="updateRequestTask"
    @removeRequestItem="removeRequestTask"
    @updateBlocks="updateBlocks"
  />
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ViewKanban from "../request-item/ViewKanban";
export default {
  components: {
    ViewKanban
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask", ["tasksInStatus"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    ...mapMutations("ht_store/matter/discovery/status/requestTask", ["clearData"]),
    ...mapActions("ht_store/matter/discovery/status/requestTask", [
      "getDataRequestTaskRequest",
      "addRequestTaskRequest",
      "updateRequestTaskRequest",
      "removeRequestTaskRequest"
    ]),
    addRequestTask(stage, cardTitle) {
      const data = {
        name: cardTitle,
        desc: "abc",
        deadline: "2019-08-14",
        litigation: "L100",
        activities: "A103",
        status: stage.id,
        request_set: 6,
        request: 2,
        members: [3],
        notes: [],
        comments: [],
        attachments: [],
        order: 1
      };
      if (cardTitle !== "") {
        this.addRequestTaskRequest({ name: stage.id, data });
        this.$refs.requestTaskKanban.clearData();
      }
    },
    updateRequestTask({ name, requestItemId: requestTaskId, value }) {
      const data = {
        name,
        idParams: {
          requestTaskId
        },
        body: value
      };
      this.updateRequestTaskRequest(data);
    },
    updateBlocks(drag) {
      const request_set = this.tasksInStatus[drag.fromListId - 1].tasks.find(
        x => x.pk === drag.taskId
      ).request_set;
      let data = {
        drag: {
          ...drag,
          keyNameToList: drag.toListId,
          keyNameFromList: drag.fromListId
        },
        idParams: {
          requestTaskId: drag.taskId,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          request_set
        },
        body: {
          status: drag.toListId,
          order: drag.order
        }
      };
      this.updateRequestTaskRequest(data);
    },
    removeRequestTask({ name, requestItemId: requestTaskId }) {
      const request_sets = this.tasksInStatus[name-1].tasks.find(
        x => x.pk === requestTaskId
      ).request_set;
      const data = {
        name,
        requestTaskId,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        request_sets
      };
      this.removeRequestTaskRequest(data);
    }
  },
  mounted() {
    this.clearData();
    const body = {
      matterId: this.$route.params.matter || this.$route.params.projectId,
      params: {
        group_by: "status",
        group_items: "1,2,3",
        name: "Status",
        page: 1,
        ungroup: false
      }
    };
    this.getDataRequestTaskRequest(body);
  }
};
</script>
