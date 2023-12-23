<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
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
                dataRFP[groupItem.groupID]
                ? dataRFP[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataRFP[groupItem.groupID]
                ? dataRFP[groupItem.groupID].totals
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
              dataRFP[groupItem.groupID]
                ? dataRFP[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateRFP(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.produced="{ props: { item } }">
              <Disputed :value="item.produced" @update="updateRFP(item.id, 'produced', $event)" />
            </template>
            <template v-slot:item.sources="{ props: { item } }">
              <SourceDesposition
                lengthDisplay="3"
                :value="item.sources"
                @update="updateRFP(item.id, 'sources', $event)"
              />
            </template>
            <template v-slot:item.step_to_locate="{ props: { item } }">
              <TextArea
                :value="item.step_to_locate"
                @update="updateRFP(item.id, 'step_to_locate', $event)"
              />
            </template>
            <template v-slot:item.availability="{ props: { item } }">
              <SelectCheckBox
                title="Availability"
                :value="item.availability"
                :dataList="[NA, ...appConfigs.availablility]"
                @update="updateRFP(item.id, 'availability', $event.id)"
              />
            </template>
            <template v-slot:item.objection="{ props: { item } }">
              <Disputed :value="item.objection" @update="updateRFP(item.id, 'objection', $event)" />
            </template>
            <template v-slot:item.objection_types="{ props: { item } }">
              <ObjectionType
                :value="item.objection_types"
                :isEmitOpenMenu="true"
                @update="updateRFP(item.id, 'objection_types', $event)"
                @onOpenMenu="getDataObjectionType"
                :isLoadingGet="isLoadingGetObjectionType"
              />
            </template>
            <template v-slot:item.comment_count="{ props: { item } }">
              <Comments
                :totalComments="item.comment_count"
                @update="updateRFP(item.pk, 'comment_count', $event)"
                :rowId="item.pk"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="$route.params.depositionId"
              />
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{item.attachments.length}}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                :isEmitOpenMenu="true"
                @update="updateRFP(item.id, 'legal_issues', $event)"
                @onOpenMenu="getDataIssues"
                :isLoadingGet="isLoadingGetIssue"
              />
            </template>
            <template v-slot:item.note_count="{ props: { item } }">
              <NoteDeposition :totalNotes="item.note_count" :RFPId="item.id" />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/requestforproddocs`"
                  routerMutation="ht_store/matter/deposition/RFP/updateDataRFP"
                  :pk="item.id"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeRFP(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(groupItem.groupID, item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRFP
                class="pt-4"
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
                @onOpenMenuIssue="getDataIssues"
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
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
    />
    <PreparationRFPDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :requestForProductionId="requestForProductionId"
      @getDataObjectionType="getDataObjectionType"
      :isLoadingGetObjectionType="isLoadingGetObjectionType"
      @onShowPopupAttachment="onShowPopupAttachment"
      @getDataIssues="getDataIssues"
      :isLoadingGetIssue="isLoadingGetIssue"
      @remove="removeDetail"
    />
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import SourceDesposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SourceDesposition";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Comments from "./Comments";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import ObjectionType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ObjectionType";
import NoteDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/NoteDeposition";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Attachments from "../../components/request-for-production/Attachments";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateRFP from "../../components/FormCreateRFP";
import PreparationRFPDetail from "./Detail/index";

export default {
  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    //cell
    TextArea,
    TextField,
    SourceDesposition,
    Disputed,
    ButtonLoadMore,
    SelectCheckBox,
    Action,
    Issue,
    ObjectionType,
    NoteDeposition,
    Comments,
    AddIcon,
    Attachments,
    // form
    FormCreateRFP,
    PreparationRFPDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Production Request", value: "name", active: true },
        { text: "Produced", value: "produced", active: true },
        { text: "Source", value: "sources", active: true },
        {
          text: "Step To Locate Request Documents",
          value: "step_to_locate",
          active: true
        },
        { text: "Availability", value: "availability", active: true },
        { text: "Objection", value: "objection", active: true },
        { text: "Objection Type", value: "objection_types", active: true },
        { text: "Comment", value: "comment_count", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
        { text: "Notes", value: "note_count", active: true },
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
          field: "sources",
          title: "Source",
          list: []
        }
      ],
      isCallApiSourceGroupBy: false,
      isLoadingGetSource: false,
      isLoadingAdd: false,
      isLoadingGetComment: false,
      isCallApiIssueCell: false,
      isLoadingGetIssue: false,
      isCallApiObjectionTypeCell: false,
      isLoadingGetObjectionType: false,
      requestForProductionId: 0,
      //attachment
      isShowPopupAttachment: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      groupItemId: ""
    };
  },
  computed: {
    NA() {
      return NA;
    },
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkRFPGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition/RFP", [
      "dataRFP",
      "isLoadingGet",
      "dataComment",
      "countComment",
      "totalsPageComment",
      "isShowPaginationComment",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      this.groupItemId = groupItemId;

      try {
        const idParams = {
          requestForProductionId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getPreparationRFPDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.requestForProductionId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeRFP(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(requestForProductionId, attachments) {
      this.requestForProductionId = requestForProductionId;
      this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRFP[groupID]) return false;
      const totals = this.dataRFP[groupID].totals;
      const results = this.dataRFP[groupID].results;
      return totals > 20 && totals > results.length;
    },
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
    async removeRFP(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        RFPId: row.id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeRFPRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataRFPRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRFP(RFPId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId
        },
        body: {
          [name]: value
        }
      };
      this.updateRFPRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const depositionId = this.$route.params.depositionId;
      switch (group) {
        case "sources":
          if (!this.isCallApiSourceGroupBy) {
            this.isCallApiSourceGroupBy = true;
            const dataSource = await this.getDataSourceRequest({
              matterId,
              depositionId
            });
            groupByCurrent.list = [...dataSource, nullalbe].map(x => {
              return {
                id: x.id,
                groupID: x.id,
                value: x.id,
                text: x.name
              };
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataRFP(query, isFirstCall) {
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
    async getDataObjectionType() {
      if (!this.isCallApiObjectionTypeCell) {
        this.isCallApiObjectionTypeCell = true;
        this.isLoadingGetObjectionType = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataObjectionTypeRequest({ matterId });
        this.isLoadingGetObjectionType = false;
      }
    },
    async getDataIssues() {
      if (!this.isCallApiIssueCell) {
        this.isCallApiIssueCell = true;
        this.isLoadingGetIssue = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataIssuesRequest({ matterId });
        this.isLoadingGetIssue = false;
      }
    },
    ...mapMutations("ht_store/matter/deposition/RFP", ["getDataAttachments"]),
    ...mapActions("ht_store/matter/deposition/RFP", [
      "getDataRFPRequest",
      "updateRFPRequest",
      "updateRFPAsyncRequest",
      "removeRFPRequest",
      "addCommentRFPRequest",
      "getDataCommentRFPRequest",
      "getPreparationRFPDetailRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/objectiontype", [
      "getDataObjectionTypeRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/source", [
      "getDataSourceRequest"
    ]),
    async getDataComment(id, query) {
      this.isLoadingGetComment = true;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: id
        },
        query
      };
      await this.getDataCommentRFPRequest(data);
      this.isLoadingGetComment = false;
    },
    async sendComment(id, { body, pagination }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: id
        },
        body
      };
      this.isLoadingAdd = true;
      await this.addCommentRFPRequest(data);
      await this.getDataComment(id, pagination);
      this.isLoadingAdd = false;
    }
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkRFPGroupBy) {
      this.getDataRFP(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkRFPGroupBy) {
        this.getDataRFP(query, true);
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
</style>
