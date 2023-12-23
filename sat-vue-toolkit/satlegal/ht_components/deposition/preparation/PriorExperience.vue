<template>
  <div>
    <SlickTable
      ref="refSlickTable"
      :items="dataPriorExperience"
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
          @update="updatePrior(props.column.name, props.dataRow.id, $event)"
          @updateAsync="
            updatePriorAsync(
              props.dataRow.id,
              props.column.name,
              $event
            )
          "
          @remove="removePriorExperience(props.dataRow.id, $event)"
        />
      </template>
      <template v-slot:top>
        <div class="pa-2 text-right">
          <v-btn color="primary" outlined @click="isShowAdd = true">
            <v-icon class="mr-2">mdi-add_circle</v-icon>
            <span class="hidden-sm-and-down">Add new prior experience</span>
          </v-btn>
        </div>
      </template>
    </SlickTable>
    <AddPriorExperience
      ref="refAddPriorExperience"
      :isLoadingAdd="isLoadingAdd"
      :isShow="isShowAdd"
      @closeModal="isShowAdd = false"
      @addExpense="addPriorExperience"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdYear from "../../cells/TdYear";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdTextArea from "../../cells/TdTextArea";
import AddPriorExperience from "../../dialogs/AddPriorExperience";

import TdAttachmentLink from "./cells/TdAttachmentLink";
import TdDelete from "./cells/TdDelete";
export default {
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
          visible: true,
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
        },
        {
          visible: true,
          sortable: false,
          text: "Employer name",
          value: "employer_name",
          name: "employer_name"
        },
        {
          visible: true,
          sortable: false,
          text: "Address",
          value: "address",
          name: "address"
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
    AddPriorExperience
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/preparation/priorExperience", [
      "getDataPriorExperienceRequest",
      "updatePriorExperienceRequest",
      "updatePriorExperienceAsyncRequest",
      "addPriorExperienceRequest",
      "removePriorExperienceRequest"
    ]),
    watchPaginationTable(pagination) {
      this.$refs.refSlickTable.$el.scrollIntoView({top: 0, behavior: 'smooth'});
      this.$nextTick(() => this.updatePagination(pagination));
    },
    async addPriorExperience(dataForm) {
      try {
        const data = {
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk
          },
          body: dataForm
        };
        this.isLoadingAdd = true;
        await this.addPriorExperienceRequest(data);
        this.$refs.refAddPriorExperience.clear();
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
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "employer_name") {
        return TdTextArea;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      if (columnName === "address") {
        return TdTextArea;
      }
      if (columnName === "attachment") {
        return TdAttachmentLink;
      }
      return "td";
    },
    updatePrior(name, priorExperienceId, value) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          priorExperienceId,
        },
        body: {
          [name]: value
        }
      };
      this.updatePriorExperienceRequest(data);
    },
    async updatePriorAsync(priorExperienceId, name, {value, setLoading}) {
      try {
        const data = {
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk,
            priorExperienceId
          },
          body: {
            [name]: value
          }
        };
        setLoading(true);
        await this.updatePriorExperienceAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    async removePriorExperience(priorExperienceId, close) {
      const data = {
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        priorExperienceId,
      };
      await this.removePriorExperienceRequest(data);
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
        this.getDataPriorExperienceRequest({ idParams, searchObject });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/priorExperience", [
      "dataPriorExperience",
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
