<template>
  <div>
    <SlickTable
      :items="claims"
      :headers="headers.filter(x=> x.visible)"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @changeClaim="changeClaim($event)"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import CountName from "../../ht_components/overview/claim/CountName";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import Description from "../../ht_components/overview/claim/Description";
import LinkRecord from "../../ht_components/overview/claim/LinkRecord";
import Tag from "../../ht_components/overview/claim/Tag";
export default {
  components: {
    CountName,
    SlickTable,
    Description,
    LinkRecord,
    Tag
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Count Name",
          value: "countName",
          name: "countName"
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
        }
      ]
    };
  },
  methods: {
    ...mapActions("ht_store/project/overview/claim", ["getDataOverviewClaimRequest"]),
    getDisplayComponent(columnName) {
      if (columnName === "countName") {
        return CountName;
      }
      if (columnName === "description") {
        return Description;
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
      return "td";
    },
    turnOnOffColumn(data) {
      this.headers.find(x => x.name === data.name).visible = data.visible;
    },
    changeClaim(e) {
      this.changeDataClaim(e);
    },
    onEndDragRows(data) {
      this.changeDragDrawClaim(data);
    },
    ...mapMutations("ht_store/project/overview/claim", [
      "changeDragDrawClaim",
      "changeDataClaim"
    ])
  },
  computed: {
    ...mapGetters("ht_store/project/overview/claim", ["claims"])
  },
  mounted() {
    this.getDataOverviewClaimRequest(2);
  }
};
</script>
