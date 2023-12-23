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
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
          <span class="font-weight-bold mr-2">
            {{ dataDaubertTestComputed.length }}
            of
            {{ totals_daubert }}
            items
          </span>
        </v-chip>
      </v-card-title>
      <v-card-text>
        <TableGridStackColumn
          hide-default-header
          hide-default-footer
          show-footer-stack-column
          :fixedHeader="false"
          :headers="headers.filter(h => h.active)"
          :headerStackColumn="headerStackColumn"
          :desserts="dataDaubertTestComputed"
          :loading="isLoadingGet"
        >
          <template v-slot:item.method_name="{ props: { item } }">
            <TextInline
              textNodata="(No methods name)"
              :value="item.method_name"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Methods Name',
                  name: 'method_name',
                  pk: item.pk,
                  value: item.method_name
                })
              "
            />
          </template>
          <template v-slot:item.tested="{ props: { item } }">
            <Disputed
              :value="item.tested"
              class="justify-center align-center d-flex"
              @update="updateDaubertTest(item.pk, 'tested', $event)"
            />
          </template>
          <template v-slot:item.method_peer_review="{ props: { item } }">
            <Disputed
              :value="item.method_peer_review"
              class="justify-center align-center d-flex"
              @update="updateDaubertTest(item.pk, 'method_peer_review', $event)"
            />
          </template>
          <template v-slot:item.error_potential="{ props: { item } }">
            <v-btn
              class="ma-0"
              icon
              small
              @click="updateDaubertTest(item.pk, 'error_potential', !item.error_potential)"
            >
              <v-icon small :color="item.error_potential ? 'red' : ''">flag</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.accepted_field="{ props: { item } }">
            <Disputed
              :value="item.accepted_field"
              class="justify-center align-center d-flex"
              @update="updateDaubertTest(item.pk, 'accepted_field', $event)"
            />
          </template>
          <template v-slot:item.actions="{ props: { item } }">
            <v-row class="justify-center align-center d-flex" no-gutters style="width: 150px">
               <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/dauberts/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/daubertTest/updateDauberts"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
              <Action :item="item" @remove="removeDauberts(item.pk, $event)" />
              <v-btn exact icon small @click="showDetail(item.pk)">
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </v-row>
          </template>

          <!-- item stack column -->

          <template
            v-slot:appendItemStackColumn.reviews="{
              props: { itemStackColumn, item }
            }"
          >
            <div class="d-flex align-center" style="height:60px">
              <FormCreateReview
                :daubertId="item.pk"
                @onAddNewCustodyItemSuccess="options[item.pk].pageCustody = 1"
              />
              <div class="pagination-custody-item">
                <v-pagination
                  v-if="totalsPageStackColumn[item.pk] && totalsPageStackColumn[item.pk].totalsPageCustody > 1"
                  :value="options[item.pk] ? options[item.pk].pageReview : 1"
                  :length="totalsPageStackColumn[item.pk] ? totalsPageStackColumn[item.pk].totalsPageCustody : 0"
                  circle
                  @input="onPagingListCustodyItem(item.pk, $event)"
                ></v-pagination>
              </div>
            </div>
          </template>

          <template v-slot:itemStackColumn.publication_name="{ props: { itemStackColumn, item } }">
            <TextInline
              textNodata="(No publication name)"
              :value="itemStackColumn.publication_name"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Publication name',
                  name: 'publication_name',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.publication_name
                })
                typeApi = 'review'
                daubertId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.publisher="{
              props: { itemStackColumn, item }
            }"
          >
            <TextInline
              textNodata="(No publisher)"
              :value="itemStackColumn.publisher"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Publisher',
                  name: 'publisher',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.publisher
                })
                typeApi = 'review'
                daubertId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.desc="{
              props: { itemStackColumn, item }
            }"
          >
            <TextInline
              textNodata="(No description)"
              :value="itemStackColumn.desc"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Description',
                  name: 'desc',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.desc
                })
                typeApi = 'review'
                daubertId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.labels="{
              props: { itemStackColumn, item }
            }"
          >
            <Label
              :value="itemStackColumn.labels.map(x => x.pk)"
              @update="updateReviews(itemStackColumn.pk, item.pk, 'labels', $event)"
            />
          </template>
          <template
            v-slot:itemStackColumn.attachments="{
              props: { itemStackColumn, item }
            }"
          >
            {{itemStackColumn.attachments.length}}
            <AddIcon
              @onClickIcon="onShowPopupAttachment(item.pk, itemStackColumn.pk, itemStackColumn.attachments)"
              icon="mdi-attachment"
            />
          </template>
          <template v-slot:itemStackColumn.date="{ props: { itemStackColumn, item } }">
            <YearSelect
              width="50px"
              :max="new Date().getFullYear()"
              border-unset
              placeholder="Select year"
              hide-details
              :value="Number((itemStackColumn.date || '').split('-')[0])"
              @update="updateReviews(itemStackColumn.pk, item.pk, 'date', `${$event}-01-01`)"
            />
          </template>
          <template v-slot:itemStackColumn.actions="{ props: { itemStackColumn, item } }">
            <Action
              :item="itemStackColumn"
              @remove="removeReviews(item.pk, itemStackColumn.pk, $event)"
            />
          </template>
        </TableGridStackColumn>
        <div class="d-flex align-center mt-2">
          <v-col cols="10" class="pa-0">
            <FormCreateDaubertTets class="pa-2" @onAddNewEvidenceSuccess="onAddNewEvidenceSuccess" />
          </v-col>
          <v-col cols="2 text-right">
            <ButtonLoadMore
              ref="refLoadMore"
              @onPageChanged="loadMore({...$event, paging: true})"
              v-if="
            totals_daubert > 20 &&
              totals_daubert > dataDaubertTest.length
          "
            />
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <MenuTextArea
      width="350"
      :title="textAreaMenu.title"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="updateEvidenceAndCustody"
    />

    <MenuTextField
      width="350"
      :typeInput="textFieldMenu.typeInput"
      :title="textFieldMenu.title"
      placeholder="Enter text"
      :value="textFieldMenu.value"
      :isShowMenu="textFieldMenu.isShowMenu"
      :positionX="textFieldMenu.positionX"
      :positionY="textFieldMenu.positionY"
      @closeMenu="textFieldMenu.isShowMenu = false"
      @update="
        textFieldMenu.value = $event;
        updateReviews(textFieldMenu.pk, textFieldMenu.name, $event);
      "
    />
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :reviewId="reviewIdAttachment"
      :daubertId="daubertIdAttachment"
      :dataAttachments="dataAttachments"
      @closePopup="isShowPopupAttachment = false;"
    />
    <DaubertTestDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :daubertId="daubertId"
      @remove="removeDetail"
      @updateDaubertTest="updateDaubertTest"
      @onShowPopupAttachment="onShowPopupAttachment"
      @removeReviews="removeReviews"
      @updateReviews="updateReviews"
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils";
import TableGridStackColumn from "@/sat-vue-toolkit/satlegal/reuse-components/TableGridStackColumn";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cell
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Attachments from "./Attachments";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";

