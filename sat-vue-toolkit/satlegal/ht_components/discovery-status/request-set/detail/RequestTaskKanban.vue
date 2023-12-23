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
import { mapActions, mapGetters, mapMutations } from "vuex";
import ViewKanban from "../../request-item/ViewKanban";
export default {
  components: {
    ViewKanban
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask", [
      "tasksInStatus"
    ]),
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
      let data = {
        drag,
        idParams: {
          requestTaskId: drag.taskId
        },
        body: {
          status: drag.toListId,
          order: drag.order
        }
      };
      this.updateRequestTaskRequest(data);
    },
    removeRequestTask({ name, requestItemId: requestTaskId }) {
      const data = {
        name,
        requestTaskId
      };
      this.removeRequestTaskRequest(data);
    }
  },
  mounted() {
    this.clearData();
    const data = {
      stage: {
        field: "status",
        name: "Status"
      },
      searchObject: {
        status: this.appConfigs.taskStatus.map(x => x.value),
        page: 1
      }
    }
    this.getDataRequestTaskRequest(data);
  }
};
</script>
