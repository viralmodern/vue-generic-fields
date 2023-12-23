<template>
  <div>
    <SlickTable :items="differences" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="editDataDifferenceRequest($event)"
          @deleteDifference="removeDifferenceRequest"
        />
      </template>
    </SlickTable>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdName from "./difference/TdName";
import TdInjury from "./difference/TdInjury";
import TdInjuryLabel from "./difference/TdInjuryLabel";
import TdContribute from "./difference/TdContribute";
import TdAction from "./difference/TdAction";
export default {
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Differences",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Injury ",
          value: "injury",
          name: "injury"
        },
        {
          visible: true,
          sortable: false,
          text: "Injury label",
          value: "injuryLabel",
          name: "injuryLabel"
        },
        {
          visible: true,
          sortable: false,
          text: "Contribute to Injury",
          value: "contribute",
          name: "contribute"
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
    SlickTable
  },
  methods: {
    ...mapActions("ht_store/matter/partient/practice/detail/difference", [ // eslint-disable-line
      "getDataDifferenceRequest",
      "editDataDifferenceRequest",
      "removeDifferenceRequest"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]), // eslint-disable-line
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "injury") {
        return TdInjury;
      }
      if (columnName === "injuryLabel") {
        return TdInjuryLabel;
      }
      if (columnName === "contribute") {
        return TdContribute;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/practice/detail/difference", ["differences"]) // eslint-disable-line
  },
  mounted() {
    this.getDataDifferenceRequest();
    this.getDataMemberRequest();
  }
};
</script>
