<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput
          :preset="$route.query.name"
          placeholder="Search production"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRSI"
        /> -->
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
    <v-expansion-panels class="v-expansion-panels--custom" multiple v-model="panel">
      <v-expansion-panel style="width:100vh" v-for="(groupItem, i) in groupBy.list" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{ groupItem.text }}</div>
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataList[groupItem.groupID]
                ? dataList[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataList[groupItem.groupID]
                ? dataList[groupItem.groupID].totals
                : 0
                }}
                items
              </span>
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGrid
            hide-default-header
            hide-default-footer
            :headers="headersFilter"
            :desserts="
              dataList[groupItem.groupID]
                ? dataList[groupItem.groupID].results
                : []
            "
          >
            <template v-slot:item.instruction="{ props: { item } }">
              <TextArea
                :value="item.instruction"
                @update="updateDefiAndInstrucs(item, 'instruction', $event)"
              />
            </template>
            <template v-slot:item.terminology="{ props: { item } }">
              <TextArea
                :value="item.terminology"
                @update="updateDefiAndInstrucs(item, 'terminology', $event)"
              />
            </template>
            <template v-slot:item.definition="{ props: { item } }">
              <TextArea
                :value="item.definition"
                @update="updateDefiAndInstrucs(item, 'definition', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <v-btn class="ma-0" @click="updateBookmark(item.id, item.bookmarked_pk)" icon small>
                  <v-icon small :color="item.bookmarked_pk ? 'success' : 'grey'">mdi-bookmark</v-icon>
                </v-btn>
                <v-btn
                  class="ma-0"
                  @click="updateDefiAndInstrucs(item, 'flag', !item.flag)"
                  icon
                  small
                >
                  <v-icon small :color="item.flag === true ? 'success' : 'grey'">mdi-flag</v-icon>
                </v-btn>
                <Action :item="item" @remove="remove(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreate
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
              />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="isShowButtonLoadMore(groupItem.groupID)"
                ref="refLoadMore"
                @onPageChanged="loadMore($event, groupItem)"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";

// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";

import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import FormCreate from "./components/FormCreate";

export default {
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Action,
    ButtonLoadMore,
    FormCreate,
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGetIssue: false,
      panel: [0],
      isShowCreate: false,
      headers: [
        { text: "Terminology", value: "terminology", active: true },
        { text: "Definition", value: "definition", active: true },
        { text: "Instruction", value: "instruction", active: true },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      value: 1,
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
      ],
      isCallApiGroupBy: false,
      requestForProductionId: 0,
      isShowPopupAttachment: false,
      isCallApiIssueGroupBy: false,
      isCallApiCharacterGroupBy: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/subpoena/subpoenaDefiAndInstrucs", [
      "dataList",
    ]),
  },
  methods: {
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapActions("ht_store/matter/subpoena/subpoenaDefiAndInstrucs", [
      "getDataFromApi",
      "patchRequestApi",
      "removeRequestApi",
      "updateBookmarkRequest"
    ]),
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onChangeGroupBy(item) {
      const query = {
        ...this.$route.query,
        group: item.field
      };
      this.changeQueryRouter(query);
    },
    async loadMore({ page, setLoading }, groupItem) {
      setLoading(true);
      await this.updatePagination({
        ...this.$route.query,
        page,
        ungroup: groupItem.groupID === "all",
        group_items:
          groupItem.groupID === "all" ? undefined : [groupItem.groupID],
        group_by: groupItem.groupID === "all" ? undefined : this.groupBy.field
      });
      setLoading(false);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    onSearchRSI(text) {
      const query = {
        ...this.$route.query,
        name: text
      };
      this.changeQueryRouter(query);
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      switch (group) {
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async fetchData(query, isFirstCall) {
      this.groupBy = await this.getGroupByCurrent(query.group);
      // delete query.group
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all"
        // ...query
      };
      this.updatePagination(searchObject, isFirstCall);
    },
    updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        subpoenaId: this.$route.params.subpoenaId
      };
      return this.getDataFromApi({ idParams, searchObject, isFirstCall });
    },
    async remove(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        subpoenaId: this.$route.params.subpoenaId,
        rowId: row.id
      };
      await this.removeRequestApi(data);
      close();
    },
    updateDefiAndInstrucs(item, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: item.pk,
          subpoenaId: this.$route.params.subpoenaId
        },
        body: {
          [name]: value
        }
      };
      this.patchRequestApi(data);
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataList[groupID]) return false;
      const totals = this.dataList[groupID].totals;
      const results = this.dataList[groupID].results;
      return totals > 20 && totals > results.length;
    },
    updateBookmark(id, bookmark) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.$route.params.subpoenaId,
          id
        },
        bookmark
      };
      this.updateBookmarkRequest(data);
    }
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.fetchData(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.fetchData(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
</style>
