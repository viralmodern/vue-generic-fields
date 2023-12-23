<template>
  <v-container fluid>
    <v-card flat class="mb-4" ref="headerSlickTable">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRequestSetTask"
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
                dataRequestSetTask[groupItem.groupID]
                ? dataRequestSetTask[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataRequestSetTask[groupItem.groupID]
                ? dataRequestSetTask[groupItem.groupID].totals
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
            :fixedHeader="false"
            :headers="headersFilter"
            :desserts="
              dataRequestSetTask[groupItem.groupID]
                ? dataRequestSetTask[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.deadline="{ props: { item } }">
              <ChooseDatePicker
                :date="item.deadline"
                :isFormatChooseISOString="false"
                @update="updateRequestSetTask(item.request_set.pk, item.pk, 'deadline', $event)"
              />
            </template>

            <template v-slot:item.litigation="{ props: { item } }">
              <ChipJoinMenuSelectBox
                text
                :value="item.litigation"
                keyValue="code"
                :dataList="appConfigs.litigationCode"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Litigation Code',
                    name: 'litigation',
                    pk: item.pk,
                    keyValue: 'code',
                    value: item.litigation,
                    dataList: appConfigs.litigationCode
                  })
                  requestSetId = item.request_set.pk
                "
              />
            </template>
            <template v-slot:item.status="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.status"
                keyValue="value"
                :dataList="appConfigs.taskStatus"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Status',
                    name: 'status',
                    pk: item.pk,
                    keyValue: 'value',
                    value: item.status,
                    dataList: appConfigs.taskStatus
                  })
                  requestSetId = item.request_set.pk
                "
              />
            </template>
            <template v-slot:item.activities="{ props: { item } }">
              <ChipJoinMenuSelectBox
                text
                :value="item.activities"
                keyValue="code"
                :dataList="appConfigs.activitiesCode"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Activities Code',
                    name: 'activities',
                    pk: item.pk,
                    keyValue: 'code',
                    value: item.activities,
                    dataList: appConfigs.activitiesCode
                  })
                  requestSetId = item.request_set.pk
                "
              />
            </template>

            <template v-slot:item.time="{ props: { item } }">
              <TimePicker
                :value="item.time"
                @update="updateRequestSetTask(item.request_set.pk, item.pk, 'time', $event)"
              />
            </template>

            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes
                :totalNotes="item.total_notes"
                :matterId="$route.params.matter || $route.params.projectId"
                :requestSetId="item.request_set.pk"
                :requestSetTaskId="item.pk"
              />
            </template>

            <!-- <template v-slot:item.members="{ props: { item } }">
              <Members
                :value="item.members"
                @update="updateRequestSetTask(item.request_set.pk, item.pk, 'members', $event)"
              />
            </template>-->

            <template v-slot:item.attachments="{ props: { item } }">
              {{ item.attachments.length }}
              <AddIcon @onClickIcon="onShowPopupAttachment(item)" icon="mdi-attachment" />
            </template>

            <template v-slot:item.request_set="{ props: { item } }">
              <span class="text-caption text-no-wrap">
                {{
                item.request_set.name
                }}
              </span>
            </template>

            <template v-slot:item.request_items="{ props: { item } }">
              <ChipInlineList
                textNoData="(No request set items)"
                :value="item.request_items || []"
                :lengthDisplay="2"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuRequestSetItemDetailMixin_openMenu({
                    ...$event,
                    name: 'request_items',
                    pk: item.pk,
                    value: item.request_items,
                    matterId:$route.params.matter || $route.params.projectId,
                    requestSetId: item.request_set.pk,
                    isCallApi: true
                  })
                "
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :requestSetId="item.request_set.pk"
                :requestSetTaskId="item.pk"
              />
            </template>

            <template v-slot:item.name="{ props: { item } }">
              <TextInline
                textNodata="(No task name)"
                :value="item.name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Task name',
                    name: 'name',
                    pk: item.pk,
                    value: item.name
                  })
                  requestSetId = item.request_set.pk
                "
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <div style="width:350px">
                <RichTextArea
                  :value="item.desc"
                  @update="updateRequestSetTask(item.request_set.pk, item.pk, 'desc', $event)"
                />
              </div>
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <Action
                  :item="item"
                  @remove="removeRequestSetTask(groupItem.groupID, item, $event)"
                />
                <v-btn
                  exact
                  icon
                  small
                  @click="showDetail(item.pk, item.request_set && item.request_set.pk)"
                >
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateRequestTask
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
              />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                ref="refLoadMore"
                v-if="isShowButtonLoadMore(groupItem.groupID)"
                @onPageChanged="loadMore($event, groupItem)"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-if="groupBy.totals > 20" class="text-right text-center mt-2">
      <v-pagination
        :value="groupBy.page"
        :length="groupBy.totals / 20 | numberCeil"
        circle
        @input="onPagingListGroupBy"
      ></v-pagination>
    </div>
    <MenuSelectCheckBox
      :title="menuSelectBox.title"
      :keyValue="menuSelectBox.keyValue"
      :keyText="menuSelectBox.keyText"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="menuSelectBox.dataList"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event[menuSelectBox.keyValue];
        menuSelectBox.isShowMenu = false;
        updateRequestSetTask(
          requestSetId,
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
      "
    />
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestSetId="this.requestSetId"
      :requestSetTaskId="this.requestSetTaskId"
      @closePopup="isShowPopupAttachment = false"
    />

    <MenuTextField
      width="350"
      :title="textFieldMenu.title"
      placeholder="Enter text"
      :value="textFieldMenu.value"
      :isShowMenu="textFieldMenu.isShowMenu"
      :positionX="textFieldMenu.positionX"
      :positionY="textFieldMenu.positionY"
      @closeMenu="textFieldMenu.isShowMenu = false"
      @update="
        textFieldMenu.value = $event;
        updateRequestSetTask(requestSetId, textFieldMenu.pk, textFieldMenu.name, $event);
      "
    />
    <MenuRelatedRequestSetItemDetail
      keyId="pk"
      :matterId="relatedRequestSetItemDetailMenu.matterId"
      :requestSetId="relatedRequestSetItemDetailMenu.requestSetId"
      :value="relatedRequestSetItemDetailMenu.value"
      :isShowMenu="relatedRequestSetItemDetailMenu.isShowMenu"
      :positionX="relatedRequestSetItemDetailMenu.positionX"
      :positionY="relatedRequestSetItemDetailMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItemDetail"
      @select="
        $_toggleMenuRequestSetItemDetailMixin_addValue($event);
        updateRequestSetTask(
          relatedRequestSetItemDetailMenu.requestSetId,
          relatedRequestSetItemDetailMenu.pk,
          relatedRequestSetItemDetailMenu.name,
          relatedRequestSetItemDetailMenu.value,
          relatedRequestSetItemDetailMenu.detail
        );
      "
      @remove="
        $_toggleMenuRequestSetItemDetailMixin_removeValue($event);
        removeRequestItemInTask(
          relatedRequestSetItemDetailMenu.requestSetId,
          relatedRequestSetItemDetailMenu.pk,
          $event.pk,
          relatedRequestSetItemDetailMenu.detail
        );
      "
    />
    <RequestSetTaskDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :requestSetId="requestSetId"
      @testEmit="$_toggleMenuRequestSetItemDetailMixin_openMenu"
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
import { NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import ChooseDatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDatePicker";
import TimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/TimePicker";
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
// import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";

//form
import FormCreateRequestTask from "./components/request-task/FormCreateRequestTask";
import Notes from "./components/request-task/Notes";
import Attachments from "./components/request-task/Attachments";
import Comments from "./components/request-task/Comments";
//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuRelatedRequestSetItemDetail from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/request-set-item-detail/MenuRelatedRequestSetItemDetail";

//mixins
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuRequestSetItemDetailMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/request-set-item-detail/mixins/toggleMenuRequestSetItemDetailMixin";
import RequestSetTaskDetail from "./components/request-task/Detail/index";
import { numberCeil } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
  filters: {
    numberCeil
  },
  mixins: [
    toggleMenuSelectBox,
    appConfigMixin,
    toggleMenuTextField,
    toggleMenuRequestSetItemDetailMixin
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TimePicker,
    ChooseDatePicker,
    RichTextArea,
    // Flag,
    Action,
    FormCreateRequestTask,
    ButtonLoadMore,
    Notes,
    Attachments,
    Comments,
    MenuSelectCheckBox,
    ChipJoinMenuSelectBox,
    AddIcon,
    TextInline,
    ChipInlineList,

    //menus
    MenuTextField,
    MenuRelatedRequestSetItemDetail,
    RequestSetTaskDetail
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Task Name", value: "name", active: true },
        { text: "Request Set", value: "request_set", active: true },
        { text: "Request Item", value: "request_items", active: true },
        { text: "Request Number", value: "pk", active: true },
        { text: "Deadline", value: "deadline", active: true },
        { text: "Description", value: "desc", active: true },
        // { text: "Members", value: "members", active: true },
        { text: "Litigation code", value: "litigation", active: true },
        { text: "Activities code", value: "activities", active: true },
        { text: "Current Expense", value: "total_expense", active: true },
        { text: "Time log", value: "time", active: true },
        { text: "Status", value: "status", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Note", value: "total_notes", active: true },
        { text: "Comment", value: "total_comments", active: true },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
        {
          id: 2,
          field: "litigation",
          title: "Litigation",
          list: []
        },
        {
          id: 3,
          field: "activities",
          title: "Activities",
          list: []
        },
        {
          id: 4,
          field: "status",
          title: "Status",
          list: []
        },
        {
          id: 5,
          field: "request_set",
          title: "Request Set",
          list: [],
          totals: 0,
          page: 1
        },
        {
          id: 6,
          field: "request_items",
          title: "Request Item",
          list: [],
          totals: 0,
          page: 1
        }
      ],
      requestSetId: 0,
      requestSetTaskId: 0,
      //attachment
      isShowPopupAttachment: false,
      showDetailRight: false,
      isClickOutSidePopupDetail: true,
      isLoadingGetDetail: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/requestStatus/requestSetTask", [
      "dataRequestSetTask",
      "isLoadingGet",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(pk, rSId) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId,
          pk
        };
        await this.getRequestSetTaskDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.requestSetId = pk;
    },
    onPagingListGroupBy(page) {
      const query = this.$route.query;
      const groupBy = this.groupByList.find(x => x.field === query.group);
      groupBy.page = page;
      this.getDataRequestSetTask(query);
      this.$nextTick(() => {
        this.$refs.headerSlickTable.$el.scrollIntoView({
          top: 0,
          behavior: "smooth"
        });
      });
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    onShowPopupAttachment(item) {
      this.requestSetTaskId = item.pk;
      this.requestSetId = item.request_set.pk;
      this.getDataAttachments(item.attachments);
      this.isShowPopupAttachment = true;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRequestSetTask[groupID]) return false;
      const totals = this.dataRequestSetTask[groupID].totals;
      const results = this.dataRequestSetTask[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchRequestSetTask(text) {
      const query = {
        ...this.$route.query,
        name: text
      };
      this.changeQueryRouter(query);
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
    async removeRequestSetTask(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: row.request_set.pk,
        requestSetTaskId: row.pk
      };
      await this.removeRequestSetTaskRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataRequestSetTaskRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRequestSetTask(requestSetId, requestSetTaskId, name, value, detail = false) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId,
          requestSetTaskId
        },
        body: {
          [name]: value
        },
        detail
      };
      this.updateRequestSetTaskRequest(data);
    },

    removeRequestItemInTask(requestSetId, requestSetTaskId, requestItemId, detail = false) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId,
        requestSetTaskId,
        requestItemId,
        detail
      };
      this.removeRequestItemInTaskRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(
      group,
      resetPageListGroupBy = { isReset: false, pageReset: 1 }
    ) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      if (resetPageListGroupBy.isReset) {
        groupByCurrent.page = resetPageListGroupBy.pageReset;
      }
      switch (group) {
        case "litigation":
          groupByCurrent.list = this.appConfigs.litigationCode.map(x => {
            return {
              id: x.code,
              groupID: x.code,
              value: x.code,
              text: x.name
            };
          });
          return groupByCurrent;
        case "activities":
          groupByCurrent.list = this.appConfigs.activitiesCode.map(x => {
            return {
              id: x.code,
              groupID: x.code,
              value: x.code,
              text: x.name
            };
          });
          return groupByCurrent;
        case "status":
          groupByCurrent.list = this.appConfigs.taskStatus.map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.name
            };
          });
          return groupByCurrent;
        case "request_set": {
          const query = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId
            },
            searchObject: {
              ungroup: true,
              page: groupByCurrent.page
            },
            isFirstCall: true
          };
          const result = await this.getDataFromApi(query);
          const dataRequestSet = result.all.results;
          groupByCurrent.totals = result.all.totals;
          groupByCurrent.list = dataRequestSet.map(x => {
            const dataMap = {
              id: x.pk,
              groupID: x.pk,
              value: {
                pk: x.pk,
                name: x.name
              },
              text: x.name
            };
            return dataMap;
          });
          return groupByCurrent;
        }
        case "request_items": {
          const query = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId
            },
            searchObject: {
              ungroup: true,
              page: groupByCurrent.page
            },
            isFirstCall: true
          };
          const result = await this.getAllDataRequestItemNoGroupByRequest(
            query
          );
          const dataRequestSetItem = result.results;
          groupByCurrent.totals = result.count;
          groupByCurrent.list = dataRequestSetItem.map(x => {
            const dataMap = {
              id: x.pk,
              groupID: x.pk,
              value: x.pk,
              text: x.name,
              isAddInGroupByRequestItem: true,
              parentRequestSetId: x.request_set
            };
            return dataMap;
          });
          return groupByCurrent;
        }
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataRequestSetTask(query, isFirstCall, resetPageListGroupBy) {
      this.groupBy = await this.getGroupByCurrent(
        query.group,
        resetPageListGroupBy
      );
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all",
        ...query
      };
      this.updatePagination(searchObject, isFirstCall);
    },
    ...mapMutations("ht_store/matter/requestStatus/requestSetTask", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/requestStatus/requestSetTask", [
      "getDataRequestSetTaskRequest",
      "updateRequestSetTaskRequest",
      "removeRequestSetTaskRequest",
      "removeRequestItemInTaskRequest",
      "getRequestSetTaskDetailRequest"
    ]),
    ...mapActions("ht_store/matter/requestStatus/requestSet", [
      "getDataFromApi"
    ]),
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "getAllDataRequestItemNoGroupByRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataRequestSetTask(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataRequestSetTask(query, true, {
          isReset: true,
          pageReset: 1
        });
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>
