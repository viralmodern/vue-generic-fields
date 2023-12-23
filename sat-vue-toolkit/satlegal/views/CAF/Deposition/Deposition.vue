<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchDeposition"
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
    <v-expansion-panels
      class="v-expansion-panels--custom"
      multiple
      v-model="panel"
    >
      <v-expansion-panel
        style="width:100vh"
        v-for="(groupItem, i) in groupBy.list"
        :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">
              {{ groupItem.text }}
            </div>
            <div class="flex-grow-1"></div>
            <v-chip
              class="ml-2 text-body-2 badge"
              small
              style="position:sticky; right: 40px;"
            >
              <span class="font-weight-bold mr-2"
                >{{
                  dataDeposition[groupItem.groupID]
                    ? dataDeposition[groupItem.groupID].results.length
                    : 0
                }}
                of
                {{
                  dataDeposition[groupItem.groupID]
                    ? dataDeposition[groupItem.groupID].totals
                    : 0
                }}
                items</span
              >
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
              dataDeposition[groupItem.groupID]
                ? dataDeposition[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.deponent_type="{ props: { item } }">
              <ChipJoinMenuSelectBox
                keyValue="value"
                keyText="label"
                :value="item.deponent_type"
                :dataList="[
                  NA,
                  ...appConfigChoices[appConfigConstants.DEPOSITION_TYPE]
                ]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Deponent Type',
                    name: 'deponent_type',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.deponent_type,
                    dataList: [
                      NA,
                      ...appConfigChoices[appConfigConstants.DEPOSITION_TYPE]
                    ]
                  })
                "
              />
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
                :dataList="appConfigChoices[appConfigConstants.DEPOSITION_PRIORITY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Deponent Priority',
                    name: 'priority',
                    keyValue: 'value',
                    keyText: 'label',
                    pk: item.pk,
                    value: item.priority,
                    dataList: appConfigChoices[appConfigConstants.DEPOSITION_PRIORITY]
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
                @update="updateDeposition(item.pk, 'legal_counsels', $event)"
              />
            </template>

            <template v-slot:item.time="{ props: { item } }">
              <ChooseDateTimePicker
                :isActions="true"
                :title="item.time ? 'Update time' : 'Add time'"
                :date="item.time"
                :nameButtonSubmit="item.time ? 'Update' : 'Add'"
                @update="updateDeposition(item.pk, 'time', $event)"
              />
            </template>

            <template v-slot:item.members="{ props: { item } }">
              <Members
                :value="item.members"
                @update="updateDeposition(item.pk, 'members', $event)"
              />
            </template>

            <template v-slot:item.length="{ props: { item } }">
              <MenuInputHours
                :value="item.length"
                :min="0.5"
                :max="7"
                @update="updateDeposition(item.pk, 'length', $event)"
              />
            </template>

            <template v-slot:item.labels="{ props: { item } }">
              <Label
                :value="item.labels"
                @update="updateDeposition(item.pk, 'labels', $event)"
              />
            </template>

            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                @update="updateDeposition(item.pk, 'legal_issues', $event)"
              />
            </template>

            <template v-slot:item.name="{ props: { item } }">
              <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/updateDataDeposition"
                  :pk="item.pk"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
              <Flag
                class="mr-2"
                @showDetail="showDetail(item.pk)"
                :isShowDetail="true"
                :isShowBookmark="false"
                :isShowFlag="false"
              />
              <TextInline
                textNodata="(No name)"
                :value="item.name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Name',
                    name: 'name',
                    pk: item.pk,
                    value: item.name
                  })
                "
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <div style="width:350px">
                <RichTextArea
                  :value="item.desc"
                  @update="updateDeposition(item.pk, 'desc', $event)"
                />
              </div>
            </template>
            <template v-slot:item.deponent="{ props: { item } }">
              <RelatedCharacter
                :value="item.deponent"
                single
                @update="updateDeposition(item.pk, 'deponent', $event)"
                @onClickAdd="isShowAddCharacter = true"
                :isShowAction="true"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <Action
                :item="item"
                @remove="removeDeposition(groupItem.groupID, item, $event)"
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateDeposition
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
        updateDeposition(textAreaMenu.pk, textAreaMenu.name, $event);
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
        updateDeposition(
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );"
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
        updateDeposition(textFieldMenu.pk, textFieldMenu.name, $event);
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
import { nullalbe, NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import MenuInputHours from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MenuInputHours";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateDeposition from "./components/deposition/FormCreateDeposition";
import PopupCreateCharacter from "../Character/components/PopupCreateCharacter";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";

// mixins
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [toggleMenuTextArea, toggleMenuSelectBox, appConfigMixin, toggleMenuTextField],
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
    Flag,
    Action,
    Members,
    FormCreateDeposition,
    ButtonLoadMore,
    ChooseDateTimePicker,
    MenuInputHours,
    PopupCreateCharacter,
    TextAreaInline,
    TextInline,
    MenuTextArea,
    MenuTextField,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    BookmarkOrFlag
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Name", value: "name", active: true },
        { text: "Deponent", value: "deponent", active: true },
        { text: "Deponent Type", value: "deponent_type", active: true },
        { text: "Deposition Location", value: "location", active: true },
        { text: "Legal Counsel ", value: "legal_counsels", active: true },
        { text: "Depose Time", value: "time", active: true },
        { text: "Deposition Length", value: "length", active: true },
        { text: "Deposition Method", value: "method", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Deposition Priority", value: "priority", active: true },
        { text: "Assigned Member", value: "members", active: true },
        { text: "Label", value: "labels", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
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
          field: "deponent",
          title: "Deponent",
          list: []
        },
        {
          id: 3,
          field: "deponent_type",
          title: "Deponent Type",
          list: []
        },
        {
          id: 4,
          field: "method",
          title: "Method",
          list: []
        },
        {
          id: 5,
          field: "priority",
          title: "Priority",
          list: []
        },
        {
          id: 6,
          field: "members",
          title: "Assigned Member",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiMemberGroupBy: false,

      //character
      isShowAddCharacter: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition", [
      "dataDeposition",
      "isLoadingGet",
      "factDetail"
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
        name: "detailDeposition",
        params: {
          depositionId
        }
      });
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataDeposition[groupID]) return false;
      const totals = this.dataDeposition[groupID].totals;
      const results = this.dataDeposition[groupID].results;
      return totals > 20 && totals > results.length;
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
    async removeDeposition(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: row.pk
      };
      data.isFieldArray = Array.isArray(
        row[
          this.groupBy.field === "characters__character"
            ? "characters"
            : this.groupBy.field
        ]
      );
      await this.removeDepositionRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataDepositionRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateDeposition(depositionId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId
        },
        body: {
          [name]: value
        }
      };
      this.updateDepositionRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
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
    async getDataDeposition(query, isFirstCall) {
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
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value,
      };
      await this.updateReportRequest(data);
    },
    ...mapActions("ht_store/matter/deposition", [
      "getDataDepositionRequest",
      "updateDepositionRequest",
      "removeDepositionRequest",
      "getFactDetailRequest",
      "updateReportRequest"
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
      this.getDataDeposition(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataDeposition(query, true);
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
  width:350px;
  word-break: break-all;
}
</style>
