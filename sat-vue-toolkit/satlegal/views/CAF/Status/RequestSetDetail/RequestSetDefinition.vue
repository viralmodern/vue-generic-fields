<template>
  <v-container fluid>
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

    <TableGrid
      hide-default-header
      hide-default-footer
      :fixedHeader="false"
      :headers="headersFilter"
      :desserts="dataList"
      :loading="isLoadingGet"
    >
      <template v-slot:item.term="{ props: { item } }">
        <TextField :value="item.term" @update="updateDefinition(item.pk, 'term', $event)" />
      </template>
      <template v-slot:item.desc="{ props: { item } }">
        <TextArea :value="item.desc" @update="updateDefinition(item.pk, 'desc', $event)" />
      </template>
      <template v-slot:item.action="{ props: { item } }">
        <div class="d-flex">
          <BookmarkOrFlag
            :valueBookmark="item.bookmarked_pk"
            :endpoint="`/api/matters/${$$$matterID}/request-sets/${$route.params.requestSetId}/definitions/${item.pk}`"
            routerMutation="ht_store/matter/requestStatus/requestSetDefinition/updateDefinition"
            :pk="item.pk"
            :valueFlag="item.reported_object && item.reported_object.pk"
          />
          <Action @remove="removeDefinition(item.pk, $event)" />
        </div>
      </template>
    </TableGrid>
    <div class="d-flex align-center align-center">
      <v-col cols="10" class="pa-0">
        <FormCreateSetDefinition class="pt-4" />
      </v-col>
      <v-col cols="2 text-right">
        <ButtonLoadMore
          class="pt-4"
          v-if="totals > 20 && totals > dataList.length"
          @onPageChanged="loadMore"
        />
      </v-col>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
// cell
import FormCreateSetDefinition from "../components/FormCreateSetDefinition";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  components: {
    TableGrid,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Action,
    TextField,
    TextArea,
    ButtonLoadMore,
    FormCreateSetDefinition,
    BookmarkOrFlag
  },
  data() {
    return {
      headers: [
        { text: "Terminology", value: "term", active: true },
        { text: "Definition", value: "desc", active: true },
        { text: "Action", value: "action", active: true }
      ]
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    ...mapGetters("ht_store/matter/requestStatus/requestSetDefinition", [
      "isLoadingGet",
      "dataList",
      "totals"
    ])
  },
  methods: {
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateDefinition(definitionId, name, value) {
      const { requestSetId, projectId } = this.$route.params;
      const data = {
        matterId: projectId,
        requestSetId,
        definitionId,
        body: {
          [name]: value
        }
      };
      this.updateDefinitionRequest(data);
    },
    async removeDefinition(rowId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.$route.params.requestSetId,
        rowId
      };
      await this.removeDefinitionRequest(data);
      close();
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      setLoading(false);
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.$route.params.requestSetId
      };
      return this.getDefinitionRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    ...mapActions("ht_store/matter/requestStatus/requestSetDefinition", [
      "getDefinitionRequest",
      "updateDefinitionRequest",
      "removeDefinitionRequest",
    ])
  },
  mounted() {
    this.updatePagination({ page: 1, isFirstCall: true });
  }
};
</script>
<style scoped>
.name-evidence {
  color: blue;
  cursor: pointer;
}
</style>
