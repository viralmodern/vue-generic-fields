<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <div class="flex-grow-1"></div>
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
      <v-expansion-panel style="width:100vh">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{ dataDrafts ? dataDrafts.length : 0 }}
                of
                {{ dataDrafts ? totals : 0 }}
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
            :desserts="dataDrafts"
            :loading="isLoadingGet"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextArea :value="item.name" @update="updateDraftsPrepared(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.date | formatShortDate }}</div>
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
                  class="mx-2"
                  :colorButton="`${[item.date].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateDraftsPrepared(item.id, 'date', $event.date)
                  "
                />
              </v-row>
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateDraftsPrepared(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.who_reads="{ props: { item } }">
              <RelatedCharacter
                :value="item.who_reads"
                @update="updateDraftsPrepared(item.id, 'who_reads', $event)"
              />
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
                @update="updateDraftsPrepared(item.id, 'note_count', $event)"
                :draftId="item.id"
              />
            </template>
            <template v-slot:item.comment_count="{ props: { item } }">
              <Comments :totalComments="item.comment_count" :draftId="item.id" />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                 <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/drafts/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/draftsPrepare/updateData"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action @remove="removeDraftsPrepared(item.id, $event)" />
                <v-btn exact icon small @click="showDetail(item.id)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateDrafts class="pt-4" />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="totals > 20 && totals > dataDrafts.length"
                @onPageChanged="loadMore"
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
      :draftId="this.draftId"
      @closePopup="isShowPopupAttachment = false"
      :detail="showDetailRight"
    />
    <DraftsPreparedDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :draftId="draftId"
      @remove="removeDetail"
      @updateDraftsPrepared="updateDraftsPrepared"
      @onShowPopupAttachment="onShowPopupAttachment"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import FormCreateDrafts from "../components/drafts-prepared/FormCreateDrafts";
import Notes from "../components/drafts-prepared/Notes";
import Comments from "../components/drafts-prepared/Comments";
import Attachments from "../components/drafts-prepared/Attachments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import DraftsPreparedDetail from "./components/DraftsPreparedDetail/index";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  components: {
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    RelatedCharacter,
    Action,
    ButtonLoadMore,
    DatePicker,
    AddIcon,
    FormCreateDrafts,
    Notes,
    Comments,
    Attachments,
    DraftsPreparedDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Draft Name", value: "name", active: true },
        { text: "Draft Date", value: "date", active: true },
        { text: "Draft Description", value: "desc", active: true },
        { text: "Who Read It?", value: "who_reads", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Note", value: "note_count", active: true },
        { text: "Comment", value: "comment_count", active: true },
        { text: "Action", value: "action", active: true }
      ],
      draftId: 0,
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
    ...mapGetters("ht_store/matter/deposition/draftsPrepare", [
      "dataDrafts",
      "isLoadingGet",
      "totals",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(pk) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          rowId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataDraftPrepareDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.draftId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeDraftsPrepared(item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(draftId, attachments) {
      (this.draftId = draftId), this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      setLoading(false);
    },
    async removeDraftsPrepared(rowId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        rowId
      };
      await this.removeDraftsRequest(data);
      close();
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDraftsRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateDraftsPrepared(rowId, name, value) {
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
      this.updateDraftsRequest(data);
    },
    ...mapMutations("ht_store/matter/deposition/draftsPrepare", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/deposition/draftsPrepare", [
      "getDraftsRequest",
      "updateDraftsRequest",
      "removeDraftsRequest",
      "updateDraftsAsyncRequest",
      "getDataDraftPrepareDetailRequest"
    ])
  },
  mounted() {
    this.updatePagination({ page: 1, isFirstCall: true });
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
