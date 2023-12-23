<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search request set" />
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="changeQueryRouter"
        />
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
                Request set slick grid
              </span>
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGrid
            hide-default-header
            hide-default-footer
            :headers="headers.filter(h => h.active)"
            :desserts="
              dataList[groupItem.groupID]
                ? dataList[groupItem.groupID].results
                : []
            "
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextArea :value="item.name" @update="update(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.view="{ props: { item } }">
              <v-btn exact icon small :to="`request-set/detail/${item.id}?group=all`">
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="update(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.deadline="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.deadline | formatShortDate}}</div>
                <DatePicker
                  title="Deadline"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.deadline"
                  :textTooltip="
                  [item.deadline].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.deadline)}`
                    : 'Add date'
                "
                  class="mx-2"
                  @updateTime="update(item.id, 'deadline', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.priority="{ props: { item } }">
              <SelectCheckBox
                keyValue="id"
                keyText="name"
                title="Request Set Priority"
                :value="item.priority"
                :dataList="[{...NA, value: NA.id}, ...appConfigs.level]"
                :flag="true"
                @update="update(item.id, 'priority', $event.id)"
              />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                :isEmitOpenMenu="true"
                @onOpenMenu="getDataIssues"
                :isLoadingGet="isLoadingGetIssue"
                @update="update(item.id, 'legal_issues', $event)"
              />
            </template>
            <template v-slot:item.request_to="{ props: { item } }">
              <CharacterSingles
                textTooltip="Request To"
                :value="(item.request_to)"
                @update="update(item.id, 'request_to', $event)"
              />
            </template>
            <template v-slot:item.request_from="{ props: { item } }">
              <SelectCheckBox
                keyValue="id"
                keyText="name"
                title="Request From"
                :value="item.request_from"
                :dataList="[{...NA, value: NA.id}, ...appConfigs.whoWin]"
                @update="update(item.id, 'request_from', $event.id)"
              />
            </template>
            <template v-slot:item.type="{ props: { item } }">
              <SelectCheckBox
                title="Request type"
                keyValue="value"
                keyText="name"
                :value="item.type"
                :dataList="[{...NA, value: NA.id}, ...appConfigs.requestType]"
                @update="update(item.id, 'type', $event.value)"
              />
            </template>
            <template v-slot:item.current_progress="{ props: { item } }">
              <Range
                :value="currentProgress(item.total_done, item.total_items)"
                :isReadOnly="true"
              />
            </template>
            <template v-slot:item.request_stage="{ props: { item } }">
              <ProgressWithHover
                :list="item.request_stage"
                :total="item.totals_request"
                nameProgress="name"
                keyProgress="progress"
                keyColor="color"
              />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <Members
                textTooltip="members"
                :value="item.members"
                @update="update(item.pk, 'members', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/request-sets/${item.pk}`"
                  routerMutation="ht_store/matter/requestStatus/requestSet/patchRequestApi"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Action :item="item" @remove="remove(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRequestSet
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
              />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="isShowButtonLoadMore(groupItem.groupID)"
                ref="refLoadMore"
                @onPageChanged="$emit('onPageChanged')"
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
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import ProgressWithHover from "@/sat-vue-toolkit/satlegal/ht_components/progress-bars/ProgressWithHover";

