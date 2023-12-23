<template>
  <div>
    <SlickTable
      :items="complaints"
      :headers="headers.filter(x=> x.visible)"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @changeComplaint="changeComplaint($event)"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import IdItem from "../../ht_components/overview/complaints/IdItem";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import Plantiff from "../../ht_components/overview/complaints/Plantiff";
import TurnInFact from "../../ht_components/overview/complaints/TurnInFact";
import LinkRecord from "../../ht_components/overview/complaints/LinkRecord";
import Tag from "../../ht_components/overview/complaints/Tag";
import Responses from "../../ht_components/overview/complaints/Responses";
export default {
  components: {
    IdItem,
    SlickTable,
    Plantiff,
    TurnInFact,
    LinkRecord,
    Tag,
    Responses
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Number",
          value: "id",
          name: "id"
        },
        {
          visible: true,
          sortable: false,
          text: "Plaintiff's Complaint",
          value: "plantiff",
          name: "plantiff"
        },
        {
          visible: true,
          sortable: false,
          text: "Turn into Fact",
          value: "turnInFact",
          name: "turnInFact"
        },
        {
          visible: true,
          sortable: false,
          text: "Tag",
          value: "tag",
          name: "tag"
        },
        {
          visible: true,
          sortable: false,
          text: "Link Records",
          value: "linkRecord",
          name: "linkRecord"
        },

        {
          visible: true,
          sortable: false,
          text: "Defendant's Responses",
          value: "responses",
          name: "responses"
        }
      ]
    };
  },
  methods: {
    ...mapActions("ht_store/project/overview/complaint", [
      "getDataOverviewComplaintRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "id") {
        return IdItem;
      }
      if (columnName === "plantiff") {
        return Plantiff;
      }
      if (columnName === "turnInFact") {
        return TurnInFact;
      }
      if (columnName === "linkRecord") {
        return LinkRecord;
      }
      if (columnName === "tag") {
        return Tag;
      }
      if (columnName === "tag") {
        return Tag;
      }
      if (columnName === "responses") {
        return Responses;
      }
      return "td";
    },
    turnOnOffColumn(data) {
      this.headers.find(x => x.name === data.name).visible = data.visible;
    },
    onEndDragRows(data) {
      this.changeDragDrawComplaint(data);
    },
    changeComplaint(e) {
      this.changeDataComplaint(e);
    },
    ...mapMutations("ht_store/project/overview/complaint", [
      "changeDataComplaint",
      "changeDragDrawComplaint"
    ])
  },
  computed: {
    ...mapGetters("ht_store/project/overview/complaint", ["complaints"])
  },
  mounted() {
    this.getDataOverviewComplaintRequest(1);
  }
};
</script>
