<template>
  <div class="ml-3">
    <SlickTable :items="dataRendered" :headers="headers" @update:pagination="updatePagination($event)">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @update="updateRendered(props.column.name, props.dataRow.id, $event)"
          @remove="removeRenderedRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowAdd = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new rendered notes</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddRendered
      :isShow="isShowAdd"
      @closeModal="isShowAdd = false"
      @addRendered="addRenderedRequest"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdDateFullPicker from "../../cells/TdDateFullPicker";
import TdTextArea from "../../cells/TdTextArea";
import TdAttachment from "./cells/table-rendered/TdAttachment";
import TdNote from "./cells/table-rendered/TdNote";
import TdAction from "./cells/table-rendered/TdAction";
import AddRendered from "../../dialogs/AddRendered"
export default {
  props: {
    index: [Number, String],
    panel: [Number, String]
  },
  data() {
    return {
      isShowAdd: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Rendered notes",
          value: "rendered_note",
          name: "rendered_note"
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
          text: "Notes",
          value: "notes",
          name: "notes"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    SlickTable,
    AddRendered
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/preparation/rendered", [
      "getDataRenderedRequest",
      "updateRenderedRequest",
      "addRenderedRequest",
      "removeRenderedRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "rendered_note") {
        return TdTextArea;
      }
      if (columnName === "date") {
        return TdDateFullPicker;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "notes") {
        return TdNote;
      }
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      return "td";
    },
    updateRendered(column, id, value) {
      const data = {
        columnName: column,
        taskId: id,
        newValue: value
      };
      this.updateRenderedRequest(data);
    },
    updatePagination() {
      if (this.panel === this.index) {
        this.getDataRenderedRequest(this.$route.params.depositionId);
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/rendered", [
      "dataRendered"
    ])
  },
  watch: {
    panel() {
      this.updatePagination();
    }
  }
};
</script>
