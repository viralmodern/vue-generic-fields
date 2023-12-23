<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput placeholder="Search evidences" />
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
                dataEvidences[groupItem.groupID]
                ? dataEvidences[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataEvidences[groupItem.groupID]
                ? dataEvidences[groupItem.groupID].totals
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
              dataEvidences[groupItem.groupID]
                ? dataEvidences[groupItem.groupID].results
                : []
            "
            :loading="isLoading[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextArea :value="item.name" @update="updateEvidences(item.pk, 'name', $event)" />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateEvidences(item.pk, 'desc', $event)" />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <Issue
                :value="item.legal_issues"
                @update="updateEvidences(item.pk, 'legal_issues', $event)"
              />
            </template>
            <template v-slot:item.creator="{ props: { item } }">
              <CreatedBy :members="members" :value="item" keyText="creator" />
            </template>
            <template v-slot:item.provided_by="{ props: { item } }">
              <CharacterSingles
                textTooltip="select provided by"
                :value="item.provided_by_character"
                @update="updateEvidences(item.pk, 'provided_by_character', $event)"
              />
            </template>
            <template v-slot:item.provided_by_party="{ props: { item } }">
              <SelectCheckBox
                title="Provided By Party"
                :value="item.provided_by"
                :dataList="appConfigs.favorableEvidences"
                @update="updateEvidences(item.pk, 'provided_by', $event.id)"
              />
            </template>
            <template v-slot:item.favorable="{ props: { item } }">
              <SelectCheckBox
                title="Favorable"
                :value="item.favorable"
                :dataList="appConfigs.favorableEvidences"
                @update="updateEvidences(item.pk, 'favorable', $event.id)"
              />
            </template>
            <template v-slot:item.disputed="{ props: { item } }">
              <Disputed
                :value="item.disputed"
                @update="updateEvidences(item.pk, 'disputed', $event)"
              />
            </template>
            <template v-slot:item.tags="{ props: { item } }">
              <Tags :value="item.tags" @update="updateEvidences(item.pk, 'tags', $event)" />
            </template>
            <template v-slot:item.relevance="{ props: { item } }">
              <Range
                :value="item.relevance"
                @update="updateEvidences(item.pk, 'relevance', $event)"
              />
            </template>
            <template v-slot:item.materiality="{ props: { item } }">
              <Range
                :value="item.materiality"
                @update="updateEvidences(item.pk, 'materiality', $event)"
              />
            </template>
            <template v-slot:item.admissibility="{ props: { item } }">
              <Range
                :value="item.admissibility"
                @update="updateEvidences(item.pk, 'admissibility', $event)"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                @update="updateEvidences(item.pk, 'total_comments', $event)"
                :rowId="item.pk"
                :matterId="$route.params.matter || $route.params.projectId"
              />
            </template>

            <template v-slot:item.important_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.important_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Important Level',
                    name: 'important_level',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.important_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.relevance_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.relevance_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Relevance Level',
                    name: 'relevance_level',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.relevance_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.materiality_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.materiality_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Materiality Level',
                    name: 'materiality_level',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.materiality_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.admissibility_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.admissibility_level"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Admissibility Level',
                    name: 'admissibility_level',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.admissibility_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]]
                  })
                "
              />
            </template>
            <template v-slot:item.included_trial="{ props: { item } }">
              <Disputed
                :value="item.included_trial"
                @update="updateEvidences(item.pk, 'included_trial', $event)"
              />
            </template>

            <template v-slot:item.assigned_members="{ props: { item } }">
              <Members
                textTooltip="Assigned Members"
                :value="item.members"
                @update="updateEvidences(item.pk, 'members', $event)"
              />
            </template>

            <!-- Related Cell -->
            <template v-slot:item.related_fact="{ props: { item } }">
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

            <template v-slot:item.related_deposition="{ props: { item } }">
              <ChipInlineList
                textNoData="(No deposition)"
                :value="
            $_appConfigMixin_filterValueByContentType(
              appConfigConstants.DEPOSITION_RELATED,
              item.relations_info
            )
          "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
          $_toggleMenuDepositionMixin_openMenu({
            ...$event,
            name: appConfigConstants.DEPOSITION_RELATED,
            pk: item.pk,
            value: $_appConfigMixin_filterValueByContentType(
              appConfigConstants.DEPOSITION_RELATED,
              item.relations_info
            )
          })
        "
              />
            </template>
            <template v-slot:item.related_docket="{ props: { item } }">
              <ChipInlineList
                textNoData="(No docket)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.DOCKET_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="description"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuDocketMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.DOCKET_RELATED,
                    pk: item.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DOCKET_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>
            <template v-slot:item.related_characters="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Characters)"
                :value="
            $_appConfigMixin_filterValueByContentType(
              appConfigConstants.CHARACTER_RELATED,
              item.relations_info
            ).map(v => ({...v, name: v.first_name || v.name}))
          "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
          $_toggleMenuCharacterMixin_openMenu({
            ...$event,
            name: appConfigConstants.CHARACTER_RELATED,
            pk: item.pk,
            value: $_appConfigMixin_filterValueByContentType(
              appConfigConstants.CHARACTER_RELATED,
              item.relations_info
            )
          })
        "
              />
            </template>
            <template v-slot:item.related_request_set="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Request Set)"
                :value="
            $_appConfigMixin_filterValueByContentType(
              appConfigConstants.REQUEST_SET_RELATED,
              item.relations_info
            )
          "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
          $_toggleMenuRequestSetMixin_openMenu({
            ...$event,
            name: appConfigConstants.REQUEST_SET_RELATED,
            pk: item.pk,
            value: $_appConfigMixin_filterValueByContentType(
              appConfigConstants.REQUEST_SET_RELATED,
              item.relations_info
            )
          })
        "
              />
            </template>
            <template v-slot:item.related_request_set_item="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Request Set Item)"
                :value="
            $_appConfigMixin_filterValueByContentType(
              appConfigConstants.REQUEST_SET_ITEM_RELATED,
              item.relations_info
            )
          "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
          $_toggleMenuRequestSetItemMixin_openMenu({
            ...$event,
            name: appConfigConstants.REQUEST_SET_ITEM_RELATED,
            pk: item.pk,
            value: $_appConfigMixin_filterValueByContentType(
              appConfigConstants.REQUEST_SET_ITEM_RELATED,
              item.relations_info
            )
          })
        "
              />
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
               <BookmarkOrFlag
                :valueBookmark="item.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/evidences/${item.pk}`"
                routerMutation="ht_store/matter/evidences/updateEvidences"
                :pk="item.pk"
                :valueFlag="item.reported_object && item.reported_object.pk"
              />
                <Flag
                  class="mr-2"
                  @showDetail="showDetail(groupItem.groupID, item.pk)"
                  :isShowDetail="true"
                  :isShowBookmark="false"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeKeyPleading(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreatedEvidences />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="isShowButtonLoadMore(groupItem.groupID)"
                ref="refLoadMore"
                @onPageChanged="loadMore($event, groupItem)"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <EvidenceDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :evidenceId="evidenceId"
      @remove="removeDetail"
      @updateEvidences="updateEvidences"
      @updateSelectBox="$_toggleMenuSelectBox_openMenu"
      @updateCharacters="$_toggleMenuCharacterMixin_openMenu"
      @updateDocket="$_toggleMenuDocketMixin_openMenu"
      @updateFacts="$_toggleMenuFactMixin_openMenu"
      @updateDeposition="$_toggleMenuDepositionMixin_openMenu"
      @updateRequestSet="$_toggleMenuRequestSetMixin_openMenu"
      @updateRequestSetItem="$_toggleMenuRequestSetItemMixin_openMenu"
      @updateReports="updateReports"
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
          relatedFactMenu,
          $event
        );
      "
      @remove="
        $_toggleMenuFactMixin_removeValue($event);
        removeRelated(
          appConfigConstants.FACT_RELATED,
          relatedFactMenu,
          $event
        );
      "
      @closeMenu="relatedFactMenu.isShowMenu = false"
    />
    <MenuRelatedDeposition
      keyId="pk"
      :value="relatedDepositionMenu.value"
      :isShowMenu="relatedDepositionMenu.isShowMenu"
      :positionX="relatedDepositionMenu.positionX"
      :positionY="relatedDepositionMenu.positionY"
      :isLoadingGet="isLoadingGetDeposition"
      @select="
        $_toggleMenuDepositionMixin_addValue($event);
        updateRelated(
          appConfigConstants.DEPOSITION_RELATED,
          relatedDepositionMenu,
          $event
        );
      "
      @remove="
        $_toggleMenuDepositionMixin_removeValue($event);
        removeRelated(
          appConfigConstants.DEPOSITION_RELATED,
          relatedDepositionMenu,
          $event
        );
      "
      @closeMenu="relatedDepositionMenu.isShowMenu = false"
    />
    <MenuRelatedCharacter
      keyId="pk"
      :value="relatedCharacterMenu.value"
      :isShowMenu="relatedCharacterMenu.isShowMenu"
      :positionX="relatedCharacterMenu.positionX"
      :positionY="relatedCharacterMenu.positionY"
      :isLoadingGet="isLoadingGetCharacter"
      @select="
        $_toggleMenuCharacterMixin_addValue($event);
        updateRelated(
          appConfigConstants.CHARACTER_RELATED,
          relatedCharacterMenu,
          $event
        );
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        removeRelated(
          appConfigConstants.CHARACTER_RELATED,
          relatedCharacterMenu,
          $event
        );
      "
    />
    <MenuRelatedRequestSet
      keyId="pk"
      :value="relatedRequestSetMenu.value"
      :isShowMenu="relatedRequestSetMenu.isShowMenu"
      :positionX="relatedRequestSetMenu.positionX"
      :positionY="relatedRequestSetMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSet"
      @select="
        $_toggleMenuRequestSetMixin_addValue($event);
        updateRelated(
          appConfigConstants.REQUEST_SET_RELATED,
          relatedRequestSetMenu,
          $event
        );
      "
      @remove="
        $_toggleMenuRequestSetMixin_removeValue($event);
        removeRelated(
          appConfigConstants.REQUEST_SET_RELATED,
          relatedRequestSetMenu,
          $event
        );
      "
      @closeMenu="relatedRequestSetMenu.isShowMenu = false"
    />
    <MenuRelatedRequestSetItem
      keyId="pk"
      :value="relatedRequestSetItemMenu.value"
      :isShowMenu="relatedRequestSetItemMenu.isShowMenu"
      :positionX="relatedRequestSetItemMenu.positionX"
      :positionY="relatedRequestSetItemMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItem"
      @select="
        $_toggleMenuRequestSetItemMixin_addValue($event);
        updateRelated(
          appConfigConstants.REQUEST_SET_ITEM_RELATED,
          relatedRequestSetItemMenu,
          $event
        );
      "
      @remove="
        $_toggleMenuRequestSetItemMixin_removeValue($event);
        removeRelated(
          appConfigConstants.REQUEST_SET_ITEM_RELATED,
          relatedRequestSetItemMenu,
          $event
        );
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
        updateEvidences(menuSelectBox.pk, menuSelectBox.name, $event[menuSelectBox.keyValue])
      "
    />
    <MenuRelatedDocket
      keyId="pk"
      :value="relatedDocketMenu.value"
      :isShowMenu="relatedDocketMenu.isShowMenu"
      :positionX="relatedDocketMenu.positionX"
      :positionY="relatedDocketMenu.positionY"
      :isLoadingGet="isLoadingGetDocket"
      @select="
        $_toggleMenuDocketMixin_addValue($event);
        updateRelated(
          appConfigConstants.DOCKET_RELATED,
          relatedDocketMenu,
          $event,
          'description'
        );
      "
      @remove="
        $_toggleMenuDocketMixin_removeValue($event);
        removeRelated(
          appConfigConstants.DOCKET_RELATED,
          relatedDocketMenu,
          $event
        );
      "
      @closeMenu="relatedDocketMenu.isShowMenu = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cell
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Comments from "./Comments";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
// import evidencesDetail from "@/sat-vue-toolkit/satlegal/ht_components/links/evidencesDetail";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import EvidenceDetail from "./Detail/";
//create
import FormCreatedEvidences from "../FormCreatedEvidences";
//menus
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";
import MenuRelatedDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/MenuRelatedDeposition";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import MenuRelatedRequestSetItem from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/MenuRelatedRequestSetItem";
import MenuRelatedDocket from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/MenuRelatedDocket";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// mixins
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";
import toggleMenuDepositionMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/mixins/toggleMenuDepositionMixin";
import toggleMenuEvidenceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/mixins/toggleMenuEvidenceMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";
import toggleMenuRequestSetItemMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/mixins/toggleMenuRequestSetItemMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuDocketMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/mixins/toggleMenuDocketMixin";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";

