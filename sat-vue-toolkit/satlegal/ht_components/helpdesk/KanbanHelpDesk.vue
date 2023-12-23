<template>
  <ViewKanban
    ref="helpDeskKanban"
    :tasksInStages="dataGroup"
    @addRequestItem="add"
    @updateRequestItem="update"
    @removeRequestItem="remove"
    @updateBlocks="updateBlocks"
  />
</template>
<script>
import { mapActions } from "vuex";
import ViewKanban from "../discovery-status/request-item/ViewKanban";
export default {
  props: {
    dataGroup: Array,
    keyGroup: [Number, Boolean, String]
  },
  components: {
    ViewKanban
  },
  methods: {
    ...mapActions("ht_store/matter/helpDesk/view", [
      "updateTickets",
      "createTickets",
      "removeTickets"
    ]),
    add(stage, cardTitle) {
      const { keyGroup } = this;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        name: cardTitle,
        ticket_id: null,
        category: keyGroup === 3 ? stage.id : 1,
        status: keyGroup === 2 ? stage.id : 1,
        priority: keyGroup === 4 ? stage.id : 1,
        urgency: keyGroup === 5 ? stage.id : 1,
        client_name: "",
        order: 10,
        total_attachments: 2,
        keyName: "all_tickets"
      };
      if (cardTitle !== "") {
        this.createTickets(data);
        this.$refs.helpDeskKanban.clearData();
      }
    },
    update({ name, requestItemId, value }) {
      const dataRequest = {
        name,
        newValue: value.name,
        columnName: "name",
        rowId: requestItemId,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        bodyRequest: {
          name: value.name
        }
      };
      this.updateTickets(dataRequest);
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
      return data;
    },
    remove({ name, requestItemId }) {
      this.removeTickets({
        group: name,
        id: requestItemId,
        keyName: "all_tickets"
      });
    }
  }
};
</script>
