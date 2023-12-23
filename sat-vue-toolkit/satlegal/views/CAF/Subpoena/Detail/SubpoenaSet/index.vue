<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search Subpoena"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchSubpoena"
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
                dataSubpoenas[groupItem.groupID]
                ? dataSubpoenas[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataSubpoenas[groupItem.groupID]
                ? dataSubpoenas[groupItem.groupID].totals
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
              dataSubpoenas[groupItem.groupID]
                ? dataSubpoenas[groupItem.groupID].results
                : []"
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateSubpoena(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.creator="{ props: { item } }">
              <CreatedBy :members="members" :value="item" keyText="creator" />
            </template>
            <template v-slot:item.investigators="{ props: { item } }">
              <Members
                :value="item.investigators"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateSubpoena(item.id, 'investigators', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.party="{ props: { item } }">
              <CharacterSingles
                textTooltip="List characters"
                :value="item.party"
                @update="updateSubpoena(item.id, 'party', $event)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateSubpoena(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.service_status="{ props: { item } }">
              <SelectCheckBox
                title="Service Status"
                keyText="label"
                keyValue="value"
                :value="item.service_status"
                :dataList="appConfigChoices[appConfigConstants.SUBPOENA_SERVICE_STATUS]"
                @update="updateSubpoena(item.id, 'service_status', $event.value)"
              />
            </template>
            <template v-slot:item.jurisdiction="{ props: { item } }">
              <SelectStateAndCountry
                title="Select state and country"
                nameButtonSubmit="Save"
                :isActions="true"
                :valueStateAndCountry="item.jurisdiction || {}"
                :listState="appConfigChoices[appConfigConstants.SUBPOENA_STATE]"
                :listCountry="appConfigChoices[appConfigConstants.SUBPOENA_COUNTRY]"
                @update="updateSubpoena(item.id, 'jurisdiction', $event)"
              />
            </template>
            <template v-slot:item.proof_of_service="{ props: { item } }">
              <AttachmentLink
                :value="item.proof_of_service"
                @updateAsync="updateSubpoenaAsync(item.id, 'proof_of_service', $event)"
              />
            </template>
            <template v-slot:item.hardness="{ props: { item } }">
              <SelectCheckBox
                title="Hardness"
                keyText="label"
                keyValue="value"
                :value="item.hardness"
                :dataList="appConfigChoices[appConfigConstants.SUBPOENA_HARDNESS]"
                @update="updateSubpoena(item.id, 'hardness', $event.value)"
              />
            </template>
            <template v-slot:item.response_status="{ props: { item } }">
              <SelectCheckBox
                title="Response Status"
                keyText="label"
                keyValue="value"
                :value="item.response_status"
                :dataList="appConfigChoices[appConfigConstants.SUBPOENA_RESPONSE_STATUS]"
                @update="updateSubpoena(item.id, 'response_status', $event.value)"
              />
            </template>
            <template v-slot:item.date_served="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.date_served | formatShortDate }}</div>
                <DatePicker
                  title="Date Served"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.date_served"
                  :textTooltip="
                    [item.date_served].some(x => !!x)
                      ? `${$options.filters.formatShortDate(item.date_served)}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="`${[item.date_served].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateSubpoena(item.id, 'date_served', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.objection_deadline="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.objection_deadline | formatShortDate }}</div>
                <DatePicker
                  title="Date Served"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.objection_deadline"
                  :textTooltip="
                    [item.objection_deadline].some(x => !!x)
                      ? `${$options.filters.formatShortDate(item.objection_deadline)}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="`${[item.objection_deadline].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateSubpoena(item.id, 'objection_deadline', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.producing_deadline="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.producing_deadline | formatShortDate }}</div>
                <DatePicker
                  title="Date Served"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.producing_deadline"
                  :textTooltip="
                    [item.producing_deadline].some(x => !!x)
                      ? `${$options.filters.formatShortDate(item.producing_deadline)}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="`${[item.producing_deadline].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateSubpoena(item.id, 'producing_deadline', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.how_served="{ props: { item } }">
              <SelectCheckBox
                title="Service Method"
                keyText="label"
                keyValue="value"
                :value="item.how_served"
                :dataList="appConfigChoices[appConfigConstants.SUBPOENA_SERVICE_METHOD]"
                @update="updateSubpoena(item.id, 'how_served', $event.value)"
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes :totalNotes="item.total_notes" :id="item.id" />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :id="item.id"
                :matterId="$route.params.matter || $route.params.projectId"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/subpoenas/${item.pk}`"
                  routerMutation="ht_store/matter/subpoena/subpoenaSet/updateDataSubpoena"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Flag
                  :isShowBookmark="false"
                  :isShowDetail="true"
                  @showDetail="showDetail(item.id, groupItem.groupID)"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeSubpoena(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateSubpoena
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
    <SupoenaDetail
      :isShow="showDetailRight"
      :subpoenaId="subpoenaId"
      @closeMenuRight="setStatus"
      :isClickOutSide="true"
      :isLoadingGetDetail="isLoadingGetDetail"
      title="Supoena Detail"
      @getDataMember="getDataMember"
      :isLoadingGetMember="isLoadingGetMember"
      @removeSubpoena="removeDetail"
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
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Notes from "./components/Notes";
import Comments from "./components/Comments";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import SelectStateAndCountry from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectStateAndCountry";
import SupoenaDetail from "./Detail/index";
//form
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import FormCreateSubpoena from "./components/FormCreateSubpoena";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  name: "static-pagination",
  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextField,
    TextArea,
    CreatedBy,
    DatePicker,
    Flag,
    Action,
    ButtonLoadMore,
    SelectCheckBox,
    Notes,
    Comments,
    SelectStateAndCountry,
    //form
    SearchInput,
    FormCreateSubpoena,
    AttachmentLink,
    Members,
    CharacterSingles,
    SupoenaDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Subpoena Name", value: "name", active: true },
        { text: "Created By", value: "creator", active: true },
        { text: "Subpoena Party", value: "party", active: true },
        { text: "Assigned To", value: "investigators", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Service Status", value: "service_status", active: true },
        {
          text: "Service Jurisdiction",
          value: "jurisdiction",
          active: true
        },
        { text: "Proof of Service", value: "proof_of_service", active: true },
        { text: "Hardness", value: "hardness", active: true },
        { text: "Response Status", value: "response_status", active: true },
        { text: "Date Served", value: "date_served", active: true },
        {
          text: "Objection Deadline",
          value: "objection_deadline",
          active: true
        },
        {
          text: "Producing Deadline",
          value: "producing_deadline",
          active: true
        },
        { text: "Service Method", value: "how_served", active: true },
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
          field: "priority",
          title: "Priority",
          list: []
        }
      ],
      isCallApiSourceGroupBy: false,
      isLoadingGetMember: false,
      isLoadingGetClient: false,
      isCallApiMemberCell: false,
      isCallApiClientCell: false,
      isLoadingGetDetail: false,
      showDetailRight: false,
      subpoenaId: 0,
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
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/subpoena/subpoenaSet", [
      "dataSubpoenas",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    async removeDetail(item, close) {
      await this.removeSubpoena(this.groupId, item, close);
      this.showDetailRight = false;
    },
    async showDetail(subpoenaId, groupId) {
      this.showDetailRight = true;
      this.groupId = groupId;
      if (this.subpoenaId !== subpoenaId) {
        this.isLoadingGetDetail = true;
        const idParams = {
          subpoenaId,
          matterId: this.$route.params.matter || this.$route.params.projectId
        };
        await this.getSupoenaDetailRequest(idParams);
        this.isLoadingGetDetail = false;
        this.subpoenaId = subpoenaId;
      }
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataSubpoenas[groupID]) return false;
      const totals = this.dataSubpoenas[groupID].totals;
      const results = this.dataSubpoenas[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchSubpoena(text) {
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
    async removeSubpoena(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        subpoenaId: row.id || row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeSubpoenaRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataSubpoenaRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateSubpoena(subpoenaId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId
        },
        body: {
          [name]: value
        }
      };
      this.updateSubpoenaRequest(data);
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value,
        detail: this.showDetailRight
      };
      await this.updateReportRequest(data);
    },
    async updateSubpoenaAsync(subpoenaId, name, { value, setLoading }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId
        },
        body: {
          [name]: value
        }
      };
      try {
        setLoading(true);
        await this.updateSubpoenaAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      switch (group) {
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
    async getDataSubpoena(query, isFirstCall) {
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
          const matterId =
            this.$route.params.matter || this.$route.params.projectId;
          await this.getDataMembersRequest({ matterId });
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },

    ...mapActions("ht_store/matter/subpoena/subpoenaSet", [
      "getDataSubpoenaRequest",
      "updateSubpoenaRequest",
      "updateSubpoenaAsyncRequest",
      "removeSubpoenaRequest",
      "getSupoenaDetailRequest",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataSubpoena(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getAllDataCharacterRequest({ matterId });

    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataSubpoena(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.detail-character {
  color: blue;
  cursor: pointer;
}
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
</style>
