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
                {{ dataPublisheds ? dataPublisheds.length : 0 }}
                of
                {{ dataPublisheds ? totals : 0 }}
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
            :desserts="dataPublisheds"
            :loading="isLoadingGet"
          >
            <template v-slot:item.name="{ props: { item } }">
              <div class="d-flex">
                <TextArea :value="item.name" @update="updatePublisheds(item.id, 'name', $event)" />
              </div>
            </template>
            <template v-slot:item.author="{ props: { item } }">
              <TextField
                :value="item.author"
                @update="updatePublisheds(item.id, 'author', $event)"
              />
            </template>
            <template v-slot:item.publication_year="{ props: { item } }">
              <YearSelect
                width="50px"
                :max="new Date().getFullYear()"
                border-unset
                hide-details
                :value="item.publication_year"
                @update="updatePublisheds(item.pk, 'publication_year', $event)"
              />
            </template>
            <template v-slot:item.bibliography="{ props: { item } }">
              <TextArea
                :value="item.bibliography"
                @update="updatePublisheds(item.id, 'bibliography', $event)"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                @update="updatePublisheds(item.pk, 'total_comments', $event)"
                :rowId="item.pk"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="$route.params.depositionId"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updatePublisheds(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{ item.attachments.length }}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.note_count="{ props: { item } }">
              <NotePublished :totalNotes="item.note_count" :pubId="item.id" />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                 <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/literatures/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/published/updateData"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action @remove="removePublisheds(item.id, $event)" />
                <v-btn exact icon small @click="showDetail(item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreatePublished class="pt-4" />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="totals > 20 && totals > dataPublisheds.length"
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
      :publishedId="publishedId"
      @closePopup="isShowPopupAttachment = false"
      :detail="showDetailRight"
    />
    <PublishedDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :publishedId="publishedId"
      @remove="removeDetail"
      @updatePublisheds="updatePublisheds"
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
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import FormCreatePublished from "../../components/FormCreatePublished";
import NotePublished from "../../components/NotePublished";
import Comments from "./Comments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Attachments from "../../components/published/Attachments";
import PublishedDetail from "./Detail/index";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  components: {
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    TextField,
    Action,
    ButtonLoadMore,
    FormCreatePublished,
    NotePublished,
    Comments,
    YearSelect,
    Attachments,
    AddIcon,
    PublishedDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Publication Name", value: "name", active: true },
        { text: "Author", value: "author", active: true },
        { text: "Publication Year", value: "publication_year", active: true },
        { text: "Bibilography", value: "bibliography", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Note", value: "note_count", active: true },
        { text: "Comment", value: "total_comments", active: true },
        { text: "Action", value: "action", active: true }
      ],
      publishedId: null,
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
    ...mapGetters("ht_store/matter/deposition/published", [
      "dataPublisheds",
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
          publishedId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataPublishedDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.publishedId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removePublisheds(item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(publishedId, attachments) {
      (this.publishedId = publishedId), this.getDataAttachments(attachments);
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
    async removePublisheds(rowId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        rowId
      };
      await this.removePublishedRequest(data);
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
      return this.getPublishedRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updatePublisheds(rowId, name, value) {
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
      this.updatePublishedRequest(data);
    },

    ...mapMutations("ht_store/matter/deposition/published", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/deposition/published", [
      "getPublishedRequest",
      "updatePublishedRequest",
      "removePublishedRequest",
      "getDataPublishedDetailRequest"
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
