<template>
  <div class="mt-2">
    <div class="py-2">
      <HeaderDocket/>
    </div>
    <SlickTable :items="dockets" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updateDocketRequest($event)"
          @deleteDocket="deleteDocketRequest"
          @addAtachment="addAtachmentRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowCreateDocket = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new docket</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddDocket
      :isShow="isShowCreateDocket"
      @closeModal="isShowCreateDocket = false"
      @addDocket="addDocketRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdView from "../docket/TdView";
import TdDate from "../docket/TdDate";
import TdDescription from "../docket/TdDescription";
import TdTag from "../docket/TdTag";
import TdAttachment from "../docket/TdAttachment";
import TdAction from "../docket/TdAction";
import AddDocket from "../dialogs/AddDocket";
import HeaderDocket from "../cards/HeaderDocket";
export default {
  data() {
    return {
      isShowCreateDocket: false,
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
          text: "Date",
          value: "date",
          name: "date"
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
          text: "Attachments",
          value: "attachment",
          name: "attachment"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    SlickTable,
    AddDocket,
    HeaderDocket
  },
  methods: {
    ...mapActions("ht_store/matter/briefcase/docket", [
      "getDataDocketRequest",
      "getInformationRequest",
      "updateDocketRequest",
      "deleteDocketRequest",
      "addDocketRequest",
      "addAtachmentRequest"
    ]),
    ...mapActions("ht_store/matter/briefcase/docket/tag", ["getDataTagDocketRequest"]),
    ...mapActions("ht_store/matter/briefcase/docket/attachment", [
      "getDataAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/location", ["getDataLocationRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      if (columnName === "tags") {
        return TdTag;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/briefcase/docket", ["dockets"])
  },
  mounted() {
    this.getDataDocketRequest();
    this.getDataTagDocketRequest();
    this.getDataAttachmentRequest();
    this.getInformationRequest();
    this.getDataLocationRequest();
    // this.getDataCharacterRequest();
  }
};
</script>
