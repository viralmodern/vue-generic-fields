<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search Docket Related" />
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

    <TableGrid
      hide-default-header
      hide-default-footer
      :headers="headers.filter(h => h.active)"
      :desserts="dataDocketRelated"
    >
      <template v-slot:item.related_fact="{ props: { item } }">
        <RelatedChip
          :value="item.related_fact"
          keyName="name"
          :dataList="(dataFacts.all || {}).results"
          textTooltip="Related evidence"
        />
      </template>
    </TableGrid>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";

import RelatedChip from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedChip";

export default {
  components: {
    TableGrid,
    MenuShowHideFields,
    SearchInput,
    CustomizeFieldsTableGrid,
    RelatedChip
  },
  data() {
    return {
      headers: [
        { text: "", value: "drag", active: true },
        {
          text: "Docket entry number",
          value: "docket_entry_number",
          active: true
        },
        { text: "Docket Description", value: "docket_desc", active: true },
        { text: "Related Fact", value: "related_fact", active: true },
        { text: "Related Evidence", value: "related_evidence", active: true },
        { text: "Related Character", value: "related_character", active: true },
        {
          text: "Related Request Status",
          value: "related_request_status",
          active: true
        },
        {
          text: "Related Request item",
          value: "related_request_item",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/facts", ["dataFacts"]),
    ...mapGetters("ht_store/matter/docket", ["dataDocketRelated", "total_related"])
  },
  methods: {
    ...mapActions("ht_store/matter/docket", [
      "getDataDocketRelated",
      "postDocketRelated",
      "patchDocketRelated",
      "deleteDocketRelated"
    ]),
    ...mapActions("ht_store/matter/facts", ["getDataFactsRequest"]),
    resetFields({ fields }) {
      this.headers = fields;
    }
  },
  mounted() {
    const idParams = {
      matterId: this.$route.params.matter || this.$route.params.projectId
    };
    const searchObject = {
      group_by: undefined,
      ungroup: true
    };
    this.getDataDocketRelated();
    this.getDataFactsRequest({ idParams, searchObject });
  }
};
</script>
<style lang="scss">
.v-input__control {
  margin: 0px;
  padding: 0px;
  height: 0px;
}
.v-input__slot {
  margin: 0px;
}
.v-text-field__details {
  margin: 0px;
  padding: 0px;
}
</style>
