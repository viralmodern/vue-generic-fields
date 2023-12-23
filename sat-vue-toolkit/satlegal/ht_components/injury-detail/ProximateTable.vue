<template>
  <div>
    <SlickTable :items="proximate" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="editDataProximateRequest($event)"
          @deleteProximate="removeProximateRequest"
        />
      </template>
    </SlickTable>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdName from "./proximate/TdName";
import TdCausedBy from "./proximate/TdCausedBy";
import TdCausedObject from "./proximate/TdCausedObject";
import TdDescription from "./proximate/TdDescription";
import TdContribute from "./proximate/TdContribute";
import TdAction from "./proximate/TdAction";
export default {
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Proximate Cause",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Caused by",
          value: "causedBy",
          name: "causedBy"
        },
        {
          visible: true,
          sortable: false,
          text: "Caused Object",
          value: "causedObject",
          name: "causedObject"
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
    ...mapActions("ht_store/matter/partient/injury/detail/proximate", [
      "getDataProximateRequest",
      "editDataProximateRequest",
      "removeProximateRequest"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "causedBy") {
        return TdCausedBy;
      }
      if (columnName === "causedObject") {
        return TdCausedObject;
      }
      if (columnName === "contribute") {
        return TdContribute;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury/detail/proximate", ["proximate"])
  },
  mounted() {
    this.getDataProximateRequest();
    this.getDataMemberRequest();
  }
};
</script>