import FormCreateDaubertTets from "./FormCreateDaubertTets";
import FormCreateReview from "./FormCreateReview";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";

// mixins
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//Detail
import DaubertTestDetail from "./Detail/index";
const rowsPerPage = 5;

export default {
  mixins: [toggleMenuTextArea, toggleMenuTextField],
  components: {
    TableGridStackColumn,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Action,
    ButtonLoadMore,
    Label,
    TextInline,
    Disputed,
    Attachments,
    YearSelect,
    // Menus
    MenuTextArea,
    MenuTextField,

    FormCreateDaubertTets,
    FormCreateReview,
    AddIcon,
    DaubertTestDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      //attachment
      isShowPopupAttachment: false,
      reviewIdAttachment: 0,
      daubertIdAttachment: 0,
      headerStackColumn: [
        {
          text: "Publication Name",
          value: "publication_name",
          headerValue: "reviews",
          color: "cyan"
        },
        {
          text: "Date",
          value: "date",
          headerValue: "reviews",
          color: "green"
        },
        {
          text: "Publisher",
          value: "publisher",
          headerValue: "reviews",
          color: "purple"
        },
        {
          text: "Description",
          value: "desc",
          headerValue: "reviews",
          color: "deep-purple"
        },
        {
          text: "Labels",
          value: "labels",
          headerValue: "reviews",
          color: "indigo"
        },
        {
          text: "Attachments",
          value: "attachments",
          headerValue: "reviews",
          color: "blue"
        },
        {
          text: "Actions",
          value: "actions",
          headerValue: "reviews",
          color: "error"
        }
      ],
      headers: [
        {
          text: "Expert Method Name",
          value: "method_name",
          active: true,
          rowspan: 5
        },
        {
          text: "Is It Tested?",
          value: "tested",
          active: true,
          rowspan: 2
        },
        {
          text: "Is This Method Peer Reviewed",
          value: "method_peer_review",
          active: true,
          rowspan: 2
        },
        {
          text: "Peer Review Proof",
          value: "reviews",
          active: true,
          isStackColumn: true,
          center: true,
          class: "text-subtitle-1 font-weight-bold"
        },
        {
          text: "Error Potential?",
          value: "error_potential",
          active: true,
          rowspan: 2
        },
        {
          text: "Is This Method Generally Accepted In The Field?",
          value: "accepted_field",
          active: true,
          rowspan: 2
        },
        {
          text: "Actions",
          value: "actions",
          active: true,
          rowspan: 2
        }
      ],
      typeApi: "daubert",

      daubertId: 0,

      options: [],
      //Detail
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      groupItemId: ""
    };
  },
  computed: {
    dataDaubertTestComputed() {
      const data = this.dataDaubertTest.map(x => {
        const option = this.options[x.pk] || {};
        const end = (option.pageReview || 1) * rowsPerPage;
        const chainOfCustody = x.reviews.slice(end - rowsPerPage, end);
        return {
          ...x,
          reviews: chainOfCustody
        };
      });
      return data;
    },
    totalsPageStackColumn() {
      const data = {};
      this.dataDaubertTest.forEach(x => {
        data[x.pk] = {
          totalsPageCustody: Math.ceil(x.reviews.length / rowsPerPage)
        };
      });
      return data;
    },
    ...mapGetters("ht_store/matter/deposition/daubertTest", [
      "dataDaubertTest",
      "isLoadingGet",
      "totals_daubert",
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
        await this.getDataDaubertTestDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.daubertId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(pk, close) {
      await this.removeDauberts(pk, close);
      this.showDetailRight = false;
    },
    ...mapMutations("ht_store/matter/deposition/daubertTest", [
      "getDataAttachments"
    ]),
    onAddNewEvidenceSuccess(data) {
      this.options = {
        ...this.options,
        [data.pk]: { pageReview: 1 }
      };
    },
    onPagingListCustodyItem(daubertId, page) {
      this.options[daubertId].pageReview = page;
    },
    updateEvidenceAndCustody(value) {
      this.textAreaMenu.value = value;
      if (this.typeApi === "daubert") {
        this.updateDaubertTest(
          this.textAreaMenu.pk,
          this.textAreaMenu.name,
          value
        );
      } else {
        this.updateReviews(
          this.textAreaMenu.pk,
          this.daubertId,
          this.textAreaMenu.name,
          value
        );
      }
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateDaubertTest(daubertId, name, value) {
      const payload = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        daubertId,
        body: {
          [name]: value
        },
        detail: this.showDetailRight
      };
      this.updateDaubertsRequestApi(payload);
    },
    updateReviews(reviewId, daubertId, name, value) {
      const payload = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        daubertId,
        reviewId,
        body: {
          [name]: cloneDeep(value)
        },
        detail: this.showDetailRight
      };
      this.updateReviewsRequest(payload);
    },
    async removeDauberts(daubertId, close) {
      await this.removeDaubertsRequestApi({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        daubertId,
        detail: this.showDetailRight
      });
      close();
    },
    async removeReviews(daubertId, reviewId, close) {
      await this.removeReviewsRequest({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        reviewId,
        daubertId,
        detail: this.showDetailRight
      });
      const totalsPage = this.totalsPageStackColumn[daubertId]
        .totalsPageCustody;
      const currentPage = this.options[daubertId].pageReview;
      if (currentPage > totalsPage) {
        this.options[daubertId].pageReview = totalsPage;
      }
      close();
    },
    onShowPopupAttachment(daubertId, reviewId, attachments) {
      this.reviewIdAttachment = reviewId;
      this.daubertIdAttachment = daubertId;
      this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    async loadMore({ page, setLoading, paging }) {
      setLoading(true);
      const { results } = await this.updatePagination({ page, paging });
      const options = {};
      results.forEach(x => {
        options[x.pk] = {
          pageReview: 1
        };
      });
      this.options = { ...this.options, ...options };
      setLoading(false);
    },
    updatePagination({ page, paging }) {
      return this.getDaubertsFromApi({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        page,
        paging
      });
    },
    ...mapActions("ht_store/matter/deposition/daubertTest", [
      "getDaubertsFromApi",
      "updateDaubertsRequestApi",
      "updateReviewsRequest",
      "removeReviewsRequest",
      "removeDaubertsRequestApi",
      "getDataDaubertTestDetailRequest"
    ])
  },
  async mounted() {
    const { results } = await this.updatePagination({
      page: 1
    });
    const options = {};
    results.forEach(x => {
      options[x.pk] = {
        pageReview: 1
      };
    });
    this.options = options;
  }
};
</script>

<style scoped>
.pagination-custody-item {
  width: 100%;
}
.pagination-custody-item >>> .v-pagination {
  justify-content: flex-end !important;
}
</style>
