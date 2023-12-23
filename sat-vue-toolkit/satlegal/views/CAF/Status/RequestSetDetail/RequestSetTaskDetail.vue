<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search" />
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="changeQueryRouter($event.field)"
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
    <v-expansion-panels
      class="v-expansion-panels--custom"
      multiple
      v-model="panel"
    >
      <v-expansion-panel
        style="width:100vh"
        v-for="(groupItem, i) in groupBy.list"
        :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">
              {{ groupItem.text }}
            </div>
            <div class="flex-grow-1"></div>
            <v-chip
              class="ml-2 text-body-2 badge"
              small
              style="position:sticky; right: 40px;"
            >
              <span class="font-weight-bold mr-2"
                >{{
                  dataRequestSetTask[groupItem.groupID]
                    ? dataRequestSetTask[groupItem.groupID].results.length
                    : 0
                }}
                of {{
                  dataRequestSetTask[groupItem.groupID]
                    ? dataRequestSetTask[groupItem.groupID].totals
                    : 0
                }} items</span
              >
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
                @update="updateRequestSetTask(item.pk, 'deadline', $event)"
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
                "
              />
            </template>
            <template v-slot:item.method="{ props: { item } }">
              <SelectCheckBox
                title="Deponent Method"
                :value="item.method"
                keyValue="value"
                :dataList="[
                  { ...NA, value: NA.id },
                  ...appConfigs.depositionMethod
                ]"
                @update="updateRequestSetTask(item.pk, 'method', $event.value)"
              />
            </template>

            <template v-slot:item.time="{ props: { item } }">
              <TimePicker
                :value="item.time"
                @update="updateRequestSetTask(item.pk, 'time', $event)"
              />
            </template>

            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes
                :totalNotes="item.total_notes"
                :matterId="$route.params.matter || $route.params.projectId"
                :requestSetId="item.request_set"
                :requestSetTaskId="item.pk"
              />
            </template>

            <template v-slot:item.members="{ props: { item } }">
              <Members
                :value="item.members"
                @update="updateRequestSetTask(item.pk, 'members', $event)"
              />
            </template>

            <template v-slot:item.attachments="{ props: { item } }">
              <!-- <Attachments
                class="text-no-wrap"
                :value="item.attachments"
                :matterId="$route.params.matter || $route.params.projectId"
                :requestSetId="item.request_set"
                :requestSetTaskId="item.pk"
              /> -->
              {{item.attachments.length}}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item)"
                icon="mdi-attachment"
              />
            </template>

            <template v-slot:item.request_item_id="{ props: { item } }">
               <RequestItemMenu
                single
                :value="item.request_item_id"
                @update="updateRequestSetTask(item.pk, 'request_item_id', $event.pk)"
               />
            </template>

            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :requestSetId="item.request_set"
                :requestSetTaskId="item.pk"
              />
            </template>

            <template v-slot:item.name="{ props: { item } }">
              <Flag
                class="mr-2"
                :value="item.flag"
                :valueBookmark="!!item.bookmarked_pk"
                @update="updateRequestSetTask(item.pk, 'flag', !item.flag)"
                @updateBookmark="
                  updateRequestSetTask(
                    item.pk,
                    'bookmarked_pk',
                    !item.bookmarked_pk
                  )
                "
                @showDetail="showDetail(item.pk)"
                :isShowDetail="true"
                :isShowBookmark="true"
              />
              <TextField
                :value="item.name"
                @update="updateRequestSetTask(item.pk, 'name', $event)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <div style="width:350px">
                <RichTextArea
                  :value="item.desc"
                  @update="updateRequestSetTask(item.pk, 'desc', $event)"
                />
              </div>
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <Action
                :item="item"
                @remove="removeRequestSetTask(groupItem.groupID, item, $event)"
              />
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
        updateRequestSetTask(menuSelectBox.pk, menuSelectBox.name, $event[menuSelectBox.keyValue])
      "
    />
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestSetTaskId="this.requestSetTaskId"
      @closePopup="isShowPopupAttachment = false;"
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
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import RequestItemMenu from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RequestItemMenu";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
//form
import FormCreateRequestTask from "../components/request-set/task/FormCreateRequestTask";
import Notes from "../components/request-set/task/Notes";
import Attachments from "../components/request-set/task/Attachments";
import Comments from "../components/request-set/task/Comments";
//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";

//mixins
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";


export default {
  mixins: [toggleMenuSelectBox, appConfigMixin],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TimePicker,
    ChooseDatePicker,
    TextField,
    RichTextArea,
    Flag,
    Action,
    Members,
    FormCreateRequestTask,
    ButtonLoadMore,
    SelectCheckBox,
    Notes,
    Attachments,
    Comments,
    RequestItemMenu,
    MenuSelectCheckBox,
    ChipJoinMenuSelectBox,
    AddIcon,
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Task Name", value: "name", active: true },
        { text: "Request Set", value: "request_set", active: true },
        { text: "Request Item", value: "request_item_id", active: true },
        { text: "Request Number", value: "request_number", active: true },
        { text: "Deadline", value: "deadline", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Members", value: "members", active: true },
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
        }
      ],
      requestSetTaskId: 0,
      //attachment
      isShowPopupAttachment: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/requestStatus/requestSet/task", [
      "dataRequestSetTask",
      "isLoadingGet",
      "factDetail",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onShowPopupAttachment(item) {
      this.requestSetTaskId = item.pk;
      this.getDataAttachments(item.attachments);
      this.isShowPopupAttachment = true;
    },
    showDetail(requestSetTaskId) {
      this.$router.push({
        name: "detailRequestSetTask",
        params: {
          requestSetTaskId
        }
      });
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRequestSetTask[groupID]) return false;
      const totals = this.dataRequestSetTask[groupID].totals;
      const results = this.dataRequestSetTask[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(group) {
      this.$router.push({
        path: this.$route.path,
        query: { group }
      });
    },
    async loadMore({ page, setLoading }, groupItem) {
      setLoading(true);
      await this.updatePagination({
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
        requestSetId: 3,
        requestSetTaskId: row.pk
      };
      await this.removeRequestSetTaskRequest(data);
      close();
    },
    async updatePagination(
      { page, ungroup, group_by, group_items },
      isFirstCall
    ) {
      const searchObject = {
        page,
        group_by,
        ungroup,
        group_items
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: 3
      };
      return this.getDataRequestSetTaskRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRequestSetTask(requestSetTaskId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: 3,
          requestSetTaskId
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestSetTaskRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
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
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataRequestSetTask(group, isFirstCall) {
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
      this.updatePagination(searchObject, isFirstCall);
    },
    ...mapMutations("ht_store/matter/requestStatus/requestSet/task", ["getDataAttachments"]),
    ...mapActions("ht_store/matter/requestStatus/requestSet/task", [
      "getDataRequestSetTaskRequest",
      "updateRequestSetTaskRequest",
      "removeRequestSetTaskRequest",
      "getFactDetailRequest",
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const group = this.$route.query.group;
    if (this.checkExistGroupBy) {
      this.getDataRequestSetTask(group, true);
    } else {
      this.changeQueryRouter("all");
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataRequestSetTask(query.group, true);
      } else {
        this.changeQueryRouter("all");
      }
    }
  }
};
</script>
