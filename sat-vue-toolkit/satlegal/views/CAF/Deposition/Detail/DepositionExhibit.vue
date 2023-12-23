<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput placeholder="Search exhibit" /> -->
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
    <v-expansion-panels class="v-expansion-panels--custom" multiple v-model="panel">
      <v-expansion-panel style="width:100vh" v-for="(groupItem, i) in groupBy.list" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{ groupItem.text }}</div>
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataExhibitSlickgrid[groupItem.groupID]
                ? dataExhibitSlickgrid[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataExhibitSlickgrid[groupItem.groupID]
                ? dataExhibitSlickgrid[groupItem.groupID].totals
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
              dataExhibitSlickgrid[groupItem.groupID]
                ? dataExhibitSlickgrid[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateExhibit(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.date | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.date"
                  :textTooltip="
                  [item.date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.date)}`
                    : 'Add date'
                "
                  :colorButton="`${[item.date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updateExhibit(item.id, 'date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateExhibit(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.attachment="{ props: { item } }">
              <AttachmentLink
                :value="item.attachment"
                @updateAsync="updateExhibitsAsync('attachment', item.id, $event)"
              />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                :isEmitOpenMenu="true"
                @update="updateExhibit(item.id,'legal_issues', $event)"
                @onOpenMenu="getDataIssues"
                :isLoadingGet="isLoadingGetIssue"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="(item.total_comments || 0)"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="$$$depositionId"
                :keyPleadingId="item.pk"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/exhibits/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/exhibitSlickgrid/updateDataKeyExhibit"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeKeyExhibit(groupItem.groupID, item, $event)" />
                <v-btn
                  class="ma-0"
                  icon
                  small
                  :href="item.attachment"
                  target="_blank"
                  download
                  :disabled="!item.attachment"
                >
                  <v-icon small color="primary">mdi-download</v-icon>
                </v-btn>
                <v-btn exact icon small @click="showDetail(groupItem.groupID,item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateExhibit
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
    <DepositionExhibitDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :keyExhibitId="keyExhibitId"
      @removeKeyExhibit="removeKeyExhibitDetail"
      :isLoadingGetIssue="isLoadingGetIssue"
      @getDataIssues="getDataIssues"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import Comments from "../components/Exhibit/Comments";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";

// import Goal from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Goal";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateExhibit from "../components/FormCreateExhibit";
import DepositionExhibitDetail from "./components/ExihibitDetail/index";

export default {
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    DatePicker,
    TextArea,
    // Goal,
    Action,
    FormCreateExhibit,
    ButtonLoadMore,
    TextField,
    AttachmentLink,
    Issue,
    Comments,
    DepositionExhibitDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Order", value: "order", active: true },
        { text: "Exhibit Name", value: "name", active: true },
        { text: "Date", value: "date", active: true },
        {
          text: "Exhibit Description",
          value: "desc",
          active: true
        },
        { text: "Exhibit Document", value: "attachment", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
        { text: "Comment ", value: "total_comments", active: true },
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
          field: "labels",
          title: "Labels",
          list: []
        }
      ],
      isCallApiLabelsGroupBy: false,
      isLoadingGetGoals: false,
      isLoadingAdd: false,
      isLoadingGetComment: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      keyExhibitId: 0,
      groupItemId: "",
      isCallApiIssueCell: false,
      isLoadingGetIssue: false
    };
  },
  computed: {
    $$$matterID() {
      try {
        return this.$route.params.matter || this.$route.params.projectId
      } catch (e) {
        console.log('$$$matterID', e.message) // eslint-disable-line
        return null
      }
    },
    $$$depositionId() {
      try {
        return this.$route.params.depositionId
      } catch (e) {
        console.log('$$$depositionId', e.message) // eslint-disable-line
        return null
      }
    },
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition/exhibitSlickgrid", [
      "dataExhibitSlickgrid",
      "isLoadingGet",
      "dataComment",
      "countComment",
      "totalsPageComment",
      "isShowPaginationComment"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          keyExhibitId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataKeyExhibitDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.keyExhibitId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
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
    async removeKeyExhibitDetail(item, close) {
      await this.removeKeyExhibit(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataExhibitSlickgrid[groupID]) return false;
      const totals = this.dataExhibitSlickgrid[groupID].totals;
      const results = this.dataExhibitSlickgrid[groupID].results;
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
    async removeKeyExhibit(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        keyExhibitId: row.id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeKeyExhibitRequest(data);
      close();
      return true;
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
        depositionId: this.$route.params.depositionId
      };
      return this.getDataKeyExhibitRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateExhibit(keyExhibitId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          keyExhibitId
        },
        body: {
          [name]: value
        }
      };
      this.updateKeyExhibitRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "labels":
          if (!this.isCallApiLabelsGroupBy) {
            this.isCallApiLabelsGroupBy = true;
            const dataLabels = await this.getDataLabelsRequest({
              matterId
            });
            groupByCurrent.list = [...dataLabels, nullalbe].map(x => {
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
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataKeyExhibit(group, isFirstCall) {
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
    async updateExhibitsAsync(name, keyExhibitId, { value, setLoading }) {
      try {
        const data = {
          name: name,
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
            keyExhibitId
          },
          body: {
            [name]: value
          }
        };
        setLoading(true);
        await this.updateExhibitsAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    ...mapActions("ht_store/matter/deposition/exhibitSlickgrid", [
      "getDataKeyExhibitRequest",
      "updateKeyExhibitRequest",
      "removeKeyExhibitRequest",
      "updateExhibitsAsyncRequest",
      "addCommentExhibitsRequest",
      "getDataCommentExhibitsRequest",
      "getDataKeyExhibitDetailRequest",
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    async getDataComment(id, query) {
      this.isLoadingGetComment = true;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          exhibitsId: id
        },
        query
      };
      await this.getDataCommentExhibitsRequest(data);
      this.isLoadingGetComment = false;
    },
    async sendComment(id, { body, pagination }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          exhibitsId: id
        },
        body
      };
      this.isLoadingAdd = true;
      await this.addCommentExhibitsRequest(data);
      await this.getDataComment(id, pagination);
      this.isLoadingAdd = false;
    }
  },
  mounted() {
    const group = this.$route.query.group;
    if (this.checkExistGroupBy) {
      this.getDataKeyExhibit(group, true);
    } else {
      this.changeQueryRouter("all");
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataKeyExhibit(query.group, true);
      } else {
        this.changeQueryRouter("all");
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
