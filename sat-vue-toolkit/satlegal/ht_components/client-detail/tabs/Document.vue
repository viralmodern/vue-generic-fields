<template>
  <v-col cols="12">
    <div class="mt-2">
      <v-row no-gutters class="justify-center align-center">
        <v-col cols="12" sm="3">
          <v-row no-gutters>
            <v-col cols="12" class="mx-1">
              <span class="subheading font-weight-bold">
                {{
                getClient.name
                }}
              </span>
            </v-col>
            <v-col cols="12" class="mt-2 my-2">
              <v-icon size="15" class="mx-1">alarm</v-icon>
              <span class="text--secondary">Last activity {{ timespan }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <ProgressMultiColor
            :list="document.progressList"
            keyProgress="progress"
            keyColor="color"
          />
        </v-col>
        <v-col cols="12" sm="2" class="text-sm-right my-2">
          <span class="text--secondary">{{ (document.items || []).length }} REQUESTS</span>
        </v-col>
      </v-row>

      <div>
        <SlickTable :items="document.items" :headers="headers">
          <template slot="cell" slot-scope="props">
            <component
              :is="getDisplayComponent(props.column.name)"
              :column="props.column"
              :dataRow="props.dataRow"
              :index="parseInt(props.index) + 1"
              @onChange="updateDocumentRequest($event)"
              @deleteDocument="deleteDocumentRequest"
            />
          </template>
          <template v-slot:top>
            <v-btn color="primary" outlined @click="isShowCreateDocument = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new document request</span>
            </v-btn>
          </template>
        </SlickTable>
        <AddDocument
          :isShow="isShowCreateDocument"
          @closeModal="isShowCreateDocument = false"
          @addDocument="addDocumentRequest"
        />
      </div>
    </div>
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdAction from "../../document-client/TdAction";
import TdDueDate from "../../document-client/TdDueDate";
import TdName from "../../document-client/TdName";
import TdRequester from "../../document-client/TdRequester";
import ProgressMultiColor from "../../progress-bars/ProgressMultiColor";
import AddDocument from "../../dialogs/AddDocument";
import moment from "moment";
export default {
  data() {
    return {
      isShowCreateDocument: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Request name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "DueDate",
          value: "dueDate",
          name: "dueDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Requester",
          value: "requester",
          name: "requester"
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
    ProgressMultiColor,
    AddDocument
  },
  methods: {
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/workspace/client/detail/document", [
      "updateDocumentRequest",
      "deleteDocumentRequest",
      "addDocumentRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "dueDate") {
        return TdDueDate;
      }
      if (columnName === "requester") {
        return TdRequester;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/document", ["document"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),

    getClient() {
      return this.dataClient.find(x => x.id === this.document.client) || {};
    },
    timespan() {
      return moment(this.document.dueDate).fromNow() || "";
    }
  },
  mounted() {
    this.getDataMemberRequest();
  }
};
</script>
