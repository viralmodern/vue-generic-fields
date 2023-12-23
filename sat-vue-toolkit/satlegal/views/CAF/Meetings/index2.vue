<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search meeting" />
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
                  dataMeeting[groupItem.groupID]
                    ? dataMeeting[groupItem.groupID].results.length
                    : 0
                }}
                Meetings</span
              >
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGrid
            hide-default-header
            hide-default-footer
            :headers="headersFilter"
            :desserts="
              dataMeeting[groupItem.groupID]
                ? dataMeeting[groupItem.groupID].results
                : []">
            <template v-slot:item.meetingName="{ props: { item } }">
              <TextField :value="item.meetingName" />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" />
            </template>
            <template v-slot:item.meetingInstruction="{ props: { item } }">
              <TextArea :value="item.meetingInstruction" />
            </template>
            <template v-slot:item.dateTime="{ props: { item } }">
              <ChooseDateTimePicker
                :isActions="true"
                :isShowButtonClear="false"
                :title="item.dateTime ? 'Update time' : 'Add time'"
                :date="item.dateTime"
                :nameButtonSubmit="item.dateTime ? 'Update' : 'Add'"
                :colorButton="`${[item.dateTime].some(x => !!x) ? 'indigo' : ''}`"
              />
            </template>
            <template v-slot:item.billable="{ props: { item } }">
              <Disputed :value="item.billable" />
            </template>
            <template v-slot:item.inviteProgress="{ props: { item } }">
              <Range :value="item.inviteProgress" />
            </template>
            <template v-slot:item.label="{ props: { item } }">
              <Label
                :value="item.label"
                @update="updateFacts(groupBy.groupID, item.id, 'subjects', $event)"
                @onOpenMenu="getDataLabelsRequest({ matterId:$route.params.matter || $route.params.projectId})"
              />
            </template>
            <template v-slot:item.priority="{ props: { item } }">
              <SelectInline
                :item="priority.find(f => f.id === item.priority)"
                :items="priority"
                keyText="text"
                keyColor="color"
                @select="select"
              />
            </template>
            <template v-slot:item.type="{ props: { item } }">
              <SelectInline
                :item="type.find(f => f.id === item.type)"
                :items="type"
                keyText="text"
                keyColor="color"
                @select="select"
              />
            </template>
            <template v-slot:item.status="{ props: { item } }">
              <SelectInline
                :item="status.find(f => f.id === item.status)"
                :items="status"
                keyText="text"
                keyColor="color"
                @select="select"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <v-btn
                  class="ma-0"
                  icon
                  small
                >
                  <v-icon small :color="item.bookmarked_pk ? 'success' : 'grey'">bookmark</v-icon>
                </v-btn>
                <Action :item="item"/>
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
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import { priority, type, status } from "./configs";
// cells component
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import SelectInline from "@/sat-vue-toolkit/satlegal/ht_components/menus/SelectInline";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import FormCreateMeeting from "./components/FormCreateMeeting";

export default {
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    SelectInline,
    Label,
    Disputed,
    Range,
    Action,
    TextField,
    ChooseDateTimePicker,
    FormCreateMeeting,
    ButtonLoadMore
  },
  data() {
    return {
      priority,
      type,
      status,
      panel: [0],
      headers: [
        { text: "Meeting Name", value: "name", active: true },
        { text: "Label", value: "label", active: true },
        { text: "Description", value: "desc", active: true },
        {
          text: "Meeting Instruction",
          value: "meetingInstruction",
          active: true
        },
        { text: "Assigned Members", value: "assignedMembers", active: true },
        { text: "Location", value: "location", active: true },
        { text: "Assigned Clients", value: "assignedClients", active: true },
        { text: "Date and Time", value: "dateTime", active: true },
        { text: "Source", value: "source", active: true },
        { text: "Priority", value: "priority", active: true },
        { text: "Type", value: "type", active: true },
        { text: "Status ", value: "status", active: true },
        { text: "Color", value: "color", active: true },
        { text: "Expense", value: "expense", active: true },
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
          id: 2,
          field: "assigned_members",
          title: "Assigned Members",
          list: []
        },
        {
          id: 3,
          field: "location",
          title: "Location",
          list: []
        },
        {
          id: 4,
          field: "source",
          title: "Source",
          list: []
        },
        {
          id: 5,
          field: "type",
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
          field: "status",
          title: "Status",
          list: []
        },
        {
          id: 7,
          field: "priority",
          title: "Priority",
          list: []
        },
        {
          id: 8,
          field: "billable ",
          title: "Billable ",
          list: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/meeting", ["dataMeeting"]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    }
  },
  methods: {
    ...mapActions("ht_store/matter/meeting", [
      "getMeetingRequest",
      "postMeeting",
      "patchMeeting",
      "deleteMeeting"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),

    isShowButtonLoadMore(groupID) {
      if (!this.dataRFP[groupID]) return false;
      const totals = this.dataRFP[groupID].totals;
      const results = this.dataRFP[groupID].results;
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
    select() {},
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      // const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "favorable":
          groupByCurrent.list = type.map(x => {
            return { id: x.id, groupID: x.id, text: x.name };
          });
          return groupByCurrent;
        default:
          groupByCurrent.list.push({ id: 1, groupID: "all", text: "" });
          return groupByCurrent;
      }
    },
    async getDataMeetingFromApi(group) {
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
      this.getMeetingRequest({ idParams, searchObject });
    }
  },
  mounted() {
    const group = this.$route.query.group;
    this.getDataMeetingFromApi(group);
  },
  watch: {
    "$route.query"(query) {
      this.getDataMeetingFromApi(query.group);
    }
  }
};
</script>

<style scoped></style>
