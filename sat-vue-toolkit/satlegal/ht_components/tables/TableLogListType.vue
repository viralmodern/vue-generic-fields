<template>
  <div>
    <SlickTable :items="item" :headers="columnHeaders">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="onChange"
          @deleteLogType="deleteLogType"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="$emit('addNewItem')">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">{{ titleAddByType }}</span>
        </v-btn>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdName from "../log-type/TdName";
import TdStartDate from "../log-type/TdStartDate";
import TdEndDate from "../log-type/TdEndDate";
import TdType from "../log-type/TdType";
import TdDescription from "../log-type/TdDescription";
import TdTag from "../log-type/TdTag";
import TdAction from "../log-type/TdAction";
import TdDate from "../log-type/TdDate";
import TdTime from "../log-type/TdTime";
import TdRelease from "../log-type/TdRelease";
import TdFrom from "../log-type/TdFrom";
import TdTo from "../log-type/TdTo";
import TdNumber from "../log-type/TdNumber";
import TdSource from "../log-type/TdSource";
import TdStage from "../log-type/TdStage";
import TdAttachment from "../log-type/TdAttachment";
export default {
  components: {
    SlickTable,
    TdTag,
    TdDescription,
    TdType,
    TdEndDate,
    TdStartDate,
    TdName,
    TdTime,
    TdDate,
    TdRelease,
    TdFrom,
    TdTo,
    TdStage,
    TdSource,
    TdNumber,
    TdAttachment
  },
  props: {
    item: Array,
    type: Number
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Item name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Released by",
          value: "releasedBy",
          name: "releasedBy"
        },
        {
          visible: true,
          sortable: false,
          text: "Start date",
          value: "startDate",
          name: "startDate"
        },
        {
          visible: true,
          sortable: false,
          text: "End date",
          value: "endDate",
          name: "endDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Attachment",
          value: "attachment",
          name: "attachment"
        },
        {
          visible: true,
          sortable: false,
          text: "From",
          value: "from",
          name: "from"
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
          text: "Number",
          value: "number",
          name: "number"
        },
        {
          visible: true,
          sortable: false,
          text: "Source of Exhibit",
          value: "source",
          name: "source"
        },
        {
          visible: true,
          sortable: false,
          text: "Stage Offered",
          value: "stage",
          name: "stage"
        },
        {
          visible: true,
          sortable: false,
          text: "Privilege Type",
          value: "type",
          name: "type"
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
          text: "Tags",
          value: "tags",
          name: "tags"
        },
        {
          visible: true,
          sortable: false,
          text: "Date and Time",
          value: "date",
          name: "date"
        },
        {
          visible: true,
          sortable: false,
          text: "",
          value: "time",
          name: "time"
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
  computed: {
    titleAddByType() {
      if (this.type == 1) {
        return "Add privilege entry";
      }
      if (this.type == 2) {
        return "Add item ";
      }
      if (this.type == 3) {
        return "Add item ";
      }
      if (this.type == 4) {
        return "Add exhibit entry ";
      }
      return "";
    },
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    columnHeaders() {
      if (this.type == 1) {
        return this.headers.filter(
          r =>
            ![
              "date",
              "time",
              "releasedBy",
              "from",
              "to",
              "number",
              "source",
              "stage"
            ].some(k => k === r.name)
        );
      }
      if (this.type == 2) {
        return this.headers.filter(
          r =>
            ![
              "startDate",
              "endDate",
              "type",
              "from",
              "to",
              "number",
              "source",
              "stage",
              "attachment"
            ].some(k => k === r.name)
        );
      }
      if (this.type == 3) {
        return this.headers.filter(
          r =>
            ![
              "startDate",
              "endDate",
              "type",
              "releasedBy",
              "number",
              "source",
              "stage",
              "attachment"
            ].some(k => k === r.name)
        );
      }
      if (this.type == 4) {
        return this.headers.filter(
          r =>
            ![
              "date",
              "time",
              "startDate",
              "endDate",
              "type",
              "releasedBy",
              "from",
              "to",
              "attachment"
            ].some(k => k === r.name)
        );
      }
      return "";
    }
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "startDate") {
        return TdStartDate;
      }
      if (columnName === "endDate") {
        return TdEndDate;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "tags") {
        return TdTag;
      }
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "type") {
        return TdType;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "time") {
        return TdTime;
      }
      if (columnName === "from") {
        return TdFrom;
      }
      if (columnName === "to") {
        return TdTo;
      }
      if (columnName === "releasedBy") {
        return TdRelease;
      }
      if (columnName === "number") {
        return TdNumber;
      }
      if (columnName === "source") {
        return TdSource;
      }
      if (columnName === "stage") {
        return TdStage;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      return "td";
    },
    onChange(data) {
      this.$emit("changeData", data);
    },
    deleteLogType(data) {
      this.$emit("deleteLogType", data);
    }
  }
};
</script>
