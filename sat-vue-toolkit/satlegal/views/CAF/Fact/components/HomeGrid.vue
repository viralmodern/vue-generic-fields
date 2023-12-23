<template>
  <v-container fluid>
    <v-card flat class="mb-4" ref="headerSlickTable">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search fact"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchFact"
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
      <v-expansion-panel style="width:100vh" v-for="(groupItem, i) in listGroupByCurrent" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{ groupItem.text }}</div>
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataFacts[groupItem.groupID]
                ? dataFacts[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataFacts[groupItem.groupID]
                ? dataFacts[groupItem.groupID].totals
                : 0
                }}
                facts
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
              dataFacts[groupItem.groupID]
                ? dataFacts[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <Flag
                :isShowDetail="true"
                :isShowBookmark="false"
                @showDetail="showDetail(item.id)"
                :isShowFlag="false"
              />
              <BookmarkOrFlag
                :valueBookmark="item.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/facts/${item.id}`"
                routerMutation="ht_store/matter/facts/updateDataFacts"
                :pk="item.id"
                :valueFlag="item.reported_object && item.reported_object.pk"
              />
              <TextInline
                textNodata="(No Name)"
                :value="item.name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Name',
                    name: 'name',
                    pk: item.id,
                    value: item.name
                  })
                "
              />
            </template>
            <template v-slot:item.time="{ props: { item } }">
              <ChooseDateTimePicker
                :isActions="true"
                :isShowButtonClear="false"
                :title="item.time ? 'Update time' : 'Add time'"
                :date="item.time"
                :nameButtonSubmit="item.time ? 'Update' : 'Add'"
                @update="updateFacts(item.pk, 'time', $event)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Description)"
                  :value="item.desc"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Description',
                      name: 'desc',
                      pk: item.id,
                      value: item.desc
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.cause_of_actions="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Cause of Actions)"
                  :value="item.cause_of_actions"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Cause of Actions',
                      name: 'cause_of_actions',
                      pk: item.id,
                      value: item.cause_of_actions
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.location="{ props: { item } }">
              <MenuLocation
                widthSection="250px"
                :value="item.location"
                @update="updateFacts(item.id, 'location', $event)"
              />
            </template>
            <template v-slot:item.favorable="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.favorable"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.FAVORABLE_AND_PROVIDEDBY]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Favorable',
                    name: 'favorable',
                    pk: item.id,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.favorable,
                    dataList:
                      appConfigChoices[
                        appConfigConstants.FAVORABLE_AND_PROVIDEDBY
                      ]
                  })
                "
              />
            </template>
            <template v-slot:item.dispute="{ props: { item } }">
              <Disputed :value="item.dispute" @update="updateFacts(item.id, 'dispute', $event)" />
            </template>
            <template v-slot:item.important="{ props: { item } }">
              <Range :value="item.important" @update="updateFacts(item.id, 'important', $event)" />
            </template>
            <template v-slot:item.relevant="{ props: { item } }">
              <Range :value="item.relevant" @update="updateFacts(item.id, 'relevant', $event)" />
            </template>
            <template v-slot:item.value_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.value_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Value Level',
                    name: 'value_level',
                    pk: item.id,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.value_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.relevant_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.relevant_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Relevant Level',
                    name: 'relevant_level',
                    pk: item.id,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.relevant_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.relief_sought="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Relief Sought)"
                  :value="item.relief_sought"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Relief Sought',
                      name: 'relief_sought',
                      pk: item.id,
                      value: item.relief_sought
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.interpretation="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Interpretation)"
                  :value="item.interpretation"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Interpretation',
                      name: 'interpretation',
                      pk: item.id,
                      value: item.interpretation
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.subjects="{ props: { item } }">
              <Subject :value="item.subjects" @update="updateFacts(item.id, 'subjects', $event)" />
            </template>
            <template v-slot:item.characters="{ props: { item } }">
              <RelatedCharacter
                :value="item.characters"
                @update="updateFacts(item.id, 'characters', $event)"
              />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <TagableIssue
                :tag="item.legal_issues"
                @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: item.id,
                  })
                "
              />
            </template>
            <template v-slot:item.sources="{ props: { item } }">
              <Source :value="item.sources" @update="updateFacts(item.id, 'sources', $event)" />
            </template>
            <template v-slot:item.type="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.type"
                keyValue="value"
                keyText="label"
                :dataList="appConfigChoices[appConfigConstants.FACT_TYPE]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Fact Type',
                    name: 'type',
                    pk: item.id,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.type,
                    dataList: appConfigChoices[appConfigConstants.FACT_TYPE]
                  })
                "
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <Action :item="item" @remove="removeFacts(groupItem.groupID, item, $event)" />
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateFact
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
    <div v-if="groupBy.totals > 20" class="text-right text-center mt-2">
      <v-pagination
        :value="groupBy.page"
        :length="groupBy.totals / 20 | numberCeil"
        circle
        @input="onPagingListGroupBy"
      ></v-pagination>
    </div>
    <FactDetail
      :isShow="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      title="Fact Detail"
      @closeMenuRight="setStatus"
    />

    <MenuTextField
      width="350"
      :title="textFieldMenu.title"
      placeholder="Enter text"
      :value="textFieldMenu.value"
      :isShowMenu="textFieldMenu.isShowMenu"
      :positionX="textFieldMenu.positionX"
      :positionY="textFieldMenu.positionY"
      @closeMenu="textFieldMenu.isShowMenu = false"
      @update="
        textFieldMenu.value = $event;
        updateFacts(textFieldMenu.pk, textFieldMenu.name, $event);
      "
    />

    <MenuTextArea
      width="350"
      :title="textAreaMenu.title"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="
        textAreaMenu.value = $event;
        updateFacts(textAreaMenu.pk, textAreaMenu.name, $event);
      "
    />

    <MenuSelectCheckBox
      :title="menuSelectBox.title"
      :keyValue="menuSelectBox.keyValue"
      :keyText="menuSelectBox.keyText"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="menuSelectBox.dataList"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event[menuSelectBox.keyValue];
        menuSelectBox.isShowMenu = false;
        updateFacts(menuSelectBox.pk, menuSelectBox.name, $event[menuSelectBox.keyValue])
      "
    />

    <MenuIssue
      :labels="menuIssue.value"
      :isShowMenu="menuIssue.isShowMenu"
      :positionX="menuIssue.positionX"
      :positionY="menuIssue.positionY"
      :isLoadingGet="isLoadingGetIssue"
      @closeMenu="menuIssue.isShowMenu = false"
      @update="
        menuIssue.value = $event;
        updateFacts(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
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
import FactDetail from "./detail2/FactDetail";
import { typeFacts, level, nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import Subject from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Subject";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Source from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Source";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import MenuLocation from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MenuLocation";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateFact from "./FormCreateFact";

// menus
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";

// mixins
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import { numberCeil } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

const rowsPerPage = 20;

export default {
  filters: {
    numberCeil
  },
  mixins: [
    appConfigMixin,
    toggleMenuTextField,
    toggleMenuTextArea,
    toggleMenuSelectBox,
    toggleMenuIssueMixin
  ],
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    FactDetail,
    TableGrid,
    Subject,
    RelatedCharacter,
    Disputed,
    Range,
    Flag,
    Action,
    Source,
    FormCreateFact,
    ButtonLoadMore,
    ChooseDateTimePicker,
    MenuLocation,
    TextInline,
    TextAreaInline,
    ChipJoinMenuSelectBox,
    TagableIssue,
    // menus
    MenuTextField,
    MenuTextArea,
    MenuSelectCheckBox,
    MenuIssue,
    BookmarkOrFlag
  },
  data() {
    return {
      level: level.filter(x => x.id !== null),
      showDetailRight: false,
      panel: [0],
      headers: [
        { text: "Name", value: "name", active: true },
        { text: "Time", value: "time", active: true },
        { text: "Fact Description ", value: "desc", active: true },
        { text: "Subject Matter", value: "subjects", active: true },
        { text: "Characters", value: "characters", active: true },
        { text: "Cause of Action", value: "cause_of_actions", active: true },
        { text: "Location", value: "location", active: true },
        { text: "Fact Type", value: "type", active: true },
        { text: "Disputed", value: "dispute", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
        { text: "Relief Sought", value: "relief_sought", active: true },
        { text: "Favorable", value: "favorable", active: true },
        { text: "Value Important Index", value: "important", active: true },
        { text: "Relevant Index", value: "relevant", active: true },
        { text: "Value Level", value: "value_level", active: true },
        { text: "Relevant Level", value: "relevant_level", active: true },
        { text: "Fact Source", value: "sources", active: true },
        { text: "Fact Interpretation", value: "interpretation", active: true },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {
        id: null,
        field: "",
        title: "",
        list: [],
        totals: 0,
        page: 1
      },
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
        {
          id: 2,
          field: "related_characters",
          title: "Characters",
          list: [],
          totals: 0,
          page: 1
        },
        {
          id: 3,
          field: "type",
          title: "Fact Type",
          list: []
        },
        {
          id: 4,
          field: "dispute",
          title: "Disputed",
          list: []
        },
        {
          id: 5,
          field: "legal_issues",
          title: "Issue",
          list: [],
          totals: 0,
          page: 1
        },
        {
          id: 5,
          field: "favorable",
          title: "Favorable",
          list: []
        },
        {
          id: 6,
          field: "relevant_level",
          title: "Relevant Level",
          list: []
        },
        {
          id: 7,
          field: "value_level",
          title: "Value Level",
          list: []
        },
        {
          id: 8,
          field: "important_level",
          title: "Important Level",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiIssueGroupBy: false,
      isLoadingGetDetail: false,
      endPoint: `/api/matters/${this.$$$matterID}/facts/`
    };
  },
  computed: {
    listGroupByCurrent() {
      const end = (this.groupBy.page || 1) * rowsPerPage;
      return this.groupBy.list.slice(end - rowsPerPage, end);
    },
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/facts", [
      "dataFacts",
      "isLoadingGet",
      "factDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    onPagingListGroupBy(page) {
      this.groupBy.page = page;
      this.$nextTick(() => {
        this.$refs.headerSlickTable.$el.scrollIntoView({
          top: 0,
          behavior: "smooth"
        });
      });
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async showDetail(id) {
      this.showDetailRight = true;
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const data = {
        matterId: matterId,
        factId: id
      };
      this.isLoadingGetDetail = true;
      await this.getFactDetailRequest(data);
      this.isLoadingGetDetail = false;
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value
      };
      await this.updateFlagRequest(data);
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataFacts[groupID]) return false;
      const totals = this.dataFacts[groupID].totals;
      const results = this.dataFacts[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchFact(text) {
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
    async removeFacts(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        factsId: row.id
      };
      data.isFieldArray = Array.isArray(
        row[
          this.groupBy.field === "related_characters"
            ? "characters"
            : this.groupBy.field
        ]
      );
      await this.removeFactsRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataFactsRequest({ idParams, searchObject, isFirstCall });
    },
    updateFacts(factsId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          factsId
        },
        body: {
          [name]: value
        }
      };
      this.updateFactsRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "related_characters":
          if (!this.isCallApiCharacterGroupBy) {
            this.isCallApiCharacterGroupBy = true;
            const dataCharacter = await this.getAllDataCharacterRequest({
              matterId
            });
            groupByCurrent.totals = dataCharacter.length;
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
        case "type":
          groupByCurrent.list = typeFacts.map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "dispute":
          groupByCurrent.list = [...this.appConfigs.disputed, nullalbe].map(
            x => {
              return { id: x.id, groupID: x.id, value: x.id, text: x.name };
            }
          );
          return groupByCurrent;
        case "legal_issues":
          if (!this.isCallApiIssueGroupBy) {
            this.isCallApiIssueGroupBy = true;
            const dataIssues = await this.getDataIssuesRequest({
              matterId
            });
            groupByCurrent.totals = dataIssues.length;
            groupByCurrent.list = [...dataIssues, nullalbe].map(x => {
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
        case "favorable":
          groupByCurrent.list = [
            ...this.appConfigs.favorableFact,
            nullalbe
          ].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "relevant_level":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "value_level":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "important_level":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
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
    async getDataFacts(query, isFirstCall) {
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
    ...mapActions("ht_store/matter/facts", [
      "getDataFactsRequest",
      "updateFactsRequest",
      "removeFactsRequest",
      "getFactDetailRequest",
      "updateFlagRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/subjects", ["getDataSubjectsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataFacts(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataFacts(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.name-fact {
  color: blue;
  cursor: pointer;
}
.text-area-inline {
  width: 350px;
  word-break: break-all;
}
</style>
