<template>
  <div>
    <SlickTable groupRows="tableDigital" :items="items" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @updateTask="updateTask"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";

import TdBy from "../../ht_components/cells/digital-howey-checklist/TdBy";
import TdHowey from "../../ht_components/cells/digital-howey-checklist/TdHowey";
import TdName from "../../ht_components/cells/digital-howey-checklist/TdName";
import TdResult from "../../ht_components/cells/digital-howey-checklist/TdResult";
import TdResultProgress from "../../ht_components/cells/digital-howey-checklist/TdResultProgress";
import TdStatusProgress from "../../ht_components/cells/digital-howey-checklist/TdStatusProgress";
import TdStatus from "../../ht_components/cells/digital-howey-checklist/TdStatus";
import TdActions from "../../ht_components/cells/digital-howey-checklist/TdActions";

export default {
  components: {
    SlickTable,
    TdBy,
    TdHowey,
    TdName,
    TdResult,
    TdResultProgress,
    TdStatusProgress,
    TdStatus,
    TdActions
  },
  props: {
    items: Array
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHowey", ["updateTask"]),
    getDisplayComponent(columnName) {
      if (columnName === "actions") {
        return TdActions;
      }
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "totalresult") {
        return TdResultProgress;
      }
      if (columnName === "totalstatus") {
        return TdStatusProgress;
      }
      if (columnName === "result") {
        return TdResult;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "by") {
        return TdBy;
      }
      if (columnName === "howey") {
        return TdHowey;
      }
      return "td";
    }
  },
  computed: {
    headers() {
      const newHeader = [
        {
          visible: true,
          sortable: false,
          text: "View detail",
          value: "actions",
          name: "actions"
        },
        {
          visible: true,
          sortable: false,
          text: "Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Total result",
          value: "totalresult",
          name: "totalresult"
        },
        {
          visible: true,
          sortable: false,
          text: "Total Status",
          value: "totalstatus",
          name: "totalstatus"
        },
        {
          visible: true,
          sortable: false,
          text: "Result",
          value: "result",
          name: "result"
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
          text: "By",
          value: "by",
          name: "by"
        },
        {
          visible: true,
          sortable: false,
          text: "Howey conditions",
          value: "howey",
          name: "howey"
        }
      ];
      return newHeader;
    }
  }
};
</script>
