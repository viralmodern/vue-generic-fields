<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchTestimony"
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
                dataTestimony[groupItem.groupID]
                ? dataTestimony[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataTestimony[groupItem.groupID]
                ? dataTestimony[groupItem.groupID].totals
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
              dataTestimony[groupItem.groupID]
                ? dataTestimony[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Formal Testimony)"
                  :value="item.name"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Formal Testimony)',
                      name: 'name',
                      pk: item.pk,
                      value: item.name
                    })
                  "
                />
              </div>
            </template>

            <template v-slot:item.made_on="{ props: { item } }">
              <ChooseDatePicker
                :date="item.made_on"
                :isFormatChooseISOString="false"
                format="DD MM YYYY"
                @update="updateTestimony(item.pk, 'made_on', $event)"
              />
            </template>

            <template v-slot:item.made_on="{ props: { item } }">
              <ChooseDatePicker
                :date="item.made_on"
                :isFormatChooseISOString="false"
                format="DD MM YYYY"
                @update="updateTestimony(item.pk, 'made_on', $event)"
              />
            </template>

            <template v-slot:item.under_oath="{ props: { item } }">
              <Disputed
                :value="item.under_oath"
                @update="updateTestimony(item.pk, 'under_oath', $event)"
              />
            </template>

            <template v-slot:item.legal_issues="{ props: { item } }">
              <TagableIssue
                :tag="item.legal_issues"
                @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: item.pk,
                  })
                "
              />
            </template>

            <template v-slot:item.perjury_risk="{ props: { item } }">
              <FlagBtn :isActive="item.perjury_risk" />
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
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.favorable,
                    dataList:
                      appConfigChoices[appConfigConstants.FAVORABLE_AND_PROVIDEDBY]
                  })
                "
              />
            </template>
            <template v-slot:item.relevant="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.relevant"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Relevant',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'relevant',
                    pk: item.pk,
                    value: item.relevant,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>
            <template v-slot:item.importance="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.importance"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Importance',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'importance',
                    pk: item.pk,
                    value: item.importance,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>
            <template v-slot:item.materiality="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.materiality"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Materiality',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'materiality',
                    pk: item.pk,
                    value: item.materiality,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template v-slot:item.testifier_first_hand_knowledge="{ props: { item } }">
              <Disputed :value="item.testifier_first_hand_knowledge" />
            </template>

            <template v-slot:item.method="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.method"
                :dataList="[
                  NA,
                  ...appConfigChoices[appConfigConstants.DEPOSITION_METHOD]
                ]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Deponent Method',
                    name: 'method',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.method,
                    dataList: [
                      NA,
                      ...appConfigChoices[appConfigConstants.DEPOSITION_METHOD]
                    ]
                  })
                "
              />
            </template>
            <template v-slot:item.priority="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.priority"
                :dataList="
                  appConfigChoices[appConfigConstants.DEPOSITION_PRIORITY]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Deponent Priority',
                    name: 'priority',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.priority,
                    dataList:
                      appConfigChoices[appConfigConstants.DEPOSITION_PRIORITY]
                  })
                "
              />
            </template>
            <template v-slot:item.location="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No location)"
                  :value="item.location"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Location',
                      name: 'location',
                      pk: item.pk,
                      value: item.location
                    })
                  "
                />
              </div>
            </template>

            <template v-slot:item.legal_counsels="{ props: { item } }">
              <RelatedCharacter
                :value="item.legal_counsels"
                @update="updateTestimony(item.pk, 'legal_counsels', $event)"
              />
            </template>

            <template v-slot:item.time="{ props: { item } }">
              <ChooseDateTimePicker
                :isActions="true"
                :title="item.time ? 'Update time' : 'Add time'"
                :date="item.time"
                :nameButtonSubmit="item.time ? 'Update' : 'Add'"
                @update="updateTestimony(item.pk, 'time', $event)"
              />
            </template>

            <template v-slot:item.members="{ props: { item } }">
              <Members :value="item.members" @update="updateTestimony(item.pk, 'members', $event)" />
            </template>

            <template v-slot:item.length="{ props: { item } }">
              <MenuInputHours
                :value="item.length"
                :min="0.5"
                :max="7"
                @update="updateTestimony(item.pk, 'length', $event)"
              />
            </template>

            <template v-slot:item.labels="{ props: { item } }">
              <Label :value="item.labels" @update="updateTestimony(item.pk, 'labels', $event)" />
            </template>

            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                @update="updateTestimony(item.pk, 'legal_issues', $event)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <div style="width:350px">
                <RichTextArea
                  :value="item.desc"
                  @update="updateTestimony(item.pk, 'desc', $event)"
                />
              </div>
            </template>
            <template v-slot:item.deponent="{ props: { item } }">
              <RelatedCharacter
                :value="item.deponent"
                single
                @update="updateTestimony(item.pk, 'deponent', $event)"
                @onClickAdd="isShowAddCharacter = true"
                :isShowAction="true"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <Actions
                :valueFlag="item.flag"
                :valueBookmark="!!item.bookmarked_pk"
                :isShowActionView="false"
                @onClickFlag="updateTestimony(item.pk, 'flag', !item.flag)"
                @onClickDelete="
                  actionDetele = { item, name: groupItem.groupID };
                  isShowPopupDelete = true;
                "
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateTestimony
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
    <PopupCreateCharacter
      :isShow="isShowAddCharacter"
      title="Add new Character"
      @close="isShowAddCharacter = false"
      @submit="createCharacter"
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
        updateTestimony(textAreaMenu.pk, textAreaMenu.name, $event);
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
        updateTestimony(
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
      "
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
        updateTestimony(textFieldMenu.pk, textFieldMenu.name, $event);
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
        updateTestimony(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removeTestimony"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete= false"
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
import { nullalbe, NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import MenuInputHours from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MenuInputHours";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import ChooseDatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDatePicker";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import FlagBtn from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/FlagBtn";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";

//form
import FormCreateTestimony from "./components/list/FormCreateTestimony";
import PopupCreateCharacter from "../Character/components/PopupCreateCharacter";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";

// mixins
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";

export default {
  mixins: [
    toggleMenuTextArea,
    toggleMenuSelectBox,
    appConfigMixin,
    toggleMenuTextField,
    toggleMenuIssueMixin
  ],
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    RichTextArea,
    RelatedCharacter,
    Issue,
    Label,
    Members,
    FormCreateTestimony,
    ButtonLoadMore,
    ChooseDateTimePicker,
    MenuInputHours,
    PopupCreateCharacter,
    TextAreaInline,
    MenuTextArea,
    MenuTextField,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    ChooseDatePicker,
    Disputed,
    FlagBtn,
    TagableIssue,
    Actions,
    // Menu
    MenuIssue,
    ConfirmItem
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Formal Testimony", value: "name", active: true },
        { text: "Created by", value: "created_by", active: true },
        { text: "Created on", value: "created_on", active: true },
        { text: "Made on", value: "made_on", active: true },
        { text: "Under Oath?", value: "under_oath", active: true },
        { text: "By Testifier", value: "by_testifier", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
        { text: "Perjury Risk", value: "perjury_risk", active: true },
        { text: "Source", value: "source", active: true },
        { text: "Favorable", value: "favorable", active: true },
        { text: "Relevant", value: "relevant", active: true },
        { text: "Importance", value: "importance", active: true },
        { text: "Materiality", value: "materiality", active: true },
        {
          text: "Testifier First Hand Knowledge",
          value: "testifier_first_hand_knowledge",
          active: true
        },
        {
          text: "Impact on Matter Outcome",
          value: "impact_on_matter_outcome",
          active: true
        },
        { text: "Related Facts", value: "related_facts", active: true },
        { text: "Related Evidences", value: "related_evidences", active: true },
        { text: "Related Docket", value: "related_docket", active: true },
        {
          text: "Related Request Status ",
          value: "related_request_status ",
          active: true
        },
        {
          text: "Related Deposition ",
          value: "related_deposition ",
          active: true
        },
        { text: "Related Document ", value: "related_document ", active: true },
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
          field: "under_oath",
          title: "Under Oath?",
          list: []
        },
        {
          id: 3,
          field: "by_testifier",
          title: "By Testifier",
          list: []
        },
        {
          id: 4,
          field: "legal_issues",
          title: "Legal Issue",
          list: []
        },
        {
          id: 5,
          field: "perjury_risk",
          title: "Perjury Risk",
          list: []
        },
        {
          id: 6,
          field: "source",
          title: "Source",
          list: []
        },
        {
          id: 7,
          field: "favorable",
          title: "Favorable",
          list: []
        },
        {
          id: 8,
          field: "relevant",
          title: "Relevant",
          list: []
        },
        {
          id: 9,
          field: "importance",
          title: "Importance",
          list: []
        },
        {
          id: 10,
          field: "materiality",
          title: "Materiality",
          list: []
        },
        {
          id: 11,
          field: "Testifier First Hand Knowledge",
          title: "testifier_first_hand_knowledge",
          list: []
        },
        {
          id: 12,
          field: "impact_on_matter_outcome",
          title: "Impact on Matter Outcome",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiMemberGroupBy: false,

      //character
      isShowAddCharacter: false,

      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/testimony/list", [
      "dataTestimony",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    ...mapGetters("ht_store/matter", ["dataMatter"])
  },
  methods: {
    findMatter(matterId) {
      const findMatter = this.dataMatter.find(x => x.id === matterId);
      return findMatter || {};
    },
    showDetail(depositionId) {
      this.$router.push({
        name: "detailTestimony",
        params: {
          depositionId
        }
      });
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataTestimony[groupID]) return false;
      const totals = this.dataTestimony[groupID].totals;
      const results = this.dataTestimony[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchTestimony(text) {
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
    async removeTestimony() {
      const { item, name } = this.actionDetele;
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: item.pk
      };
      data.isFieldArray = Array.isArray(item[this.groupBy.field]);
      try {
        this.isLoadingDelete = true;
        await this.removeTestimonyRequest(data);
        this.isLoadingDelete = false;
        this.isShowPopupDelete = false;
      } catch (error) {
        this.isLoadingDelete = false;
        throw error;
      }
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataTestimonyRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateTestimony(depositionId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId
        },
        body: {
          [name]: value
        }
      };
      this.updateTestimonyRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId =
        this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "deponent_type":
          groupByCurrent.list = [
            ...this.appConfigs.deponentType,
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
        case "method":
          groupByCurrent.list = [
            ...this.appConfigs.depositionMethod,
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
        case "priority":
          groupByCurrent.list = [
            ...this.appConfigs.depositionPriority,
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
        case "members":
          if (!this.isCallApiMemberGroupBy) {
            this.isCallApiMemberGroupBy = true;
            await this.getDataMembersRequest({
              matterId
            });
            groupByCurrent.list = [...this.dataMembers, nullalbe].map(x => {
              return {
                id: x.id,
                groupID: x.id,
                value: x.id,
                text: x.name
              };
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        case "deponent":
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
    async getDataTestimony(query, isFirstCall) {
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

    // create character
    createCharacter(body) {
      // console.log("Data", data)
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId
        },
        body
      };
      this.addCharacterNoGroupByRequest(data);
    },
    ...mapActions("ht_store/matter/testimony/list", [
      "getDataTestimonyRequest",
      "updateTestimonyRequest",
      "removeTestimonyRequest",
      "getFactDetailRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character2", [
      "getAllDataCharacterRequest",
      "addCharacterNoGroupByRequest"
    ])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataTestimony(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataTestimony(query, true);
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