export default {
  name: "Clients",
  mixins: [
    appConfigMixin,
    toggleMenuFactMixin,
    toggleMenuDepositionMixin,
    toggleMenuEvidenceMixin,
    toggleMenuCharacterMixin,
    toggleMenuRequestSetMixin,
    toggleMenuRequestSetItemMixin,
    toggleMenuDocketMixin,
    toggleMenuSelectBox
  ],
  components: {
    TableGrid,
    TextArea,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    SearchInput,
    CreatedBy,
    CharacterSingles,
    Disputed,
    Comments,
    Tags,
    Range,
    Members,
    Action,
    Flag,
    ButtonLoadMore,
    // evidencesDetail,
    FormCreatedEvidences,
    SelectCheckBox,
    Issue,
    ChipInlineList,
    MenuRelatedFact,
    MenuRelatedDeposition,
    MenuRelatedRequestSet,
    MenuRelatedCharacter,
    MenuRelatedRequestSetItem,
    MenuRelatedDocket,
    MenuDropDownGroupBy,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    EvidenceDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Evidence Name", value: "name", active: true },
        { text: "Evidence Description", value: "desc", active: true },
        { text: "Created by", value: "creator", active: true },
        { text: "Provided by", value: "provided_by", active: true },
        {
          text: "Provided by Party",
          value: "provided_by_party",
          active: true
        },
        { text: "Favorable", value: "favorable", active: true },
        { text: "Dispute?", value: "disputed", active: true },
        { text: "Tags", value: "tags", active: true },
        { text: "Legal Issue", value: "legal_issues", active: true },
        { text: "Relevance Index", value: "relevance", active: true },
        { text: "Materiality", value: "materiality", active: true },
        { text: "Admissibility", value: "admissibility", active: true },
        { text: "Important Level", value: "important_level", active: true },
        { text: "Relevant Level", value: "relevance_level", active: true },
        { text: "Material Level", value: "materiality_level", active: true },
        {
          text: "Admissible Level",
          value: "admissibility_level",
          active: true
        },
        {
          text: "Related Characters",
          value: "related_characters",
          active: true
        },
        { text: "Related Docket", value: "related_docket", active: true },
        { text: "Related Facts", value: "related_fact", active: true },
        {
          text: "Related Deposition",
          value: "related_deposition",
          active: true
        },
        {
          text: "Related Request Set",
          value: "related_request_set",
          active: true
        },
        {
          text: "Related Request Set Item",
          value: "related_request_set_item",
          active: true
        },
        { text: "Assigned Members", value: "assigned_members", active: true }, // thieu
        { text: "Comment", value: "total_comments", active: true },
        {
          text: "Included in Trial?",
          value: "included_trial",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ],
      showDetailRight: false,
      evidenceId: 0,
      isClickOutSidePopupDetail: true,
      isLoadingGetDetail: false,
      groupItemId: "",
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
          field: "provided_by_character",
          title: "Provided by",
          list: []
        },
        {
          id: 3,
          field: "provided_by",
          title: "Provided by Party",
          list: []
        },
        {
          id: 4,
          field: "favorable",
          title: "Favorable",
          list: []
        },
        {
          id: 5,
          field: "disputed",
          title: "Dispute?",
          list: []
        },
        {
          id: 6,
          field: "legal_issues",
          title: "Legal Issue",
          list: []
        },
        {
          id: 7,
          field: "important_level",
          title: "Important Level",
          list: []
        },
        {
          id: 8,
          field: "relevance_level",
          title: "Relevant Level",
          list: []
        },
        {
          id: 9,
          field: "materiality_level",
          title: "Material Level",
          list: []
        },
        {
          id: 10,
          field: "members",
          title: "Assigned Members",
          list: []
        },
        {
          id: 11,
          field: "included_trial",
          title: "Included in Trial?",
          list: []
        }
      ],
      isCallApiIssueGroupBy: false,
      isCallApiMenberGroupBy: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/evidences", [
      "dataEvidences",
      "totals",
      "isLoading"
    ]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/project/members", ["dataMembers"])
  },
  methods: {
    ...mapActions("ht_store/matter/evidences", [
      "getEvidencesFromApi",
      "postEvidences",
      "patchEvidences",
      "removeEvidences",
      "getEvidencesDetailRequest",
      "updateRelationEvidence",
      "removeRelationEvidence",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          evidencesId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId
        };
        await this.getEvidencesDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.evidenceId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeKeyPleading(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    async removeKeyPleading(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidencesId: row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeEvidences(data);
      close();
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataEvidences[groupID]) return false;
      const totals = this.dataEvidences[groupID].totals;
      const results = this.dataEvidences[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
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
    async getDataObjectionType() {
      if (!this.isCallApiObjectionTypeCell) {
        this.isCallApiObjectionTypeCell = true;
        this.isLoadingGetObjectionType = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataObjectionTypeRequest({ matterId });
        this.isLoadingGetObjectionType = false;
      }
    },
    async getDataTags() {
      if (!this.isCallApiTagCell) {
        this.isCallApiTagCell = true;
        this.getDataTagRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId
        });
      }
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
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;

      switch (group) {
        case "provided_by_character":
          if (!this.isCallApiCharacterGroupBy) {
            this.isCallApiCharacterGroupBy = true;
            const data = await this.getAllDataCharacterRequest({ matterId });
            groupByCurrent.list = [nullalbe, ...data].map(x => {
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
        case "provided_by":
          groupByCurrent.list = [
            ...this.appConfigs.favorableEvidences,
            nullalbe
          ].map(x => {
            return {
              id: x.id,
              groupID: x.id,
              value: x.id,
              text: x.name
            };
          });
          return groupByCurrent;
        case "favorable":
          groupByCurrent.list = [
            ...this.appConfigs.favorableEvidences,
            nullalbe
          ].map(x => {
            return {
              id: x.id,
              groupID: x.id,
              value: x.id,
              text: x.name
            };
          });
          return groupByCurrent;
        case "disputed":
          groupByCurrent.list = [
            { id: "True", groupID: "True", value: "True", text: "True" },
            { id: "False", groupID: "False", value: "False", text: "False" }
          ];
          return groupByCurrent;
        case "legal_issues":
          if (!this.isCallApiIssueGroupBy) {
            this.isCallApiIssueGroupBy = true;
            const dataIssues = await this.getDataIssuesRequest({
              matterId
            });
            groupByCurrent.totals = dataIssues.length;
            groupByCurrent.list = [nullalbe, ...dataIssues].map(x => {
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
        case "important_level":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.COMMON_LEVEL],
            nullalbe
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "relevance_level":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.COMMON_LEVEL],
            nullalbe
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "materiality_level":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.COMMON_LEVEL],
            nullalbe
          ].map(x => {
            return {
              id: x.value,
              groupID: x.value,
              value: x.value,
              text: x.label
            };
          });
          return groupByCurrent;
        case "members":
          if (!this.isCallApiMenberGroupBy) {
            this.isCallApiMenberGroupBy = true;
            await this.getDataMembersRequest({ matterId });
            groupByCurrent.list = [nullalbe, ...this.dataMembers].map(x => {
              const dataMap = {
                id: x.id,
                groupID: x.id,
                value: x.id,
                text: x.name
              };
              return dataMap;
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        case "included_trial":
          groupByCurrent.list = [
            { id: "True", groupID: "True", value: "True", text: "True" },
            { id: "False", groupID: "False", value: "False", text: "False" }
          ];
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataEvidenceFromApi(query, isFirstCall) {
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
    updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getEvidencesFromApi({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateEvidences(evidencesId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          evidencesId
        },
        body: {
          [name]: value
        },
        detail: this.showDetailRight
      };
      this.patchEvidences(data);
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value,
        detail: this.showDetailRight
      };
      await this.updateReportRequest(data);
    },
    removeRelated(type, row, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidencesId: row.pk,
        contentTypeId,
        objectId: item.pk,
        detail: row.detail
      };
      this.removeRelationEvidence(data);
    },
    updateRelated(type, row, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          evidencesId: row.pk
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        },
        detail: row.detail
      };
      this.updateRelationEvidence(data);
    }
  },
  async mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    await this.getDataMembersRequest({ matterId });
    await this.getAllDataCharacterRequest({ matterId });
    await this.getDataTagRequest({
      matterId,
      type: "tag"
    });
    await this.getDataIssuesRequest({ matterId });
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataEvidenceFromApi(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataEvidenceFromApi(query, true);
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
  width: 100px;
  align-items: center;
}
</style>
