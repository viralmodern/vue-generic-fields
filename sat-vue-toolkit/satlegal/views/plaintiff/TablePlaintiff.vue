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
      <template v-slot:top>
        <slot name="button"></slot>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";

import TdActions from "../../ht_components/cells/plaintiff/TdActions";
import TdAcquireSouce from "../../ht_components/cells/plaintiff/TdAcquireSouce";
import TdBoughtAt from "../../ht_components/cells/plaintiff/TdBoughtAt";
import TdCurrent from "../../ht_components/cells/plaintiff/TdCurrent";
import TdFirstName from "../../ht_components/cells/plaintiff/TdFirstName";
import TdKYCStatus from "../../ht_components/cells/plaintiff/TdKYCStatus";
import TdLastName from "../../ht_components/cells/plaintiff/TdLastName";
import TdPlaintiffGroup from "../../ht_components/cells/plaintiff/TdPlaintiffGroup";
import TdQuantity from "../../ht_components/cells/plaintiff/TdQuantity";
import TdTotalBought from "../../ht_components/cells/plaintiff/TdTotalBought";

export default {
  components: {
    SlickTable,
    TdActions,
    TdAcquireSouce,
    TdBoughtAt,
    TdCurrent,
    TdFirstName,
    TdKYCStatus,
    TdLastName,
    TdPlaintiffGroup,
    TdQuantity,
    TdTotalBought
  },
  props: {
    items: Array
  },
  methods: {
    ...mapActions("ht_store/matter/plaintiff", ["updateTask"]),
    getDisplayComponent(columnName) {
      if (columnName === "actions") {
        return TdActions;
      }
      if (columnName === "first_name") {
        return TdFirstName;
      }
      if (columnName === "last_name") {
        return TdLastName;
      }
      if (columnName === "kyc_status") {
        return TdKYCStatus;
      }
      if (columnName === "acquire_souce") {
        return TdAcquireSouce;
      }
      if (columnName === "plaintiff_group") {
        return TdPlaintiffGroup;
      }
      if (columnName === "bought_At") {
        return TdBoughtAt;
      }
      if (columnName === "quantity") {
        return TdQuantity;
      }
      if (columnName === "total_bought") {
        return TdTotalBought;
      }
      if (columnName === "current") {
        return TdCurrent;
      }
      return "td";
    }
  },
  computed: {
    headers() {
      const newHeader = [
        // {
        //   visible: true,
        //   sortable: false,
        //   text: "View detail",
        //   value: "actions",
        //   name: "actions"
        // },
        {
          visible: true,
          sortable: false,
          text: "First Name",
          value: "first_name",
          name: "first_name"
        },
        {
          visible: true,
          sortable: false,
          text: "Last Name",
          value: "last_name",
          name: "last_name"
        },
        {
          visible: true,
          sortable: false,
          text: "KYC Status",
          value: "kyc_status",
          name: "kyc_status"
        },
        {
          visible: true,
          sortable: false,
          text: "Acquire Souce",
          value: "acquire_souce",
          name: "acquire_souce"
        },
        {
          visible: true,
          sortable: false,
          text: "Plaintiff Group",
          value: "plaintiff_group",
          name: "plaintiff_group"
        },
        {
          visible: true,
          sortable: false,
          text: "Bought At",
          value: "bought_At",
          name: "bought_At"
        },
        {
          visible: true,
          sortable: false,
          text: "Quantity",
          value: "quantity",
          name: "quantity"
        },
        {
          visible: true,
          sortable: false,
          text: "Total Bought",
          value: "total_bought",
          name: "total_bought"
        },
        {
          visible: true,
          sortable: false,
          text: "Current",
          value: "current",
          name: "current"
        }
      ];
      return newHeader;
    }
  }
};
</script>
