<template>
  <div class="pa-3">
    <v-card flat class="mb-4">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            :hideFieldIndex="['drag']"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <TableGridStackColumn
      hide-default-header
      hide-default-footer
      show-footer-stack-column
      :fixedHeader="false"
      :headers="headers.filter(x => x.active)"
      :headerStackColumn="headerStackColumn"
      :desserts="desserts"
      :loading="isLoadingGet"
    >
      <template v-slot:itemStackColumn.action>
        <span class="text-center">
          <Action />
        </span>
      </template>
      <template v-slot:appendItemStackColumn.nested="{ props: { itemStackColumn } }">
        <div class="d-flex justify-space-between align-center">
          <a color="primary" class="append-item-stack-column-action">+ Add new</a>
          <div class="text-center">
            <v-pagination
              v-if="itemStackColumn.length"
              :value="1"
              :length="2"
              circle
            ></v-pagination>
          </div>
        </div>
      </template>
    </TableGridStackColumn>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import StackColumnTable from "@/sat-vue-toolkit/satlegal/reuse-components/StackColumnTable";
import CellActions from "@/sat-vue-toolkit/satlegal/reuse-components/StackColumnTable/CellActions";
import TableGridStackColumn from "@/sat-vue-toolkit/satlegal/reuse-components/TableGridStackColumn";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";

export default {
  components: {
    StackColumnTable,
    CellActions,
    TableGridStackColumn,
    MenuShowHideFields,
    CustomizeFieldsTableGrid,
    Action
  },
  data() {
    return {
      headerStackColumn: [
        {
          text: "Description",
          value: "desc",
          headerValue: "nested",
          color: 'cyan',
        },
        {
          text: "Reliquished By (character)",
          value: "reliquished_by_character",
          headerValue: "nested",
          color: 'green',
        },
        {
          text: "Reliquished By (matter member)",
          value: "reliquished_by_matter_member",
          headerValue: "nested",
          color: 'purple',
        },
        {
          text: "Reliquished Date",
          value: "reliquished_date",
          headerValue: "nested",
          color: 'deep-purple',
        },
        {
          text: "Received by (character)",
          value: "received_by_character",
          headerValue: "nested",
          color: 'indigo',
        },
        {
          text: "Received by (matter member)",
          value: "received_by_matter_member",
          headerValue: "nested",
          color: 'blue',
        },
        {
          text: "Received Date",
          value: "received_date",
          headerValue: "nested",
          color: 'light-blue',
        },
        {
          text: "Action",
          value: "action",
          headerValue: "nested",
          color: 'error'
        }
      ],
      headers: [
        {
          text: "Evidence Name",
          value: "name",
          active: true,
          rowspan: 2
        },
        {
          text: "Evidence Description",
          value: "evidence_desc",
          active: true,
          rowspan: 2
        },
        {
          text: "Date Submitted",
          value: "date_submitted",
          active: true,
          rowspan: 2
        },
        {
          text: "Collected By",
          value: "collecte_by",
          active: true,
          rowspan: 2
        },
        {
          text: "Date Collected",
          value: "date_collected",
          active: true,
          rowspan: 2
        },
        {
          text: "Date and Time stored",
          value: "date_and_time_stored",
          active: true,
          rowspan: 2
        },
        {
          text: "Storage Location",
          value: "storage_location",
          active: true,
          rowspan: 2
        },
        {
          text: "Device Type",
          value: "device_type",
          active: true,
          rowspan: 2
        },
        {
          text: "MD5 Sum",
          value: "md5_sum",
          active: true,
          rowspan: 2
        },
        {
          text: "SHA-1 Sum",
          value: "sha_1_sum",
          active: true,
          rowspan: 2
        },
        {
          text: "Comment",
          value: "comment",
          active: true,
          rowspan: 2
        },
        {
          text: "Submitter Description",
          value: "submitter_desc",
          active: true,
          rowspan: 2
        },
        {
          text: "Chain of Custody ",
          value: "nested",
          active: true,
          isStackColumn: true,
          center: true,
          class: 'text-subtitle-1 font-weight-bold'
        },
        {
          text: "Actions",
          value: "actions",
          active: true,
          rowspan: 2
        }
      ],
      desserts: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/evidencesCustody", [
      "dataEvidencesCustody",
      "isLoadingGet",
      "totals",
    ]),
  },
  methods: {
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getDataEvidencesCustody(page, type) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      // const buttonLoadMore = this.$refs.refLoadMore;
      // buttonLoadMore && buttonLoadMore.setLoading(true);
      await this.getDataEvidencesCustodyRequest();
      // buttonLoadMore && buttonLoadMore.setLoading(false);
    },
    ...mapActions("ht_store/matter/evidencesCustody", [
      "getDataEvidencesCustodyRequest",
      "addEvidencesCustodyRequest",
      "updateEvidencesCustodyRequest",
      "removeEvidencesCustodyRequest",
    ]),
  },
  mounted() {
    this.getDataEvidencesCustody(1, null);
  },
};
</script>
