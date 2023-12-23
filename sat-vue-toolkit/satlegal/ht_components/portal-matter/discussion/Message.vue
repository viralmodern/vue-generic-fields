<template>
  <div class="mt-2">
    <SlickTable :items="messages" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updatePortalMessageRequest($event)"
          @deleteMessage="deletePortalMessageRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowAddMessage = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new message</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddMessageDiscussion
      :isShow="isShowAddMessage"
      @closeModal="isShowAddMessage = false"
      @addMessage="addMessageRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdView from "./cells/TdView";
import TdMessage from "./cells/TdMessage";
import TdStatus from "./cells/TdStatus";
import TdTo from "./cells/TdTo";
import TdUpdated from "./cells/TdUpdated";
import TdAction from "./cells/TdAction";
import AddMessageDiscussion from "../../dialogs/AddMessageDiscussion"
export default {
  data() {
    return {
      isShowAddMessage: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "View",
          value: "view",
          name: "view"
        },
        {
          visible: true,
          sortable: false,
          text: "Message",
          value: "message",
          name: "message"
        },
        {
          visible: true,
          sortable: false,
          text: "Participants",
          value: "participant",
          name: "participant"
        },
        {
          visible: true,
          sortable: false,
          text: "Status",
          value: "status",
          name: "status"
        },
        {
          visible: true,
          sortable: false,
          text: "Last update",
          value: "updated",
          name: "updated"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    SlickTable,
    AddMessageDiscussion
  },
  methods: {
    ...mapActions('clientPortal/matter/discussionMessage', [
      "updatePortalMessageRequest",
      "deletePortalMessageRequest",
      "addMessageRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "message") {
        return TdMessage;
      }
      if (columnName === "participant") {
        return TdTo;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "updated") {
        return TdUpdated;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/matter/discussionMessage", ["messages"])
  }
};
</script>
