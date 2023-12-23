<template>
  <div>
    <SlickTable
      :items="item.items"
      :headers="headers.filter(x=> x.visible)"
      :groupRows="'groupr'+ item.id"
      :groupColumns="'groupc'+ item.id"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @changeDocument="changeDocument($event, item.id)"
          @deleteItemDocument="deleteItemDocument($event, item.id)"
          @showDetailDocument="showDetailDocument"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <v-btn @click="addDocumentItem" color="primary" outlined>
            <v-icon class="mr-2">mdi-add_circle</v-icon>
            <span class="hidden-sm-and-down">Add new request</span>
          </v-btn>
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import NameDocumentReview from "./NameDocumentReview";
import DueDateDocumentReview from "./DueDateDocumentReview";
import ApprovalStatusDocumentReview from "./ApprovalStatusDocumentReview";
import ApprovalDateDocumentReview from "./ApprovalDateDocumentReview";
import TdMatter from "./TdMatter";
import TdDescription from "./TdDescription";
import ActionDocument from "./ActionDocument";
export default {
  components: {
    SlickTable,
    NameDocumentReview,
    DueDateDocumentReview,
    ApprovalStatusDocumentReview,
    ApprovalDateDocumentReview,
    ActionDocument,
    TdMatter,
    TdDescription
  },
  props: {
    item: Object
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Request name",
          value: "documentName",
          name: "documentName"
        },
        {
          visible: true,
          sortable: false,
          text: "Due Date",
          value: "dueDate",
          name: "dueDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Approval Status",
          value: "approvalStatus",
          name: "approvalStatus"
        },
        {
          visible: true,
          sortable: false,
          text: "Approval Date",
          value: "approvalDate",
          name: "approvalDate"
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
          text: "Description",
          value: "description",
          name: "description"
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
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "documentName") {
        return NameDocumentReview;
      }
      if (columnName === "dueDate") {
        return DueDateDocumentReview;
      }
      if (columnName === "approvalStatus") {
        return ApprovalStatusDocumentReview;
      }
      if (columnName === "approvalDate") {
        return ApprovalDateDocumentReview;
      }
      if (columnName === "matter") {
        return TdMatter;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "action") {
        return ActionDocument;
      }
      return "td";
    },
    turnOnOffColumn(data) {
      this.headers.find(x => x.name === data.name).visible = data.visible;
    },
    deleteItemDocument(childrent, parent) {
      const data = {
        parent: parent,
        children: childrent
      };
      this.$emit("deleteItemDocument", data);
    },
    onEndDragRows(value) {
      const data = {
        parent: this.item.id,
        value: value
      };
      this.$emit("moveItemDocument", data);
    },
    changeDocument(value, parent) {
      const data = {
        parent: parent,
        value: value
      };
      this.$emit("changeDocument", data);
    },
    addDocumentItem() {
      this.$emit("addDocumentItem");
    },
    showDetailDocument(e) {
      this.$emit("showDetailDocument", e);
    }
  }
};
</script>
