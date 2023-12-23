<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput placeholder="Search written article" /> -->
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
                dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].results.length
                : 0
                }}
                characters
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
            <template v-slot:item.publisher="{ props: { item } }">
              <TextArea
                :value="item.publisher"
                @update="updateKeyPleading(item.id, 'publisher', $event)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateKeyPleading(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <Label
                :value="item.labels.map(x => x.pk)"
                @update="updateKeyPleading(item.id, 'labels', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/written-articles/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/writtenarticl/updateDataMutations"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeKeyPleading(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(groupItem.groupID, item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{item.attachments.length}}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.publish_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.publish_date | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.publish_date"
                  :textTooltip="
                  [item.publish_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.publish_date)}`
                    : 'Add date'
                "
                  class="mx-2"
                  @updateTime="updateKeyPleading(item.id, 'publish_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.note_count="{ props: { item } }">
              <Notes
                :totalNotes="item.note_count"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :id="item.pk"
              />
            </template>
            <template v-slot:item.comment_count="{ props: { item } }">
              <Comments
                :totalComments="item.comment_count"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :keyPleadingId="item.pk"
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateWrittenArticle
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
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="this.requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
      :detail="showDetailRight"
    />
    <WrittenArticleDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :requestForProductionId="requestForProductionId"
      @remove="removeDetail"
      @updateKeyPleading="updateKeyPleading"
      @onShowPopupAttachment="onShowPopupAttachment"
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
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Comments from "../components/WrittenArticle/Comments";
import Notes from "../components/deposition/TdNotesWrittenArticle";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Attachments from "../components/WrittenArticle/Attachments";
import WrittenArticleDetail from "./components/WrittenArticleDetail/index"
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateWrittenArticle from "../components/FormCreateWrittenArticle";

export default {
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Label,
    Action,
    FormCreateWrittenArticle,
    ButtonLoadMore,
    DatePicker,
    AddIcon,
    Comments,
    Notes,
    Attachments,
    WrittenArticleDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Publication Date", value: "publish_date", active: true },
        { text: "Publication Name", value: "name", active: true },
        { text: "Publisher", value: "publisher", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Label", value: "labels", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Note", value: "note_count", active: true },
        { text: "Comment", value: "comment_count", active: true },
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
      isCallApiLeblsGroupBy: false,
      isLoadingGetLabels: false,
      isLoadingGetComment: false,
      isLoadingAdd: false,
      requestForProductionId: 0,
      //attachment
      isShowPopupAttachment: false,
      //Detail
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
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
    ...mapGetters("ht_store/matter/deposition/writtenarticl", [
      "dataKeyPleading",
      "isLoadingGet",
      "isLoadingGet",
      "dataComment",
      "countComment",
      "totalsPageComment",
      "isShowPaginationComment",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          rowId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataWrittenArticleDetailRequest(idParams);
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
      await this.removeKeyPleading(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataKeyPleading[groupID]) return false;
      const totals = this.dataKeyPleading[groupID].totals;
      const results = this.dataKeyPleading[groupID].results;
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
    async removeKeyPleading(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        rowId: row.id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeRequestApi(data);
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
        depositionId: this.$route.params.depositionId
      };
      return this.getDataFromApi({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateKeyPleading(rowId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          rowId
        },
        body: {
          [name]: value
        },
        detail: this.showDetailRight
      };
      this.updatedRequestApi(data);
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
          if (!this.isCallApiLeblsGroupBy) {
            this.isCallApiLeblsGroupBy = true;
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
    async getDataKeyPleading(group, isFirstCall) {
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
    ...mapActions("ht_store/matter/deposition/writtenarticl", [
      "getDataFromApi",
      "updatedRequestApi",
      "removeRequestApi",
      "getDataCommentRequest",
      "addCommentRequest",
      "getDataWrittenArticleDetailRequest"
    ]),
    ...mapMutations("ht_store/matter/deposition/writtenarticl", [
      "getDataAttachments"
    ]),

    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"])
  },
  mounted() {
    const group = this.$route.query.group;
    if (this.checkExistGroupBy) {
      this.getDataKeyPleading(group, true);
    } else {
      this.changeQueryRouter("all");
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataKeyPleading(query.group, true);
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
