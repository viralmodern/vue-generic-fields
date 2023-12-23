<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search meeting"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchMeeting"
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
                dataMeetings[groupItem.groupID]
                ? dataMeetings[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataMeetings[groupItem.groupID]
                ? dataMeetings[groupItem.groupID].totals
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
              dataMeetings[groupItem.groupID]
                ? dataMeetings[groupItem.groupID].results
                : []"
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateMeeting(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <LabelsMeeting
                :tag="item.labels"
                :lengthDisplay="3"
                @onClickIcon="
                $_toggleMenuIssueMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
              "
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateMeeting(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.instruction="{ props: { item } }">
              <TextArea
                :value="item.instruction"
                @update="updateMeeting(item.id, 'instruction', $event)"
              />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <MembersMeeting
                :value="item.members"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                :isChooseInMeeting="true"
                @removeRow="updateMemberOrClientMeeting(item.id, 'workspace_members', 'remove',  $event)"
                @selectRow="updateMemberOrClientMeeting(item.id, 'workspace_members', 'post', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.client="{ props: { item } }">
              <ClientsMeeting
                textTooltip="Add Client"
                :value="item.client"
                :isLoadingGet="isLoadingGetClient"
                :isEmitOpenMenu="true"
                :isChooseInMeeting="true"
                @selectRow="updateMemberOrClientMeeting(item.id, 'clients','post', $event)"
                @removeRow="updateMemberOrClientMeeting(item.id,'clients', 'remove', $event)"
                @onOpenMenu="getDataClient"
              />
            </template>
            <template v-slot:item.from_time="{ props: { item } }">
              <ChooseFromToDateTimePicker
                :isActions="true"
                :isShowButtonClear="false"
                :title="item.from_time ? 'Update time' : 'Add time'"
                :date="item.from_time"
                :dateEnd="item.to_time"
                :nameButtonSubmit="item.from_time ? 'Update' : 'Add'"
                :colorButton="`${[item.from_time].some(x => !!x) ? 'indigo' : ''}`"
                @update="updateDateFromToMeeting(item.pk, 'from_time', 'to_time', $event)"
              />
            </template>
            <template v-slot:item.billable="{ props: { item } }">
              <Disputed
                :value="item.billable"
                @update="updateMeeting(item.id, 'billable', $event)"
              />
            </template>
            <template v-slot:item.length="{ props: { item } }">
              {{ moment().startOf('day')
              .seconds(item.length)
              .format('HH:mm:ss')}}
            </template>

            <template v-slot:item.inviteProgress="{ props: { item } }">
              <ProgressWithHover
                :list="item.inviteProgress"
                :total="item.totalProgress"
                nameProgress="name"
                keyProgress="progress"
                keyColor="color"
              />
            </template>
            <template
              v-slot:item.source="{ props: { item } }"
            >{{ item.is_civil_litigation ? "Civil" : "Meeting"}}</template>
            <template v-slot:item.priority="{ props: { item } }">
              <SelectCheckBox
                title="Priority"
                :value="item.priority"
                :dataList="appConfigs.priority"
                @update="updateMeeting(item.id, 'priority', $event.id)"
              />
            </template>
            <template v-slot:item.meeting_type="{ props: { item } }">
              <SelectCheckBox
                title="Type"
                keyText="label"
                keyValue="value"
                :value="item.meeting_type"
                :dataList="appConfigChoices[appConfigConstants.MEETING_TYPE]"
                @update="updateMeeting(item.id, 'meeting_type', $event.value)"
              />
            </template>
            <template v-slot:item.color="{ props: { item } }">
              <ChooseColorPicker2
                :color="item.color"
                @update="updateMeeting(item.id, 'color', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/legal-meetings/${item.pk}`"
                  routerMutation="ht_store/matter/meeting/updateDataMeeting"
                  :pk="item.id"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeMeeting(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateMeeting
                class="pt-4"
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
    <MenuLabelWorkSpace
      :labels="menuIssue.value"
      :isShowMenu="menuIssue.isShowMenu"
      :positionX="menuIssue.positionX"
      :positionY="menuIssue.positionY"
      :isLoadingGet="isLoadingGetDocumentLabel"
      @closeMenu="menuIssue.isShowMenu = false"
      @update="
        menuIssue.value = $event;
        updateMeeting(menuIssue.pk, 'labels', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ChooseFromToDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseFromToDateTimePicker";
import FormCreateMeeting from "./components/FormCreateMeeting";
import MembersMeeting from "./components/MembersMeeting";
import ClientsMeeting from "./components/ClientsMeeting";
import ChooseColorPicker2 from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseColorPicker2";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import ProgressWithHover from "@/sat-vue-toolkit/satlegal/ht_components/progress-bars/ProgressWithHover";
import LabelsMeeting from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-meeting/LabelsMeeting";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
//menu
import MenuLabelWorkSpace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-meeting/MenuLabelWorkSpace";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuLabelWorkSpaceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-meeting/mixins/toggleMenuILabelWorkSpaceMixin";
import moment from "moment";

export default {
  name: "static-pagination",
  mixins: [appConfigMixin, toggleMenuLabelWorkSpaceMixin],

  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    LabelsMeeting,
    Disputed,
    Action,
    TextField,
    ChooseFromToDateTimePicker,
    FormCreateMeeting,
    ButtonLoadMore,
    MembersMeeting,
    ChooseColorPicker2,
    SelectCheckBox,
    ClientsMeeting,
    ProgressWithHover,
    MenuLabelWorkSpace,
    BookmarkOrFlag,
    //form
    SearchInput
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Meeting Name", value: "name", active: true },
        { text: "Label", value: "labels", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Meeting Instruction", value: "instruction", active: true },
        { text: "Assigned Members", value: "members", active: true },
        // { text: "Location", value: "location", active: true }, Remove
        { text: "Assigned Clients", value: "client", active: true },
        { text: "Date and Time", value: "from_time", active: true },
        { text: "Source", value: "source", active: true },
        { text: "Priority", value: "priority", active: true },
        { text: "Type", value: "meeting_type", active: true },
        { text: "Status ", value: "status", active: true },
        { text: "Color", value: "color", active: true },
        { text: "Expense", value: "total_expense", active: true },
        { text: "Length", value: "length", active: true },
        { text: "Billable", value: "billable", active: true },
        { text: "Invite Progress", value: "inviteProgress", active: true },
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
          id: 3,
          field: "is_civil_litigation",
          title: "Source",
          list: []
        },
        {
          id: 4,
          field: "meeting_type",
          title: "Type",
          list: []
        },
        {
          id: 5,
          field: "matter",
          title: "Matter",
          list: []
        },
        {
          id: 6,
          field: "priority",
          title: "Priority",
          list: []
        },
        {
          id: 7,
          field: "billable",
          title: "Billable",
          list: []
        }
      ],
      isCallApiSourceGroupBy: false,
      isLoadingGetMember: false,
      isLoadingGetClient: false,
      isCallApiMemberCell: false,
      isCallApiClientCell: false,
      isLoadingGetDocumentLabel: false,
      isCallApiMemberGroupBy: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/meeting", ["dataMeetings", "isLoadingGet"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/matter", ["dataMatter"])
  },
  methods: {
    moment: function() {
      return moment();
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataMeetings[groupID]) return false;
      const totals = this.dataMeetings[groupID].totals;
      const results = this.dataMeetings[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchMeeting(text) {
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
    async removeMeeting(name, row, close) {
      const data = {
        name,
        meetingId: row.id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeMeetingRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {};
      return this.getDataMeetingRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateMeeting(meetingId, name, value) {
      const data = {
        idParams: {
          meetingId
        },
        body: {
          [name]: value
        }
      };
      this.updateMeetingRequest(data);
    },
    updateMemberOrClientMeeting(meetingId, name, method, value) {
      const data = {
        idParams: {
          meetingId
        }
      };
      if (method === "post") {
        data.body = {
          [name]: [value]
        };
        data.name = name === "clients" ? "client" : "members";
        this.postMembersMeetingRequest(data);
      } else {
        data.name = name === "clients" ? "client" : "members";
        data.keyDel = name === "clients" ? "client" : "user";
        data.valueDel = value;
        this.removeMembersMeetingRequest(data);
      }
    },
    updateDateFromToMeeting(meetingId, nameDateFrom, nameDateTo, value) {
      const data = {
        idParams: {
          meetingId
        },
        body: {
          from_time: value.timeFrom,
          to_time: value.timeTo
        }
      };
      this.updateDateFromToMeetingRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];

      switch (group) {
        case "matter":
          groupByCurrent.list = (this.dataMatter || []).map(x => {
            const dataMap = {
              id: x.id,
              groupID: x.id,
              value: x.id,
              text: x.title
            };
            return dataMap;
          });
          return groupByCurrent;
        case "billable":
          groupByCurrent.list = [
            { id: "False", groupID: "False", value: "False", text: "False" },
            { id: "True", groupID: "True", value: "True", text: "True" }
          ];
          return groupByCurrent;
        case "priority":
          groupByCurrent.list = [...this.appConfigs.priority, nullalbe].map(
            x => {
              return { id: x.id, groupID: x.id, value: x.id, text: x.name };
            }
          );
          return groupByCurrent;
        case "meeting_type":
          groupByCurrent.list = [...this.appConfigs.type, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataMeeting(query, isFirstCall) {
      this.groupBy = await this.getGroupByCurrent(query.group);
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
    async getDataMember() {
      if (!this.isCallApiMemberCell) {
        this.isCallApiMemberCell = true;
        try {
          this.isLoadingGetMember = true;
          await this.getWorkspaceMemberRequest();
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    async getDataClient() {
      if (!this.isCallApiClientCell) {
        this.isCallApiClientCell = true;
        try {
          this.isLoadingGetClient = true;
          await this.getDataClientsRequest();
          this.isLoadingGetClient = false;
        } catch (error) {
          this.isLoadingGetClient = false;
        }
      }
    },

    ...mapActions("ht_store/matter/meeting", [
      "getDataMeetingRequest",
      "postMeeting",
      "updateMeetingRequest",
      "updateDateFromToMeetingRequest",
      "removeMeetingRequest",
      "postMembersMeetingRequest",
      "removeMembersMeetingRequest"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/clients/clientsCommon", [
      "getWorkspaceMemberRequest"
    ]),
    ...mapActions("ht_store/project/clients", ["getDataClientsRequest"])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataMeeting(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getWorkspaceMemberRequest();
    this.getDataClientsRequest();
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataMeeting(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped></style>