import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import FormCreateRequestSet from "./components/FormCreateRequestSet";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    // Range,
    TextArea,
    SelectCheckBox,
    DatePicker,
    Action,
    ButtonLoadMore,
    CharacterSingles,
    Members,
    Issue,
    FormCreateRequestSet,
    Range,
    ProgressWithHover,
    BookmarkOrFlag
  },
  data() {
    return {
      NA,
      isLoadingGetIssue: false,
      isLoadingGetCharacter: false,
      panel: [0],
      headers: [
        { text: "", value: "view", active: true },
        { text: "Request Set Name", value: "name", active: true },
        { text: "Request Set Description", value: "desc", active: true },
        { text: "Assigned Members", value: "members", active: true },
        { text: "Request Set Deadline", value: "deadline", active: true },
        { text: "Request Set Priority", value: "priority", active: true },
        { text: "Request to", value: "request_to", active: true },
        { text: "Request Type", value: "type", active: true },
        { text: "Request from", value: "request_from", active: true },
        {
          text: "Number of Request Items",
          value: "total_items",
          active: true
        },
        { text: "Current Progress", value: "current_progress", active: true },
        { text: "Legal Issues", value: "legal_issues", active: true },
        { text: "Total Time Log", value: "total_log_time", active: true },
        { text: "Total Expense Log", value: "total_expense", active: true },
        { text: "Latest Update", value: "modified", active: true },
        { text: "Request Stage", value: "request_stage", active: true },
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
        {
          id: 2,
          field: "request_to",
          title: "Request To",
          list: []
        },
        {
          id: 3,
          field: "request_from",
          title: "Request from",
          list: []
        },
        {
          id: 4,
          field: "legal_issues",
          title: "Legal Issue",
          list: []
        },
        {
          id: 6,
          field: "priority",
          title: "Priority",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiIssueGroupBy: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSet", ["dataList"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    currentProgress(done, items) {
      if (items === 0) return 0;
      return (done / items) * 100;
    },
    ...mapActions("ht_store/matter/requestStatus/requestSet", [
      "getDataFromApi",
      "addRequestApi",
      "patchRequestApi",
      "removeRequestApi",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"]),
    isShowButtonLoadMore(groupID) {
      if (!this.dataList[groupID]) return false;
      const totals = this.dataList[groupID].totals;
      const results = this.dataList[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(item) {
      this.$router.push({
        path: this.$route.path,
        query: { group: item.field }
      });
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "request_to":
          if (!this.isCallApiCharacterGroupBy) {
            this.isCallApiCharacterGroupBy = true;
            const dataCharacter = await this.getAllDataCharacterRequest({
              matterId
            });
            groupByCurrent.list = [...dataCharacter, nullalbe].map(x => {
              return {
                id: x.pk,
                groupID: x.pk,
                value: x.pk,
                text: x.first_name + x.last_name
              };
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        case "request_from":
          groupByCurrent.list = (
            this.appConfigChoices[this.appConfigConstants.REQUEST_FROM] || []
          ).map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "legal_issues":
          if (!this.isCallApiIssueGroupBy) {
            this.isCallApiIssueGroupBy = true;
            const dataIssues = await this.getDataIssuesRequest({
              matterId
            });
            groupByCurrent.list = [...dataIssues, nullalbe].map(x => {
              return {
                id: x.pk,
                groupID: x.pk,
                value: x.pk,
                text: x.name
              };
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        case "priority":
          groupByCurrent.list = [
            ...this.appConfigs.listPriority,
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.name
            };
          });
          return groupByCurrent;
        default:
          groupByCurrent.list.push({ id: 1, groupID: "all", text: "" });
          return groupByCurrent;
      }
    },
    async fetchData(group) {
      this.groupBy = await this.getGroupByCurrent(group);
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all"
      };
      this.updatePagination(searchObject);
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      const searchObject = {
        page,
        group_by,
        ungroup,
        group_items
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.getDataFromApi({ idParams, searchObject, isFirstCall: true });
    },
    async remove(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: row.id,
        isFieldArray: true
      };
      await this.removeRequestApi(data);
      close();
    },
    update(rowId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId
        },
        body: {
          [name]: value
        }
      };
      this.patchRequestApi(data);
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value
      };
      await this.updateReportRequest(data);
    },
    async getDataCharacter() {
      this.isLoadingGetCharacter = true;
      await this.getAllDataCharacterRequest({
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isLoadingGetCharacter = false;
    },
    async getDataIssues() {
      this.isLoadingGetIssue = true;
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      await this.getDataIssuesRequest({ matterId });
      this.isLoadingGetIssue = false;
    }
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const group = this.$route.query.group;
    this.fetchData(group);
    this.getAllDataCharacterRequest({ matterId });
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      this.fetchData(query.group);
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
