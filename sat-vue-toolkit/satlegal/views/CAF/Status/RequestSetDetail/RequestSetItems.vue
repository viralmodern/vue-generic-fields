<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search request item name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRSI"
        />
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="onChangeGroupBy"
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
                Request item slick grid
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
            <template v-slot:item.name="{ props: { item } }">
              <TextArea :value="item.name" @update="updateRequestItem(item, 'name', $event)" />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <Members :value="item.members" @update="updateRequestItem(item, 'members', $event)" />
            </template>
            <template v-slot:item.priority="{ props: { item } }">
              <SelectCheckBox
                title="Request Set Priority"
                :value="item.priority"
                :dataList="appConfigs.listPriority"
                @update="updateRequestItem(item, 'priority', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.response_status="{ props: { item } }">
              <SelectCheckBox
                title="Response status"
                :value="item.response_status"
                :dataList="appConfigs.responseStatus"
                @update="updateRequestItem(item, 'response_status', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.request_status="{ props: { item } }">
              <SelectCheckBox
                title="Request status"
                :value="item.request_status"
                :dataList="appConfigs.requestStatus"
                @update="updateRequestItem(item, 'request_status', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.under_oauth="{ props: { item } }">
              <Disputed
                :value="item.under_oauth"
                @update="updateRequestItem(item, 'under_oauth', $event)"
              />
            </template>
            <template v-slot:item.objection="{ props: { item } }">
              <Disputed
                :value="item.objection ? true : false"
                @update="updateRequestItem(item, 'objection', $event)"
              />
            </template>
            <template v-slot:item.req_desc="{ props: { item } }">
              <TextArea
                :value="item.req_desc"
                @update="updateRequestItem(item, 'req_desc', $event)"
              />
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{item.attachments.length}}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.deadline="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.deadline | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.deadline"
                  :textTooltip="
                  [item.deadline].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.deadline)}`
                    : 'Add date'
                "
                  :colorButton="`${[item.date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updateRequestItem(item, 'deadline', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.privilege_invoke="{ props: { item } }">
              <Disputed
                :value="item.privilege_invoke || false"
                @update="updateRequestItem(item, 'privilege_invoke', $event)"
              />
            </template>
            <template v-slot:item.res_desc="{ props: { item } }">
              <TextArea
                :value="item.res_desc"
                @update="updateRequestItem(item, 'res_desc', $event)"
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes :totalNotes="item.total_notes" :rSId="item.request_set" :rowId="item.pk" />
            </template>
            <template v-slot:item.countdown="{ props: { item } }">
              <Countdown :expired="item.deadline" />
              <!-- <CountdownTime :timeDeadline="item.deadline"/> -->
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/request-sets/${$route.params.requestSetId}/items/${item.pk}`"
                  routerMutation="ht_store/matter/requestStatus/requestItem/patchRequestApi"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Action :item="item" @remove="remove(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(item.id, groupItem.groupID)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRequestItem
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
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="this.requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
    />
    <RequestSetItemDetail
      :isShow="showDetailRight"
      title="Client Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :itemsId="itemsId"
      @remove="removeDetail($event.item, $event.close)"
      @updateReports="updateReports($event.pk, $event.value)"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";

// cells component
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Attachments from "../components/TdAttachmentRequestItem";
import Notes from "../components/TdNotesRequestItem";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import RequestSetItemDetail from "../components/RequestSetItemDetail/index";

import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Countdown from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/CountDown";
import FormCreateRequestItem from "../components/FormCreateRequestItem";
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
    TextArea,
    SelectCheckBox,
    DatePicker,
    Action,
    ButtonLoadMore,
    Disputed,
    Attachments,
    Notes,
    Countdown,
    Members,
    FormCreateRequestItem,
    AddIcon,
    RequestSetItemDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGetIssue: false,
      panel: [0],
      isShowCreate: false,
      headers: [
        { text: "Name", value: "name", active: true },
        { text: "Request Number", value: "pk", active: true },
        { text: "Assigned Members", value: "members", active: true },
        { text: "Request Priority", value: "priority", active: true },
        { text: "Response Status", value: "response_status", active: true },
        { text: "Request Status", value: "request_status", active: true },
        { text: "Under Oath?", value: "under_oauth", active: true },
        {
          text: "Request Item Description",
          value: "req_desc",
          active: true
        },
        { text: "Objection?", value: "objection", active: true },
        {
          text: "Deadline",
          value: "deadline",
          active: true
        },
        { text: "Privilege Invoke?", value: "privilege_invoke", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Countdown", value: "countdown", active: true },
        {
          text: "Response Item Description",
          value: "res_desc",
          active: true
        },
        { text: "Note", value: "total_notes", active: true },
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
          field: "request_set__request_to",
          title: "Request To",
          list: []
        },
        {
          id: 3,
          field: "request_set__request_from",
          title: "Request from",
          list: []
        },
        {
          id: 4,
          field: "legal_issues",
          title: "Legal Issues",
          list: []
        },
        {
          id: 5,
          field: "priority",
          title: "Priority",
          list: []
        }
      ],
      isCallApiGroupBy: false,
      requestForProductionId: 0,
      isShowPopupAttachment: false,
      isCallApiIssueGroupBy: false,
      isCallApiCharacterGroupBy: false,
      itemsId: 0,
      isLoadingGetDetail: false,
      showDetailRight: false,
      isClickOutSidePopupDetail: false,
      groupId: ""
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/requestStatus/requestItem", [
      "dataList",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    setStatus(status) {
      this.showDetailRight = status;
    },
    async showDetail(pk, groupId) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          pk
        };
        await this.getRequestItemDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.groupId = groupId;
      this.itemsId = pk;
    },
    async removeDetail(row, close) {
      await this.remove(this.groupId, row, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "getDataFromApi",
      "patchRequestApi",
      "removeRequestApi",
      "getRequestItemDetailRequest",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapMutations("ht_store/matter/requestStatus/requestItem", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"]),
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

      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
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
        case "request_set__request_to":
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

        case "request_set__request_from":
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
        rSId: this.$route.params.requestSetId
      };
      return this.getDataFromApi({ idParams, searchObject, isFirstCall });
    },
    async remove(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rSId: this.$route.params.requestSetId,
        rowId: row.id || row.pk
      };
      await this.removeRequestApi(data);
      close();
      return data;
    },
    updateRequestItem(item, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: item.pk,
          rSId: this.$route.params.requestSetId
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
          rowId: pk,
          rSId: this.$route.params.requestSetId
        },
        body: value,
        detail: this.showDetailRight
      };
      await this.updateReportRequest(data);
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataList[groupID]) return false;
      const totals = this.dataList[groupID].totals;
      const results = this.dataList[groupID].results;
      return totals > 20 && totals > results.length;
    },
  },
  mounted() {
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
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
