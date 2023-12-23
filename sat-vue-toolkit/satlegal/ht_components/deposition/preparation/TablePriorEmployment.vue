<template>
  <div>
    <SlickTable
      ref="refSlickTable"
      :items="dataEmployment"
      :headers="headers"
      :totals="totals"
      @watchPagination="watchPaginationTable"
      :loading="isLoadingGet"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index) + 1"
          @update="updateEmployment(props.column.name, props.dataRow.id, $event)"
          @remove="removeEmployment(props.dataRow.id, $event)"
        />
      </template>
      <template v-slot:top>
        <div class="pa-2 text-right">
          <v-btn color="primary" outlined @click="isShowAdd = true">
            <v-icon class="mr-2">mdi-add_circle</v-icon>
            <span class="hidden-sm-and-down">Add new</span>
          </v-btn>
        </div>
      </template>
    </SlickTable>
    <FormCreateEmployment
      ref="refFormCreateEmployment"
      :isLoadingAdd="isLoadingAdd"
      header="Add new prior employment"
      :isShowPopup="isShowAdd"
      @closeModal="isShowAdd = false"
      @submit="addEmployment"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdYear from "../../cells/TdYear";
import FormCreateEmployment from "../../dialogs/FormCreateEmployment";
import TdType from "../../cells/TdType";

import TdDelete from "./cells/TdDelete";
import TdAttachment from "./cells/table-employment/TdAttachment";
export default {
  components: {
    SlickTable,
    FormCreateEmployment,
  },
  props: {
    index: [Number, String],
    panel: [Number, String]
  },
  data() {
    return {
      isShowAdd: false,
      isLoadingAdd: false,
      headers: [
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
          text: "Title",
          value: "title",
          name: "title"
        },
        {
          visible: false,
          sortable: false,
          text: "Role",
          value: "role",
          name: "role"
        },
        {
          visible: true,
          sortable: false,
          text: "Testimony side",
          value: "testimony",
          name: "testimony"
        },
        {
          visible: false,
          sortable: false,
          text: "Case name",
          value: "case_name",
          name: "case_name"
        },
        {
          visible: true,
          sortable: false,
          text: "Who win?",
          value: "who_win",
          name: "who_win"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/preparation/employment", [
      "getDataEmploymentRequest",
      "updateEmploymentRequest",
      "addEmploymentRequest",
      "removeEmploymentRequest"
    ]),
    watchPaginationTable(pagination) {
      this.$refs.refSlickTable.$el.scrollIntoView({top: 0, behavior: 'smooth'});
      this.$nextTick(() => this.updatePagination(pagination));
    },
    async addEmployment(dataForm) {
      try {
        const data = {
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk
          },
          body: dataForm
        };
        this.isLoadingAdd = true;
        await this.addEmploymentRequest(data);
        this.$refs.refFormCreateEmployment.clear();
        this.isLoadingAdd = false;
        this.isShowAdd = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    getDisplayComponent(columnName) {
      if (columnName === "from") {
        return TdYear;
      }
      if (columnName === "to") {
        return TdYear;
      }

      if (columnName === "title") {
        return TdInlineEdit;
      }
      if (columnName === "role") {
        return TdTextArea;
      }
      if (columnName === "testimony") {
        return TdType;
      }
      if (columnName === "case_name") {
        return TdTextArea;
      }
      if (columnName === "who_win") {
        return TdType;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    updateEmployment(name, employmentId, value) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          employmentId,
        },
        body: {
          [name]: value
        }
      };
      this.updateEmploymentRequest(data);
    },
    async removeEmployment(employmentId, close) {
      const data = {
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        employmentId,
      };
      await this.removeEmploymentRequest(data);
      close();
    },
    updatePagination({ page }) {
      if (this.panel === this.index) {
        const searchObject = {
          page
        };
        const idParams = {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk
        };
        this.getDataEmploymentRequest({ idParams, searchObject });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/employment", [
      "dataEmployment",
      "isLoadingGet",
      "totals",
    ]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
  },
  mounted() {
    this.updatePagination({ page: 1 });
  },
  watch: {
    panel() {
      this.updatePagination({ page: 1 });
    }
  }
};
</script>
