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
                dataSustainability[groupItem.groupID]
                ? dataSustainability[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataSustainability[groupItem.groupID]
                ? dataSustainability[groupItem.groupID].totals
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
              dataSustainability[groupItem.groupID]
                ? dataSustainability[groupItem.groupID].results
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
            <template v-slot:item.conclusion="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.conclusion"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.TESTIMONY_CONCLUSION]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Conclusion',
                    name: 'conclusion',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.conclusion,
                    dataList:
                      appConfigChoices[appConfigConstants.TESTIMONY_CONCLUSION]
                  })
                "
              />
            </template>
            <template v-slot:item.practicability="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.practicability"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.TESTIMONY_WITNESSPRACTICABILITY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Practicability',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'practicability',
                    pk: item.pk,
                    value: item.practicability,
                    dataList: appConfigChoices[appConfigConstants.TESTIMONY_WITNESSPRACTICABILITY]
                  })
                "
              />
            </template>
            <template v-slot:item.compellability="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.compellability"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCOMPELLABILITY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Compellability',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'compellability',
                    pk: item.pk,
                    value: item.compellability,
                    dataList: appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCOMPELLABILITY]
                  })
                "
              />
            </template>
            <template v-slot:item.competency="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.competency"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCOMPETENCY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Competency',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'competency',
                    pk: item.pk,
                    value: item.competency,
                    dataList: appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCOMPETENCY]
                  })
                "
              />
            </template>
            <template v-slot:item.geographical="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.geographical"
                :dataList="[
                  NA,
                  ...appConfigChoices[appConfigConstants.TESTIMONY_WITNESSGEOGRAPHICAL]
                ]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Geographical',
                    name: 'geographical',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.geographical,
                    dataList: [
                      NA,
                      ...appConfigChoices[appConfigConstants.TESTIMONY_WITNESSGEOGRAPHICAL]
                    ]
                  })
                "
              />
            </template>
            <template v-slot:item.disputes="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.disputes"
                :dataList="
                  appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCONNECTIONTODISPUTES]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Connection to Disputes',
                    name: 'disputes',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.disputes,
                    dataList:
                      appConfigChoices[appConfigConstants.TESTIMONY_WITNESSCONNECTIONTODISPUTES]
                  })
                "
              />
            </template>

            <template v-slot:item.immunity="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.immunity"
                :dataList="
                  appConfigChoices[appConfigConstants.TESTIMONY_WITNESSIMMUNITY]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Immunity',
                    name: 'immunity',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.immunity,
                    dataList:
                      appConfigChoices[appConfigConstants.TESTIMONY_WITNESSIMMUNITY]
                  })
                "
              />
            </template>
            <template v-slot:item.totals_comment="{ props: { item } }">
              <Comments :totalComments="item.totals_comment" :rowId="item.pk" />
            </template>

            <template v-slot:item.totals_note="{ props: { item } }">
              <Notes :totalNotes="item.totals_note" :rowId="item.pk" />
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/testimony-witness-sustainability/${item.pk}`"
                  routerMutation="ht_store/matter/testimony/witnessSustainability/updateDataTestimony"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Actions
                  :isShowActionView="false"
                  @onClickDelete="
                  actionDetele = { item, name: groupItem.groupID };
                  isShowPopupDelete = true;
                "
                  :isShowActionBookmark="false"
                  :isShowActionFlag="false"
                />
              </div>
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
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import Comments from "./components/witness-sustainability/Comments";
import Notes from "./components/witness-sustainability/Notes";

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
    FormCreateTestimony,
    ButtonLoadMore,
    PopupCreateCharacter,
    TextAreaInline,
    MenuTextArea,
    MenuTextField,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    Actions,
    // Menu
    MenuIssue,
    ConfirmItem,
    Comments,
    Notes
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Witness", value: "name", active: true },
        { text: "Conclusion", value: "conclusion", active: true },
        {
          text: "Witness Practicability",
          value: "practicability",
          active: true
        },
        {
          text: "Witness Compellability",
          value: "compellability",
          active: true
        },
        { text: "Witness Competency", value: "competency", active: true },
        { text: "Witness Geographical", value: "geographical", active: true },
        {
          text: "Witness Connection to Disputes",
          value: "disputes",
          active: true
        },
        { text: "Witness Immunity", value: "immunity", active: true },
        { text: "Comment", value: "totals_comment", active: true },
        { text: "Note", value: "totals_note", active: true },
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
    ...mapGetters("ht_store/matter/testimony/witnessSustainability", [
      "dataSustainability",
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
      if (!this.dataSustainability[groupID]) return false;
      const totals = this.dataSustainability[groupID].totals;
      const results = this.dataSustainability[groupID].results;
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
    ...mapActions("ht_store/matter/testimony/witnessSustainability", [
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
