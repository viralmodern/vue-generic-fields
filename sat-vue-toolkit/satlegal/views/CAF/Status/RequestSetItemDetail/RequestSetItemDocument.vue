<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.pleading"
          placeholder="Search request set item name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRSID"
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
      <v-expansion-panel style="width:100vh" v-for="(groupItem, i) in groupBy.list" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{ groupItem.text }}</div>
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataRSID[groupItem.groupID]
                ? dataRSID[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataRSID[groupItem.groupID]
                ? dataRSID[groupItem.groupID].totals
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
              dataRSID[groupItem.groupID]
                ? dataRSID[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.request_item="{ props: { item } }">
              <TextInline
                textNodata="(No request set item)"
                :value="item.request_item ? item.request_item.name : ''"
                @onClick="
                $_toggleMenuRequestSetItemMixin_openMenu({
                  ...$event,
                  title: 'Request set item',
                  name: 'request_item',
                  pk: item.pk,
                  value: item.request_item ? [item.request_item] : []
                })
              "
                :isReadOnly="true"
              />
            </template>
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateRSID(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.index="{ props: { row } }">{{ row + 1 }}</template>
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
                  @updateTime="updateRSID(item.id, 'date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.attachment="{ props: { item } }">
              <AttachmentLink
                :attachment="item.attachment"
                @update="updateAttachmentRSID(item.id, $event.value)"
              />
            </template>
            <template v-slot:item.custodians="{ props: { item } }">
              <RelatedCharacter
                :value="item.custodians"
                @update="updateRSID(item.id, 'custodians', $event)"
              />
            </template>
            <template v-slot:item.recipients="{ props: { item } }">
              <RelatedCharacter
                :value="item.recipients"
                @update="updateRSID(item.id, 'recipients', $event)"
              />
            </template>
            <template v-slot:item.authors="{ props: { item } }">
              <RelatedCharacter
                :value="item.authors"
                @update="updateRSID(item.id, 'authors', $event)"
              />
            </template>
            <template v-slot:item.included_trial="{ props: { item } }">
              <Disputed
                :value="item.included_trial"
                @update="updateRSID(item.id, 'included_trial', $event)"
              />
            </template>
            <template v-slot:item.confident="{ props: { item } }">
              <SelectCheckBox
                title="Request Set Confidentiality"
                keyText="name"
                :value="item.confident"
                :dataList="appConfigs.listPriority"
                @update="updateRSID(item.id, 'confident', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.privileges="{ props: { item } }">
              <SelectLabel
                textTooltip="Add type"
                title="Privileges"
                :value="item.privileges"
                :labels="mapPrillegeDetail"
                multiple
                @chooseLabel="
                  updateRSID(item.id, 'privileges', $event)
                "
              />
            </template>
            <template v-slot:item.responsive="{ props: { item } }">
              <SelectCheckBox
                title="Request Set Responsive"
                keyText="label"
                :value="item.responsive"
                :dataList="appConfigChoices[appConfigConstants.RESPONSIVE]"
                @update="updateRSID(item.id, 'responsive', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateRSID(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                @update="updateRSID(item.id, 'legal_issues', $event)"
              />
            </template>
            <template v-slot:item.reviewers="{ props: { item } }">
              <Members :value="item.reviewers" @update="updateRSID(item.id, 'reviewers', $event)" />
            </template>
            <template v-slot:item.review_status="{ props: { item } }">
              <SelectCheckBox
                title="Request Set Review Status"
                keyText="label"
                :value="item.review_status"
                :dataList="appConfigChoices[appConfigConstants.REVIEWSTATUS]"
                @update="updateRSID(item.id, 'review_status', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.tags="{ props: { item } }">
              <Tags
                :value="item.tags"
                :isLoadingGet="isLoadingGetTag"
                :isEmitOpenMenu="true"
                @update="updateRSID(item.id, 'tags', $event)"
                @onOpenMenu="getDataTag"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :rSId="item.request_set"
                :itemsId="$route.params.requestItemId"
                :id="item.pk"
              />
            </template>
            <template v-slot:item.date_tagged="{ props: { item } }">
              <v-row no-gutters class="td-dateTag">
                <div
                  v-if="showDate(item.date_tagged_after, item.date_tagged_before) === 'date'"
                >Date: {{item.date_tagged_after | formatShortDate}}</div>
                <div v-if="showDate(item.date_tagged_after, item.date_tagged_before) === 'between'">
                  After day: {{item.date_tagged_after | formatShortDate}}
                  <br />
                  Before day: {{item.date_tagged_before | formatShortDate}}
                </div>
                <div
                  v-if="showDate(item.date_tagged_after, item.date_tagged_before) === 'before'"
                >Before day: {{item.date_tagged_before | formatShortDate}}</div>
                <div
                  v-if="showDate(item.date_tagged_after, item.date_tagged_before) === 'after'"
                >After day: {{item.date_tagged_after | formatShortDate}}</div>
                <DateTagged
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :dateAfter="item.date_tagged_after"
                  :dateBefore="item.date_tagged_before"
                  :textTooltipAfter="
                  [item.date_tagged_after].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.date_tagged_after)}`
                    : 'Add date'
                  "
                  :textTooltipBefore="
                  [item.date_tagged_before].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.date_tagged_before)}`
                    : 'Add date'
                  "
                  class="mx-2"
                  @updateTime="updateTimeRSID(item.id, $event)"
                />
              </v-row>
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <Label
                :value="item.labels"
                @update="
                  updateRSID(item.id, 'labels', $event)
                "
                @onOpenMenu="
                  getDataLabelsRequest({ matterId:$route.params.matter || $route.params.projectId})
                "
              />
            </template>
            <template v-slot:item.redaction="{ props: { item } }">
              <SelectCheckBox
                title="Request Set Redaction"
                keyText="label"
                :value="item.redaction"
                :dataList="appConfigChoices[appConfigConstants.REDACTION]"
                @update="updateRSID(item.id, 'redaction', $event.value)"
                keyValue="value"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <v-btn
                  class="ma-0"
                  @click="updateBookmarkRSID(item.id, item.bookmarked_pk)"
                  icon
                  small
                >
                  <v-icon small :color="item.bookmarked_pk ? 'success' : 'grey'">mdi-bookmark</v-icon>
                </v-btn>
                <Action :item="item" @remove="removeRSID(groupItem.groupID, item, $event)" />
                <v-btn class="ma-0" @click="updateRSID(item.id, 'flag', !item.flag)" icon small>
                  <v-icon small :color="item.flag === true ? 'success' : 'grey'">mdi-flag</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRSID
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
    <MenuRelatedRequestSetItem
      keyId="pk"
      single
      :value="relatedRequestSetItemMenu.value"
      :isShowMenu="relatedRequestSetItemMenu.isShowMenu"
      :positionX="relatedRequestSetItemMenu.positionX"
      :positionY="relatedRequestSetItemMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItem"
      @select="
        relatedRequestSetItemMenu.value = [$event];
        updateRSID(
          relatedRequestSetItemMenu.pk,
          'request_item',
          {pk: $event.pk, name: $event.name}
        );
      "
      @remove="
        relatedRequestSetItemMenu.value = [];
        updateRSID(
          relatedRequestSetItemMenu.pk,
          'request_item',
          null
        );
      "
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
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/AttachmentLink";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Comments from "./Comments";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import MenuRelatedRequestSetItem from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/MenuRelatedRequestSetItem";
import DateTagged from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/DateTagged";
//form
import FormCreateRSID from "./FormCreateRSID";
import toggleMenuExhibitMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/exhibit/mixins/toggleMenuExhibitMixin";
import toggleMenuRequestSetItemMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/mixins/toggleMenuRequestSetItemMixin";

// moment
import moment from "moment";
export default {
  mixins: [
    appConfigMixin,
    toggleMenuSelectBox,
    toggleMenuExhibitMixin,
    toggleMenuRequestSetItemMixin,
    toggleMenuTextField
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextField,
    DatePicker,
    AttachmentLink,
    RelatedCharacter,
    Disputed,
    SelectCheckBox,
    Issue,
    Comments,
    Tags,
    TextArea,
    Label,
    Action,
    ButtonLoadMore,
    FormCreateRSID,
    SelectLabel,
    Members,
    TextInline,
    MenuRelatedRequestSetItem,
    DateTagged
  },
  data() {
    return {
      panel: [0],
      headers: [
        {
          text: "Request Item Description",
          value: "request_item",
          active: true
        },
        { text: "Request Number", value: "index", active: true },
        { text: "Document Name", value: "name", active: true },
        {
          text: "Document Date",
          value: "date",
          active: true
        },
        { text: "Document Upload", value: "attachment", active: true },
        { text: "Document Import Date", value: "import_date", active: true },
        { text: "Date Tagged", value: "date_tagged", active: true },
        { text: "Custodians", value: "custodians", active: true },
        { text: "Recipients", value: "recipients", active: true },
        { text: "Authors", value: "authors", active: true },
        { text: "Filetype", value: "file_ext", active: true },
        {
          text: "Included in Trial?",
          value: "included_trial",
          active: true
        },
        { text: "Confidentiality", value: "confident", active: true },
        { text: "Privilege", value: "privileges", active: true },
        { text: "Responsive", value: "responsive", active: true },
        { text: "Document Description", value: "desc", active: true },
        { text: "Document Labels", value: "labels", active: true },
        { text: "Legal Issues", value: "legal_issues", active: true },
        { text: "Reviewers", value: "reviewers", active: true },
        { text: "Review Status", value: "review_status", active: true },
        { text: "Key Terms", value: "tags", active: true },
        { text: "Comment", value: "total_comments", active: true },
        { text: "Redaction", value: "redaction", active: true },
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
          field: "privileges",
          title: "Privilege",
          list: []
        },
        {
          id: 3,
          field: "custodians",
          title: "Custodians",
          list: []
        },
        {
          id: 4,
          field: "confident",
          title: "Confidentiality",
          list: []
        },
        {
          id: 5,
          field: "authors",
          title: "Authors",
          list: []
        },
        {
          id: 6,
          field: "responsive",
          title: "Responsive",
          list: []
        },
        {
          id: 7,
          field: "legal_issues",
          title: "Legal Issues",
          list: []
        },
        {
          id: 8,
          field: "tags",
          title: "Key Terms",
          list: []
        },
        {
          id: 9,
          field: "redaction",
          title: "Redaction",
          list: []
        },
        {
          id: 10,
          field: "reviewers",
          title: "Reviewers",
          list: []
        },
        {
          id: 11,
          field: "labels",
          title: "Document Labels",
          list: []
        }
      ],
      isCallApiGoalsGroupBy: false,
      isLoadingGetGoals: false,
      isLoadingGetTag: false,
      dataCharacter: [],
      isCallAPICharacter: false,
      isCallApiIssueGroupBy: false,
      isCallApiTagsGroupBy: false,
      isCallApiLabelsGroupBy: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters(
      "ht_store/matter/requestStatus/requestSetsItemDocument",
      ["dataRSID", "isLoadingGet", "dataRequestItem"]
    ),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", [
      "dataMembersNotExitsCurrentUser"
    ]),
    mapPrillegeDetail() {
      return (
        this.appConfigChoices[this.appConfigConstants.PRIVILLEGEDETAIL] || []
      ).map(x => ({ id: x.value, name: x.label, color: x.color }));
    }
  },
  methods: {
    showDate(date1, date2) {
      if (date1 && date2 && moment(date1).isBefore(date2)) return "between";
      if (!date1 && date2) return "before";
      if (!date2 && date1) return "after";
      if (date2 && date1) return "date";
      return "no date";
    },
    async getDataTag() {
      if (!this.isCallApiTagCell) {
        this.isCallApiTagCell = true;
        try {
          this.isLoadingGetTag = true;
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          await this.getDataTagRequest({ matterId });
          this.isLoadingGetTag = false;
        } catch (error) {
          this.isLoadingGetTag = false;
        }
      }
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRSID[groupID]) return false;
      const totals = this.dataRSID[groupID].totals;
      const results = this.dataRSID[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchRSID(text) {
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
    async removeRSID(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rSId: this.$route.params.requestSetId,
        itemsId: this.$route.params.requestItemId,
        id: row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeRSIDRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rSId: this.$route.params.requestSetId,
        itemsId: this.$route.params.requestItemId
      };
      return this.getDataRSIDRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRSID(id, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId: this.$route.params.requestItemId,
          id
        },
        body: {
          [name]: value
        }
      };
      this.updateRSIDRequest(data);
    },
    updateTimeRSID(id, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId: this.$route.params.requestItemId,
          id
        },
         body: {
          date_tagged_after: value.date_tagged_after || "",
         date_tagged_before: value.date_tagged_before || ""
        }
      };
      this.updateRSIDRequest(data);
    },
    updateBookmarkRSID(id, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId: this.$route.params.requestItemId,
          id
        },
        body: {
          bookmarked_pk: value
        }
      };
      this.updateBookmarkRSIDRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "privileges":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.PRIVILLEGEDETAIL],
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "custodians":
          if (!this.isCallAPICharacter) {
            this.isCallAPICharacter = true;
            this.dataCharacter = await this.getAllDataCharacterRequest({
              matterId
            });
          }
          groupByCurrent.list = [
            ...this.dataCharacter,
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.pk,
              groupID: x.pk,
              value: x.pk,
              text: x.first_name + x.last_name
            };
          });
          return groupByCurrent;
        case "confident":
          groupByCurrent.list = [
            ...this.appConfigs.listPriority,
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.name
            };
          });
          return groupByCurrent;
        case "authors":
          if (!this.isCallAPICharacter) {
            this.isCallAPICharacter = true;
            this.dataCharacter = await this.getAllDataCharacterRequest({
              matterId
            });
          }
          groupByCurrent.list = [
            ...this.dataCharacter,
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.pk,
              groupID: x.pk,
              value: x.pk,
              text: x.first_name + x.last_name
            };
          });
          return groupByCurrent;
        case "responsive":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.RESPONSIVE],
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "legal_issues":
          if (!this.isCallApiIssueGroupBy) {
            this.isCallApiIssueGroupBy = true;
            const dataIssue = await this.getDataIssuesRequest({ matterId });
            groupByCurrent.list = [
              ...dataIssue,
              { ...nullalbe, value: nullalbe.id }
            ].map(x => {
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
        case "tags":
          if (!this.isCallApiTagsGroupBy) {
            this.isCallApiTagsGroupBy = true;
            const dataTags = await this.getDataTagRequest({ matterId });
            groupByCurrent.list = [
              ...dataTags,
              { ...nullalbe, value: nullalbe.id }
            ].map(x => {
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
        case "redaction":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.REDACTION],
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "reviewers":
          groupByCurrent.list = [
            ...this.dataMembersNotExitsCurrentUser,
            { ...nullalbe, value: nullalbe.id }
          ].map(x => {
            return {
              id: x.id,
              groupID: x.id,
              value: x.id,
              text: x.name
            };
          });
          return groupByCurrent;
        case "labels":
          if (!this.isCallApiLabelsGroupBy) {
            this.isCallApiLabelsGroupBy = true;
            const dataLabels = await this.getDataLabelsRequest({ matterId });
            groupByCurrent.list = [
              ...dataLabels,
              { ...nullalbe, value: nullalbe.id }
            ].map(x => {
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
    async getDataRSID(query, isFirstCall) {
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
    async updateAttachmentRSID(id, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId: this.$route.params.requestItemId,
          id
        },
        body: {
          attachment: value
        }
      };
      await this.updateAttachmentRSIDRequest(data);
    },
    ...mapActions("ht_store/matter/character2", [
      "getAllDataCharacterRequest"
    ]),
    ...mapActions(
      "ht_store/matter/requestStatus/requestSetsItemDocument",
      [
        "getDataRSIDRequest",
        "updateRSIDRequest",
        "removeRSIDRequest",
        "updateBookmarkRSIDRequest",
        // "getRequestItemRequest",
        "updateAttachmentRSIDRequest"
      ]
    ),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/matter/goals", ["getDataGoalsRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataRSID(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    // const rSId = this.$route.params.requestSetId;
    // this.getRequestItemRequest({ matterId, rSId });
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataRSID(query, true);
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
.td-dateTag {
  justify-content: space-between;
  flex-direction: row;
  width: 200px;
  align-items: center;
}
</style>
