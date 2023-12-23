<template>
  <div class="mt-2">
    <SlickTable :items="messages" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updateClientMessageRequest($event)"
          @deleteMessage="deleteClientMessageRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowAddMessage = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new message</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddMessageClient
      :isShow="isShowAddMessage"
      @closeModal="isShowAddMessage = false"
      @addMessage="addMessageRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdView from "../../message-client/TdView";
import TdMessage from "../../message-client/TdMessage";
import TdStatus from "../../message-client/TdStatus";
import TdTo from "../../message-client/TdTo";
import TdMatter from "../../message-client/TdMatter";
import TdUpdated from "../../message-client/TdUpdated";
import TdAction from "../../message-client/TdAction";
import AddMessageClient from "../../dialogs/AddMessageClient"
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
          text: "To",
          value: "to",
          name: "to"
        },
        {
          visible: true,
          sortable: false,
          text: "Matter",
          value: "matter",
          name: "matter"
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
    AddMessageClient
  },
  methods: {
    ...mapActions('workspace/client/detail/message', [
      "updateClientMessageRequest",
      "deleteClientMessageRequest",
      "addMessageRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "message") {
        return TdMessage;
      }
      if (columnName === "to") {
        return TdTo;
      }
      if (columnName === "matter") {
        return TdMatter;
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
    ...mapGetters("ht_store/workspace/client/detail/message", ["messages"])
  }
};
</script>
