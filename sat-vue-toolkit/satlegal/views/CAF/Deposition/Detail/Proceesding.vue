<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.question"
          placeholder="Search question"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchDeposition"
        />
        <div class="flex-grow-1"></div>
        <!-- <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="onChangeGroupBy"
        />-->
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
                dataProceeding[groupItem.groupID]
                ? dataProceeding[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataProceeding[groupItem.groupID]
                ? dataProceeding[groupItem.groupID].totals
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
              dataProceeding[groupItem.groupID]
                ? dataProceeding[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.question="{ props: { item } }">
              <TextArea
                :value="item.question"
                @update="updateProceeding(item.id, 'question', $event)"
              />
            </template>
            <template v-slot:item.answer="{ props: { item } }">
              <TextArea :value="item.answer" @update="updateProceeding(item.id, 'answer', $event)" />
            </template>
            <template v-slot:item.follow_up="{ props: { item } }">
              <Disputed
                :value="item.follow_up"
                @update="updateProceeding(item.id, 'follow_up', !item.follow_up)"
              />
            </template>
            <template v-slot:item.alert="{ props: { item } }">
              <v-btn
                class="ma-0"
                @click="updateProceeding(item.id, 'alert', !item.alert)"
                icon
                small
              >
                <v-icon small :color="item.alert ? 'red' : 'grey'">flag</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.objection="{ props: { item } }">
              <Disputed
                :value="item.objection"
                @click="updateProceeding(item.id, 'objection', !item.objection)"
              />
            </template>
            <template v-slot:item.statement="{ props: { item } }">
              <TextArea
                :value="item.statement"
                @update="updateProceeding(item.id, 'statement', $event)"
              />
            </template>
            <template v-slot:item.make_on="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.make_on | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.make_on"
                  :textTooltip="
                  [item.make_on].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.make_on)}`
                    : 'Add date'
                "
                  :colorButton="`${[item.date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updateProceeding(item.id, 'make_on', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.objection_reasons="{ props: { item } }">
              <ObjectionType
                :value="item.objection_reasons"
                :isEmitOpenMenu="true"
                @update="updateProceeding(item.id, 'objection_reasons', $event)"
                @onOpenMenu="getDataObjectionType"
                :isLoadingGet="isLoadingGetObjectionType"
              />
            </template>
            <template v-slot:item.objection_context="{ props: { item } }">
              <TextArea
                :value="item.objection_context"
                @update="updateProceeding(item.id, 'objection_context', $event)"
              />
            </template>
            <template v-slot:item.related_exhibit="{ props: { item } }">
              <ChipInlineList
                textNoData="(No exhibit)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuExhibitMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>
            <template v-slot:item.sources="{ props: { item } }">
              <Source :value="item.sources" @update="updateProceeding(item.id, 'sources', $event)" />
            </template>
            <template v-slot:item.emoji="{ props: { item } }">
              <Emoji
                :value="item.emoji"
                @update="updateProceeding(item.id, 'emoji', $event)"
                @openEmoji="
              openEmoji({
                stageId: item.emoji,
                dataRow: item
              })
            "
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/proceedings/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/proceeding/updateDataProceeding"
                  :pk="item.id"
                  :isShowFlag="false"
                />
                <Action
                  :item="item"
                  @remove="removeProceeding(groupItem.groupID, item.id, $event)"
                />
                <v-btn exact icon small @click="showDetail(groupItem.groupID,item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateProceeding
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
    <SelectEmoji
      @select="updateEmoji"
      :isShowPopup="isShowEmoji"
      @closeModal="isShowEmoji = false"
    />
    <MenuRelatedExhibit
      keyId="pk"
      :value="relatedExhibitMenu.value"
      :isShowMenu="relatedExhibitMenu.isShowMenu"
      :positionX="relatedExhibitMenu.positionX"
      :positionY="relatedExhibitMenu.positionY"
      :isLoadingGet="isLoadingGetExhibit"
      @select="
        $_toggleMenuExhibitMixin_addValue($event);
        updateRelated(
          appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
          relatedExhibitMenu.pk,
          $event,
          relatedExhibitMenu.detail
        );
      "
      @remove="
        $_toggleMenuExhibitMixin_removeValue($event);
        removeRelated(
          appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
          relatedExhibitMenu.pk,
          $event,
          relatedExhibitMenu.detail
        );
      "
      @closeMenu="relatedExhibitMenu.isShowMenu = false"
    />
    <ProceedingDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :id="id"
      @remove="removeDetail"
      @getDataObjectionType="getDataObjectionType"
      :isLoadingGetObjectionType="isLoadingGetObjectionType"
      @openEmoji="openEmoji"
      @openExhibitModal="$_toggleMenuExhibitMixin_openMenu"
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

// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Source from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SourceProceeding";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import FormCreateProceeding from "../components/FormCreateProceeding";
import ObjectionType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ObjectionType";
import Emoji from "../components/deposition/TdEmoji";
import SelectEmoji from "@/sat-vue-toolkit/satlegal/ht_components/common/dialog/SelectEmoji";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedExhibit from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/exhibit/MenuRelatedExhibit";
import ProceedingDetail from "./components/ProceedingDetail/index";
// mixins
import toggleMenuExhibitMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/exhibit/mixins/toggleMenuExhibitMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  mixins: [appConfigMixin, toggleMenuExhibitMixin],
  name: "deposition-proceeding-list",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Disputed,
    DatePicker,
    Action,
    Source,
    ButtonLoadMore,
    ObjectionType,
    FormCreateProceeding,
    Emoji,
    SelectEmoji,
    ChipInlineList,
    MenuRelatedExhibit,
    ProceedingDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "", value: "drag", active: true },
        { text: "Question", value: "question", active: true },
        { text: "Answer", value: "answer", active: true },
        { text: "Follow up?", value: "follow_up", active: true },
        { text: "Alert?", value: "alert", active: true },
        {
          text: "Attorney Objection",
          value: "objection",
          active: true
        },
        { text: "Objection Reason", value: "objection_reasons", active: true },
        { text: "Objection Context", value: "objection_context", active: true },
        { text: "Deponent Emotion", value: "emoji", active: true },
        { text: "Related Exhibit", value: "related_exhibit", active: true },
        { text: "Prior Statement", value: "statement", active: true },
        {
          text: "Prior Statement Made on ",
          value: "make_on",
          active: true
        },
        {
          text: "Prior Statement Source",
          value: "sources",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        }
      ],
      isLoadingGetSource: false,
      isCallApiSource: false,
      isCallApiObjectionTypeCell: false,
      isLoadingGetObjectionType: false,
      dataEditEmoji: {},
      isShowEmoji: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      id: 0,
      groupItemId: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/proceeding", [
      "dataProceeding",
      "isLoadingGet"
    ]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    }
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          id: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getProceesdingDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.id = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeProceeding(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    ...mapActions("ht_store/matter/deposition/proceeding", [
      "getDataProceedingRequest",
      "addProceedingRequest",
      "updateProceedingRequest",
      "removeProceedingRequest",
      "getDataSourceRequest",
      "getProceesdingDetailRequest",

      //relations
      "updateRelationProceedingRequest",
      "removeRelationProceedingRequest"
    ]),
    ...mapActions("ht_store/matter/objectiontype", [
      "getDataObjectionTypeRequest"
    ]),
    isShowButtonLoadMore(groupID) {
      if (!this.dataProceeding[groupID]) return false;
      const totals = this.dataProceeding[groupID].totals;
      const results = this.dataProceeding[groupID].results;
      return totals > 20 && totals > results.length;
    },
    async loadMore({ page, setLoading }, groupItem) {
      setLoading(true);
      const searchObject = {
        ...this.$route.query,
        page,
        ungroup: groupItem.groupID === "all",
        group_items:
          groupItem.groupID === "all" ? undefined : [groupItem.groupID],
        group_by: groupItem.groupID === "all" ? undefined : this.groupBy.field
      };
      await this.updatePagination(searchObject, true);
      setLoading(false);
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
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchDeposition(text) {
      const query = {
        ...this.$route.query,
        question: text
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
    resetFields({ fields }) {
      this.headers = fields;
    },
    select() {},
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      // const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataProceedingFromApi(query) {
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
    updatePagination(searchObject, isConcatData) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataProceedingRequest({
        idParams,
        searchObject,
        isConcatData
      });
    },
    updateProceeding(id, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          id
        },
        body: {
          [name]: value
        }
      };
      this.updateProceedingRequest(data);
    },
    async removeProceeding(name, id, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeProceedingRequest(data);
      close();
    },
    async getDataSource() {
      if (!this.isCallApiSource) {
        this.isCallApiSource = true;
        this.isLoadingGetSource = true;
        const matterId = this.$route.params.projectId;
        await this.getDataSourceRequest({ matterId });
        this.isLoadingGetSource = false;
      }
    },
    openEmoji({ stageId, dataRow }) {
      this.dataEditEmoji = {
        stageId,
        id: dataRow.id,
        name: "emoji",
        value: dataRow["emoji"]
      };
      this.isShowEmoji = true;
    },
    updateEmoji(emoji) {
      const id = this.dataEditEmoji.id;
      const name = this.dataEditEmoji.name;
      const value = this.dataEditEmoji.value + "" + emoji;
      this.updateProceeding(id, name, value);
      this.isShowEmoji = false;
      this.dataEditEmoji = {};
    },
    updateRelated(type, proceedingId, item, detail = false) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          proceedingId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          name: item.name
        },
        detail
      };
      this.updateRelationProceedingRequest(data);
    },
    removeRelated(type, proceedingId, item, detail = false) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        proceedingId,
        contentTypeId,
        objectId: item.pk,
        detail
      };
      this.removeRelationProceedingRequest(data);
    }
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataProceedingFromApi(query);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataProceedingFromApi(query);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
</style>
