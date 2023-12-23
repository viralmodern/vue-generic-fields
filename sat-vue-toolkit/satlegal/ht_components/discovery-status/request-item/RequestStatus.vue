<template>
  <ViewKanban
    ref="requestItemKanban"
    :tasksInStages="tasksInRequestStatus"
    @addRequestItem="addRequestItem"
    @updateRequestItem="updateRequestItem"
    @removeRequestItem="removeRequestItem"
    @updateBlocks="updateBlocks"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ViewKanban from "./ViewKanban";
export default {
  components: {
    ViewKanban
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestItem", [
      "tasksInRequestStatus"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestItem", [
      "getDataRequestItemRequest",
      "addRequestItemRequest",
      "updateRequestItemRequest",
      "removeRequestItemRequest"
    ]),
    addRequestItem(stage, cardTitle) {
      const data = {
        deadline: null,
        dispute: false,
        members: [],
        name: cardTitle,
        objection: "",
        priority: 1,
        request_status: stage.id,
        request_type: 1,
        response: "",
        response_content: 1,
        response_status: 1,
        under_oath: false,
        order: 1
      };
      if (cardTitle !== "") {
        this.addRequestItemRequest({ name: stage.id, data });
        this.$refs.requestItemKanban.clearData();
      }
    },
    updateRequestItem({ name, requestItemId, value }) {
      const data = {
        name,
        idParams: {
          requestItemId
        },
        body: value
      };
      this.updateRequestItemRequest(data);
    },
    updateBlocks(drag) {
      let data = {
        drag,
        idParams: {
          requestItemId: drag.taskId
        },
        body: {
          request_status: drag.toListId,
          order: drag.order
        }
      };
      this.updateRequestItemRequest(data);
    },
    removeRequestItem({ name, requestItemId }) {
      const data = {
        name,
        requestItemId
      };
      this.removeRequestItemRequest(data);
    }
  },
  mounted() {
    const data = {
      stage: {
        field: "request_status",
        name: "Request Status"
      },
      searchObject: {
        group_by : "request_status",
        group_items: this.appConfigs.requestStatus.map(x => x.value),
        page: 1
      }
    }
    this.getDataRequestItemRequest(data);
  }
};
</script>
