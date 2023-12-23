<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchWitness"
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
                  dataWitness[groupItem.groupID]
                    ? dataWitness[groupItem.groupID].results.length
                    : 0
                }}
                of
                {{
                  dataWitness[groupItem.groupID]
                    ? dataWitness[groupItem.groupID].totals
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
              dataWitness[groupItem.groupID]
                ? dataWitness[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.witness="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Witness)"
                :value="item.witness"
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuCharacterMixin_openMenu({
                    ...$event,
                    name: 'witness',
                    pk: item.pk,
                    value: item.witness
                  })
                "
              />
            </template>

            <template v-slot:item.party_witness="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.party_witness"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.FAVORABLE_AND_PROVIDEDBY]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Party Witness',
                    name: 'party_witness',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.party_witness,
                    dataList:
                      appConfigChoices[appConfigConstants.FAVORABLE_AND_PROVIDEDBY]
                  })
                "
              />
            </template>

            <template v-slot:item.compel_to_trial="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.compel_to_trial"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Compel to Trial?',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'compel_to_trial',
                    pk: item.pk,
                    value: item.compel_to_trial,
                    dataList: appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                  })
                "
              />
            </template>

            <template v-slot:item.witness_willingness="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.witness_willingness"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Willingness',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'witness_willingness',
                    pk: item.pk,
                    value: item.witness_willingness,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template v-slot:item.witness_reliability="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.witness_reliability"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Reliability',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'witness_reliability',
                    pk: item.pk,
                    value: item.witness_reliability,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template v-slot:item.witness_credibility="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.witness_credibility"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witness Credibility',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'witness_credibility',
                    pk: item.pk,
                    value: item.witness_credibility,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template v-slot:item.witnes_role="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.witnes_role"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Witnes Role',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'witnes_role',
                    pk: item.pk,
                    value: item.witnes_role,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <!-- Related Cell -->
            <template v-slot:item.related_facts="{ props: { item } }">
              <ChipInlineList
                textNoData="(No fact)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.FACT_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuFactMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.FACT_RELATED,
                    pk: item.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.FACT_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>


            <template v-slot:item.action="{ props: { item } }">
              <Actions
                :valueFlag="item.flag"
                :valueBookmark="!!item.bookmarked_pk"
                :isShowActionView="false"
                @onClickFlag="updateWitness(item.pk, 'flag', !item.flag)"
                @onClickDelete="
                  actionDetele = { item, name: groupItem.groupID };
                  isShowPopupDelete = true;
                "
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateWitness
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
        updateWitness(textAreaMenu.pk, textAreaMenu.name, $event);
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
        updateWitness(
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
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
        updateWitness(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removeWitness"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete= false"
    />

    <MenuRelatedCharacter
      keyId="pk"
      :value="relatedCharacterMenu.value"
      :isShowMenu="relatedCharacterMenu.isShowMenu"
      :positionX="relatedCharacterMenu.positionX"
      :positionY="relatedCharacterMenu.positionY"
      :isLoadingGet="isLoadingGetCharacter"
      @select="
        $_toggleMenuCharacterMixin_addValue($event, ['pk', 'name']);
        updateWitness(relatedCharacterMenu.pk, relatedCharacterMenu.name, relatedCharacterMenu.value);
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        updateWitness(relatedCharacterMenu.pk, relatedCharacterMenu.name, relatedCharacterMenu.value);
      "
    />

    <MenuRelatedFact
      keyId="pk"
      :value="relatedFactMenu.value"
      :isShowMenu="relatedFactMenu.isShowMenu"
      :positionX="relatedFactMenu.positionX"
      :positionY="relatedFactMenu.positionY"
      :isLoadingGet="isLoadingGetFact"
      @select="
        $_toggleMenuFactMixin_addValue($event);
        updateRelated(
          appConfigConstants.FACT_RELATED,
          relatedFactMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuFactMixin_removeValue($event);
        removeRelated(
          appConfigConstants.FACT_RELATED,
          relatedFactMenu.pk,
          $event
        );
      "
      @closeMenu="relatedFactMenu.isShowMenu = false"
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
import { NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";

//form
import FormCreateWitness from "./components/witness/FormCreateWitness";
import PopupCreateCharacter from "../Character/components/PopupCreateCharacter";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";

// mixins
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";

export default {
  mixins: [
    toggleMenuTextArea,
    toggleMenuSelectBox,
    appConfigMixin,
    toggleMenuTextField,
    toggleMenuIssueMixin,
    toggleMenuCharacterMixin,
    toggleMenuFactMixin
  ],
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    FormCreateWitness,
    ButtonLoadMore,
    PopupCreateCharacter,
    MenuTextArea,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    Actions,
    ChipInlineList,
    // Menu
    MenuIssue,
    ConfirmItem,
    MenuRelatedCharacter,
    MenuRelatedFact,
  },
  data() {
    return {
      NA,
      panel: [0],
      headerStackColumn: [],
      headers: [
        { text: "Witness", value: "witness", active: true },
        { text: "Party Witness", value: "party_witness", active: true },
        { text: "Witness Jurisidiction", value: "witness_jurisidiction", active: true },
        { text: "Compel to Trial?", value: "compel_to_trial", active: true },
        { text: "Witness Willingness", value: "witness_willingness", active: true },
        { text: "Witness Reliability", value: "witness_reliability", active: true },
        { text: "Witness Credibility", value: "witness_credibility", active: true },
        { text: "Witnes Role", value: "witnes_role", active: true },
        { text: "Witness Legal Issue Role", value: "witness_legal_issue_role", active: true },
        { text: "Related Facts", value: "related_facts", active: true },
        { text: "Related Formal Witness ", value: "related_formal_testimony ", active: true },
        { text: "Related Disputed Questions", value: "related_disputed_questions", active: true },
        { text: "Comment", value: "total_comment", active: true },
        {
          text: "Note",
          value: "total_note",
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
        },
        {
          id: 2,
          field: "witness",
          title: "Witness",
          list: []
        },
        {
          id: 3,
          field: "party_witness",
          title: "Party Witness",
          list: []
        },
        {
          id: 4,
          field: "compel_to_trial",
          title: "Compel to Trial?",
          list: []
        },
        {
          id: 5,
          field: "witness_willingness",
          title: "Witness Willingness",
          list: []
        },
        {
          id: 6,
          field: "witness_reliability",
          title: "Witness Reliability",
          list: []
        },
        {
          id: 7,
          field: "witness_credibility",
          title: "Witness Credibility",
          list: []
        },
        {
          id: 8,
          field: "witnes_role",
          title: "Witnes Role",
          list: []
        },
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiMemberGroupBy: false,

      //character
      isShowAddCharacter: false,

      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false,
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/testimony/witness", [
      "dataWitness",
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
    showDetail(witnessId) {
      this.$router.push({
        name: "detailWitness",
        params: {
          witnessId
        }
      });
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataWitness[groupID]) return false;
      const totals = this.dataWitness[groupID].totals;
      const results = this.dataWitness[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchWitness(text) {
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
    async removeWitness() {
      const { item, name } = this.actionDetele;
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        witnessId: item.pk
      };
      data.isFieldArray = Array.isArray(item[this.groupBy.field]);
      try {
        this.isLoadingDelete = true;
        await this.removeWitnessRequest(data);
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
      return this.getDataWitnessRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateWitness(witnessId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          witnessId
        },
        body: {
          [name]: value
        }
      };
      this.updateWitnessRequest(data);
    },

    updateRelated(type, witnessId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          witnessId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        }
      };
      this.updateRelationWitnessRequest(data);
    },

    removeRelated(type, witnessId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        witnessId,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationWitnessRequest(data);
    },

    resetFields({ fields }) {
      this.headers = fields;
    },
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
    async getDataWitness(query, isFirstCall) {
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
    ...mapActions("ht_store/matter/testimony/witness", [
      "getDataWitnessRequest",
      "updateWitnessRequest",
      "removeWitnessRequest",
      "getFactDetailRequest",
      //relation
      "updateRelationWitnessRequest",
      "removeRelationWitnessRequest"
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
      this.getDataWitness(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataWitness(query, true);
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
