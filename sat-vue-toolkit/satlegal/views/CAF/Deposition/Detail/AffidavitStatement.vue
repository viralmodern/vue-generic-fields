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
                dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].totals
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
              dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextArea :value="item.name" @update="updateKeyPleading(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.answer="{ props: { item } }">
              <TextArea
                :value="item.answer"
                @update="updateKeyPleading(item.id, 'answer', $event)"
              />
            </template>
            <template v-slot:item.question="{ props: { item } }">
              <TextArea
                :value="item.question"
                @update="updateKeyPleading(item.id, 'question', $event)"
              />
            </template>
            <template v-slot:item.make_by="{ props: { item } }">
              <CharacterSingles
                textTooltip="Select Make By"
                :value="item.make_by && item.make_by.pk"
                @update="updateMakeBy(item.id, $event)"
              />
            </template>
            <template v-slot:item.perjury_risk="{ props: { item } }">
              <FlagBtn
                @update="updateKeyPleading(item.id, 'perjury_risk', $event)"
                :isActive="item.perjury_risk"
              />
            </template>
            <template v-slot:item.follow_up="{ props: { item } }">
              <Disputed
                :value="item.follow_up"
                @update="updateKeyPleading(item.id, 'follow_up', !item.follow_up)"
              />
            </template>
            <template v-slot:item.date_made="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.date_made | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.date_made"
                  :textTooltip="
                  [item.date_made].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.date_made)}`
                    : 'Add date'
                "
                  class="mx-2"
                  @updateTime="updateKeyPleading(item.id, 'date_made', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                @update="updateKeyPleading(item.id, 'legal_issues', $event)"
                :isEmitOpenMenu="true"
                @onOpenMenu="getDataIssues"
                :isLoadingGet="isLoadingGetIssue"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :id="item.pk"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/affs/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/affidavitStatement/updateDataKeyPleading"
                  :pk="item.id"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeKeyPleading(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(groupItem.groupID,item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateAffdavitStatement
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
    <AffidavitStatementDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :affId="affId"
      @remove="removeDetail"
      @getDataIssues="getDataIssues"
      :isLoadingGetIssue="isLoadingGetIssue"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import Comments from "../components/Affs/Comments";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import FlagBtn from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/FlagBtn";
//form
import FormCreateAffdavitStatement from "../components/FormCreateAffdavitStatement";
import AffidavitStatementDetail from "./components/AffDetail/index";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Action,
    FormCreateAffdavitStatement,
    CharacterSingles,
    ButtonLoadMore,
    Disputed,
    Issue,
    Comments,
    DatePicker,
    FlagBtn,
    AffidavitStatementDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Affidavit Statement", value: "name", active: true },
        { text: "Date Statement Made", value: "date_made", active: true },
        { text: "Perjury Risk?", value: "perjury_risk", active: true },
        {
          text: "Who made this affidavit statement",
          value: "make_by",
          active: true
        },
        { text: "Question", value: "question", active: true },
        { text: "Answer", value: "answer", active: true },
        { text: "Follow up?", value: "follow_up", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
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
          field: "make_by",
          title: "Character",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiIssueCell: false,
      isLoadingGetIssue: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      affId: 0,
      groupItemId: ""
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition/affidavitStatement", [
      "dataKeyPleading",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    totalPageComment() {
      return Math.ceil(this.total_comment / 20);
    }
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          affId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getAffidavitStatementDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.affId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeKeyPleading(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataKeyPleading[groupID]) return false;
      const totals = this.dataKeyPleading[groupID].totals;
      const results = this.dataKeyPleading[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchAffidavitStatement(text) {
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
      await this.updatePagination(
        {
          ...this.$route.query,
          page,
          ungroup: groupItem.groupID === "all",
          group_items:
            groupItem.groupID === "all" ? undefined : [groupItem.groupID],
          group_by: groupItem.groupID === "all" ? undefined : this.groupBy.field
        },
        true
      );
      setLoading(false);
    },
    async removeKeyPleading(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        affId: row.id,
        depositionId: this.$route.params.depositionId
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeKeyPleadingRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataFromApi({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateKeyPleading(affId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          affId
        },
        body: {
          [name]: value
        }
      };
      this.updateKeyPleadingRequest(data);
    },
    updateMakeBy(affId, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          affId
        },
        body: {
          make_by: value
        }
      };
      this.updateMakeByRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "make_by":
          if (!this.isCallApiCharacterGroupBy) {
            this.isCallApiCharacterGroupBy = true;
            const dataCharacter = await this.getAllDataCharacterRequest({
              matterId
            });
            groupByCurrent.list = [...dataCharacter, nullalbe].map(x => {
              const dataMap = {
                id: x.pk,
                groupID: x.pk,
                value: {
                  id: x.pk,
                  name: `${x.last_name} ${x.first_name}`,
                  avatarUrl: x.avatar
                },
                text: (x.last_name || "") + " " + (x.first_name || "")
              };
              return dataMap;
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
    async getDataKeyPleading(query) {
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
      this.updatePagination(searchObject);
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
    ...mapActions("ht_store/matter/deposition/affidavitStatement", [
      "getDataFromApi",
      "updateKeyPleadingRequest",
      "updateKeyPleadingAsyncRequest",
      "removeKeyPleadingRequest",
      "updateMakeByRequest",
      "getAffidavitStatementDetailRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataKeyPleading(query);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getAllDataCharacterRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataKeyPleading(query);
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
