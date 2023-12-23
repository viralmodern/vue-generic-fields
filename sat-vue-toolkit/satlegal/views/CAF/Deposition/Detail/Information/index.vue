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
                dataInfomation[groupItem.groupID]
                ? dataInfomation[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataInfomation[groupItem.groupID]
                ? dataInfomation[groupItem.groupID].totals
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
              dataInfomation[groupItem.groupID]
                ? dataInfomation[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.received_item="{ props: { item } }">
              <TextArea
                :value="item.received_item"
                @update="updateInfo(item.id, 'received_item', $event)"
              />
            </template>
            <template v-slot:item.date_received="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.date_received | formatShortDate }}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.date_received"
                  :textTooltip="
                    [item.date_received].some(x => !!x)
                      ? `${$options.filters.formatShortDate(
                          item.date_received
                        )}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="
                    `${[item.date_received].some(x => !!x) ? 'indigo' : ''}`
                  "
                  @updateTime="updateInfo(item.id, 'date_received', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateInfo(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <Label :value="item.labels" @update="updateInfo(item.id, 'labels', $event)" />
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{ item.attachments.length }}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.note_count="{ props: { item } }">
              <Notes
                :totalNotes="item.note_count"
                @update="updateInfo(item.id, 'note_count', $event)"
                :depositionId="item.deposition"
                :InfoId="item.id"
              />
            </template>
            <template v-slot:item.comment_count="{ props: { item } }">
              <Comments :totalComments="item.comment_count" :InfoId="item.id" />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/info-and-docs-experts/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/information/updateDataInfo"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action @remove="removeInfo(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(groupItem.groupID, item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateInfomation
                class="pt-4"
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
                @onOpenMenuLabel="getDataLabel"
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
      :InfoId="this.InfoId"
      @closePopup="isShowPopupAttachment = false"
      :detail="showDetailRight"
    />
    <InformationDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :InfoId="InfoId"
      @remove="removeDetail"
      @updateInfo="updateInfo"
      @onShowPopupAttachment="onShowPopupAttachment"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
// cells component
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Attachments from "./Attachments";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateInfomation from "../../components/FormCreateInfomation";
import Notes from "./Notes";
import Comments from "./Comments";
//Detail
import InformationDetail from "./Detail/index";

export default {
  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Action,
    FormCreateInfomation,
    ButtonLoadMore,
    DatePicker,
    AddIcon,
    Notes,
    Comments,
    Attachments,
    Label,
    InformationDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Received Item", value: "received_item", active: true },
        { text: "Received Date", value: "date_received", active: true },
        { text: "Item Description", value: "desc", active: true },
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
      isCallApiLabelGroupBy: false,
      isLoadingGetLabels: false,
      isCallApiLabelCell: false,
      InfoId: null,
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
    checkInfoGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition/information", [
      "dataInfomation",
      "isLoadingGet",
      "totals",
      //attachment
      "dataAttachments"
    ]),
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
        await this.getDataInformationDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.InfoId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeInfo(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(InfoId, attachments) {
      (this.InfoId = InfoId), this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataInfomation[groupID]) return false;
      const totals = this.dataInfomation[groupID].totals;
      const results = this.dataInfomation[groupID].results;
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
    async removeInfo(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        InfoId: row.id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeInfoRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataInfoRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateInfo(InfoId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          InfoId
        },
        body: {
          [name]: value
        },
        detail: this.showDetailRight
      };
      this.updateInfoRequest(data);
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
          if (!this.isCallApiLabelGroupBy) {
            this.isCallApiLabelGroupBy = true;
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
    async getDataInfo(query, isFirstCall) {
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
    async getDataLabel() {
      if (!this.isCallApiLabelCell) {
        this.isCallApiLabelCell = true;
        this.isLoadingGetLabels = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataLabelsRequest({ matterId });
        this.isLoadingGetLabels = false;
      }
    },
    ...mapMutations("ht_store/matter/deposition/information", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/matter/deposition/information", [
      "getDataInfoRequest",
      "updateInfoRequest",
      "removeInfoRequest",
      "updateInfoAsyncRequest",
      "getDataInformationDetailRequest"
    ])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkInfoGroupBy) {
      this.getDataInfo(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkInfoGroupBy) {
        this.getDataInfo(query, true);
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
