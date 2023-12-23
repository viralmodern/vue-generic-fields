<template>
  <ViewKanban
    ref="requestItemKanban"
    :tasksInStages="tasksInPriority"
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
    ...mapGetters("ht_store/matter/discovery/status/requestItem", ["tasksInPriority"]),
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
        name: cardTitle,
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
          priority: drag.toListId,
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
        field: "priority",
        name: "Priority"
      },
      searchObject: {
        group_by : "priority",
        group_items: this.appConfigs.listPriority.map(x => x.value),
        page: 1
      }
    }
    this.getDataRequestItemRequest(data);
  }
};
</script>
