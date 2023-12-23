<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchWitnessReliability"
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
                  dataWitnessReliability[groupItem.groupID]
                    ? dataWitnessReliability[groupItem.groupID].results.length
                    : 0
                }}
                of
                {{
                  dataWitnessReliability[groupItem.groupID]
                    ? dataWitnessReliability[groupItem.groupID].totals
                    : 0
                }}
                items</span
              >
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGridStackColumn
            hide-default-header
            hide-default-footer
            :fixedHeader="false"
            :headers="headersFilter"
            :headerStackColumn="headerStackColumn"
            :desserts="
              dataWitnessReliability[groupItem.groupID]
                ? dataWitnessReliability[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.witness="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Witness Reliability)"
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

            <template v-slot:item.legal_issues="{ props: { item } }">
              <TagableIssue
                :tag="item.legal_issues"
                @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: item.pk
                  })
                "
              />
            </template>

            <template v-slot:item.length_of_time="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.length_of_time"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[
                    appConfigConstants.LENGTH_OF_TIME_SINCE_WITNESS
                  ]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Length of time since Witness observed the event?',
                    name: 'length_of_time',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.length_of_time,
                    dataList:
                      appConfigChoices[
                        appConfigConstants.LENGTH_OF_TIME_SINCE_WITNESS
                      ]
                  })
                "
              />
            </template>

            <template v-slot:item.witness_to_the_event="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.witness_to_the_event"
                keyValue="value"
                keyText="label"
                :dataList="appConfigChoices[appConfigConstants.CLOSE_WITNESS]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'How close was the witness to the event?',
                    name: 'witness_to_the_event',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.witness_to_the_event,
                    dataList: appConfigChoices[appConfigConstants.CLOSE_WITNESS]
                  })
                "
              />
            </template>

            <template v-slot:item.observation_impeded="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.observation_impeded"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Was the line of observation impeded?',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'observation_impeded',
                    pk: item.pk,
                    value: item.observation_impeded,
                    dataList:
                      appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                  })
                "
              />
            </template>

            <template v-slot:item.observed_known="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.observed_known"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Was the person observed known to the witness',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'observed_known',
                    pk: item.pk,
                    value: item.observed_known,
                    dataList:
                      appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                  })
                "
              />
            </template>

            <template v-slot:item.reason_to_remember="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Reason To Remember)"
                  :value="item.reason_to_remember"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'Reason To Remember',
                      name: 'reason_to_remember',
                      pk: item.pk,
                      value: item.reason_to_remember
                    })
                  "
                />
              </div>
            </template>

            <template v-slot:item.elapsed_since="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.ELAPSED_SINCE]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'How much time has elapsed since the event?',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'elapsed_since',
                    pk: item.pk,
                    value: item.elapsed_since,
                    dataList: appConfigChoices[appConfigConstants.ELAPSED_SINCE]
                  })
                "
              />
            </template>

            <!-- Related Cell -->
            <template v-slot:item.related_evidence="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Evidence)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.EVIDENCE_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuEvidenceMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.EVIDENCE_RELATED,
                    pk: item.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.EVIDENCE_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>

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

            <!-- Item StackColumn -->

            <template
              v-slot:itemStackColumn.observation_quality="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Observation Quality',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'observation_quality',
                    pk: item.pk,
                    value: itemStackColumn.observation_quality,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.sensory_defects="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Sensory Defects',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'sensory_defects',
                    pk: item.pk,
                    value: itemStackColumn.sensory_defects,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.general_physical_conditions="{ props: { itemStackColumn, item } }"
            >
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No Reason To Remember)"
                  :value="itemStackColumn.general_physical_conditions"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      title: 'General Physical Conditions',
                      name: 'general_physical_conditions',
                      pk: item.pk,
                      value: itemStackColumn.general_physical_conditions
                    })
                  "
                />
              </div>
            </template>

            <template
              v-slot:itemStackColumn.observation_condition="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Observation Condition',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'observation_condition',
                    pk: item.pk,
                    value: itemStackColumn.observation_condition,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.expectation="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Expectation',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'expectation',
                    pk: item.pk,
                    value: itemStackColumn.expectation,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.bias="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Bias',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'bias',
                    pk: item.pk,
                    value: itemStackColumn.bias,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.memory_related="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Memory-Related',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'memory_related',
                    pk: item.pk,
                    value: itemStackColumn.memory_related,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.appropriate_source="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Appropriate Source',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'appropriate_source',
                    pk: item.pk,
                    value: itemStackColumn.appropriate_source,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.in_position_to_observe="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'In Position to Observe',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'in_position_to_observe',
                    pk: item.pk,
                    value: itemStackColumn.in_position_to_observe,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.understand_of_what_observed="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Understand of what observed',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'understand_of_what_observed',
                    pk: item.pk,
                    value: itemStackColumn.understand_of_what_observed,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>

            <template
              v-slot:itemStackColumn.ability_to_communicate="{ props: { itemStackColumn, item } }"
            >
              <ChipJoinMenuSelectBox
                :value="item.elapsed_since"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Ability to Communicate',
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'ability_to_communicate',
                    pk: item.pk,
                    value: itemStackColumn.ability_to_communicate,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>


            <template v-slot:item.action="{ props: { item } }">
              <Actions
                :valueFlag="item.flag"
                :valueBookmark="!!item.bookmarked_pk"
                :isShowActionView="false"
                @onClickFlag="
                  updateWitnessReliability(item.pk, 'flag', !item.flag)
                "
                @onClickDelete="
                  actionDetele = { item, name: groupItem.groupID };
                  isShowPopupDelete = true;
                "
              />
            </template>
          </TableGridStackColumn>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateWitnessReliability
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
        updateWitnessReliability(textAreaMenu.pk, textAreaMenu.name, $event);
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
        updateWitnessReliability(
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
        updateWitnessReliability(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removeWitnessReliability"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete = false"
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
        updateWitnessReliability(
          relatedCharacterMenu.pk,
          relatedCharacterMenu.name,
          relatedCharacterMenu.value
        );
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        updateWitnessReliability(
          relatedCharacterMenu.pk,
          relatedCharacterMenu.name,
          relatedCharacterMenu.value
        );
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

    <MenuRelatedEvidence
      keyId="pk"
      :value="relatedEvidenceMenu.value"
      :isShowMenu="relatedEvidenceMenu.isShowMenu"
      :positionX="relatedEvidenceMenu.positionX"
      :positionY="relatedEvidenceMenu.positionY"
      :isLoadingGet="isLoadingGetEvidence"
      @select="
        $_toggleMenuEvidenceMixin_addValue($event);
        updateRelated(
          appConfigConstants.EVIDENCE_RELATED,
          relatedEvidenceMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuEvidenceMixin_removeValue($event);
        removeRelated(
          appConfigConstants.EVIDENCE_RELATED,
          relatedEvidenceMenu.pk,
          $event
        );
      "
      @closeMenu="relatedEvidenceMenu.isShowMenu = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGridStackColumn from "@/sat-vue-toolkit/satlegal/reuse-components/TableGridStackColumn";
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
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";

//form
import FormCreateWitnessReliability from "./components/witness-reliability/FormCreateWitnessReliability";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";
import MenuRelatedEvidence from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/MenuRelatedEvidence";

// mixins
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";
import toggleMenuEvidenceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/mixins/toggleMenuEvidenceMixin";

export default {
  mixins: [
    toggleMenuTextArea,
    toggleMenuSelectBox,
    appConfigMixin,
    toggleMenuIssueMixin,
    toggleMenuCharacterMixin,
    toggleMenuFactMixin,
    toggleMenuEvidenceMixin
  ],
  name: "static-pagination",
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGridStackColumn,
    FormCreateWitnessReliability,
    ButtonLoadMore,
    MenuTextArea,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    Actions,
    ChipInlineList,
    TagableIssue,
    TextAreaInline,
    // Menu
    MenuIssue,
    ConfirmItem,
    MenuRelatedCharacter,
    MenuRelatedFact,
    MenuRelatedEvidence
  },
  data() {
    return {
      NA,
      panel: [0],
      headerStackColumn: [
        {
          text: "Observation Quality",
          value: "observation_quality",
          headerValue: "observational_sensivity",
          color: "cyan"
        },
        {
          text: "Sensory Defects",
          value: "sensory_defects",
          headerValue: "observational_sensivity",
          color: "green"
        },
        {
          text: "General Physical Conditions",
          value: "general_physical_conditions",
          headerValue: "observational_sensivity",
          color: "purple"
        },
        {
          text: "Observation Condition",
          value: "observation_condition",
          headerValue: "observational_sensivity",
          color: "deep-purple"
        },
        {
          text: "Expectation",
          value: "expectation",
          headerValue: "objectivity",
          color: "indigo"
        },
        {
          text: "Bias",
          value: "bias",
          headerValue: "objectivity",
          color: "blue"
        },
        {
          text: "Memory-Related",
          value: "memory_related",
          headerValue: "objectivity",
          color: "light-blue"
        },
        {
          text: "Appropriate Source",
          value: "appropriate_source",
          headerValue: "competence",
          color: "light-blue accent-4"
        },
        {
          text: "In Position to Observe",
          value: "in_position_to_observe",
          headerValue: "competence",
          color: "cyan accent-4"
        },
        {
          text: "Understand of what observed",
          value: "understand_of_what_observed",
          headerValue: "competence",
          color: "teal accent-4"
        },
        {
          text: "Ability to Communicate",
          value: "ability_to_communicate",
          headerValue: "competence",
          color: "light-green darken-4"
        },
      ],
      headers: [
        { text: "Witness", value: "witness", active: true, rowspan: 2 },
        {
          text: "Related Evidence",
          value: "related_evidence",
          active: true,
          rowspan: 2
        },
        {
          text: "Related Facts",
          value: "related_facts",
          active: true,
          rowspan: 2
        },
        {
          text: "Related Testimony",
          value: "related_testimony",
          active: true,
          rowspan: 2
        },
        {
          text: "Legal Issues",
          value: "legal_issues",
          active: true,
          rowspan: 2
        },
        {
          text: "Length of time since Witness observed the event?",
          value: "length_of_time",
          active: true,
          rowspan: 2
        },
        {
          text: "How close was the witness to the event?",
          value: "witness_to_the_event",
          active: true,
          rowspan: 2
        },
        {
          text: "Was the line of observation impeded?",
          value: "observation_impeded",
          active: true,
          rowspan: 2
        },
        {
          text: "Was the person observed known to the witness",
          value: "observed_known",
          active: true,
          rowspan: 2
        },
        {
          text: "Witness reason to remember event",
          value: "reason_to_remember",
          active: true,
          rowspan: 2
        },
        {
          text: "How much time has elapsed since the event?",
          value: "elapsed_since",
          active: true,
          rowspan: 2
        },
        {
          text: "Observational Sensivity",
          value: "observational_sensivity",
          active: true,
          isStackColumn: true,
          center: true,
          class: "text-subtitle-1 font-weight-bold"
        },
        {
          text: "Objectivity",
          value: "objectivity",
          active: true,
          isStackColumn: true,
          center: true
        },
        {
          text: "Competence",
          value: "competence",
          active: true,
          isStackColumn: true,
          center: true
        },
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
          field: "related_evidence",
          title: "Related Evidence",
          list: []
        },
        {
          id: 3,
          field: "related_facts",
          title: "Related Fact",
          list: []
        },
        {
          id: 4,
          field: "related_testimony",
          title: "Related Testimony",
          list: []
        },
        {
          id: 5,
          field: "legal_issues",
          title: "Legal Issues",
          list: []
        },
        {
          id: 6,
          field: "length_of_time",
          title: "Length of time since Witness observed the event?",
          list: []
        },
        {
          id: 7,
          field: "witness_to_the_event",
          title: "How close was the witness to the event?",
          list: []
        },
        {
          id: 8,
          field: "observation_impeded",
          title: "Was the line of observation impeded?",
          list: []
        },
        {
          id: 9,
          field: "observed_known",
          title: "Was the person observed known to the witness",
          list: []
        },
        {
          id: 10,
          field: "elapsed_since",
          title: "How much time has elapsed since the event?",
          list: []
        }
      ],
      isCallApiCharacterGroupBy: false,
      isCallApiMemberGroupBy: false,

      //character

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
    ...mapGetters("ht_store/matter/testimony/witnessReliability", [
      "dataWitnessReliability",
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
    showDetail(witnessReliabilityId) {
      this.$router.push({
        name: "detailWitnessReliability",
        params: {
          witnessReliabilityId
        }
      });
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataWitnessReliability[groupID]) return false;
      const totals = this.dataWitnessReliability[groupID].totals;
      const results = this.dataWitnessReliability[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchWitnessReliability(text) {
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
    async removeWitnessReliability() {
      const { item, name } = this.actionDetele;
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        witnessReliabilityId: item.pk
      };

      data.isFieldArray = Array.isArray(item[this.groupBy.field]);
      try {
        this.isLoadingDelete = true;
        await this.removeWitnessReliabilityRequest(data);
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
      return this.getDataWitnessReliabilityRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateWitnessReliability(witnessReliabilityId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          witnessReliabilityId
        },
        body: {
          [name]: value
        }
      };
      this.updateWitnessReliabilityRequest(data);
    },

    updateRelated(type, witnessReliabilityId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          witnessReliabilityId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        }
      };
      this.updateRelationWitnessReliabilityRequest(data);
    },

    removeRelated(type, witnessReliabilityId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        witnessReliabilityId,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationWitnessReliabilityRequest(data);
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
    async getDataWitnessReliability(query, isFirstCall) {
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
    ...mapActions("ht_store/matter/testimony/witnessReliability", [
      "getDataWitnessReliabilityRequest",
      "updateWitnessReliabilityRequest",
      "removeWitnessReliabilityRequest",
      "getFactDetailRequest",
      //relation
      "updateRelationWitnessReliabilityRequest",
      "removeRelationWitnessReliabilityRequest"
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
      this.getDataWitnessReliability(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataWitnessReliability(query, true);
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
