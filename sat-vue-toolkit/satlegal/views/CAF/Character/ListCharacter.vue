<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.full_name"
          placeholder="Search name character"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchCharacter"
        />
        <div class="flex-grow-1"></div>
        <v-btn
          class="mr-3"
          color="primary"
          :outlined="isOutlinedButtonRelated"
          small
          @click="addQueryRouteRelated"
        >Related</v-btn>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="onChangeGroupBy"
        />
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headersCustomize"
            :hideFieldIndex="['drag']"
            @onClickItem="resetFields"
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
                dataCharacter[groupItem.groupID]
                ? dataCharacter[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataCharacter[groupItem.groupID]
                ? dataCharacter[groupItem.groupID].totals
                : 0
                }}
                characters
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
              dataCharacter[groupItem.groupID]
                ? dataCharacter[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <FullName
                :isLoading="isLoadingUpdate"
                :avatar="item.avatar"
                :firstName="item.first_name"
                :lastName="item.last_name"
                @update="updateCharacterAsync(item.id, $event)"
              />
            </template>
            <template v-slot:item.emails="{ props: { item } }">
              <Emails
                class="detail-character"
                :listEmail="item.emails"
                @update="updateCharacterAsync(item.id, $event)"
                :isLoading="isLoadingUpdate"
              />
            </template>
            <template v-slot:item.phone="{ props: { item } }">
              <Phones
                class="detail-character"
                :listPhone="item.phone"
                @update="updateCharacterAsync(item.id, $event)"
                :isLoading="isLoadingUpdate"
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
                      name: 'location',
                      pk: item.id,
                      value: item.location
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.birthday="{ props: { item } }">
              <ChooseBirthday
                :max="new Date().toISOString()"
                :date="item.birthday"
                title="Birthday"
                :isActions="true"
                @update="updateCharacter(item.id, 'birthday', $event)"
              />
            </template>
            <template v-slot:item.age="{ props: { item } }">
              <span class="text-no-wrap text-caption">
                {{
                item.birthday
                ? new Date().getFullYear() -
                new Date(item.birthday).getFullYear()
                : "-"
                }}
              </span>
            </template>
            <template v-slot:item.background="{ props: { item } }">
              <div class="text-area-inline">
                <TextAreaInline
                  textNodata="(No background)"
                  :value="item.background"
                  @onClick="
                    $_toggleMenuTextArea_openMenu({
                      ...$event,
                      name: 'background',
                      pk: item.id,
                      value: item.background
                    })
                  "
                />
              </div>
            </template>
            <template v-slot:item.favorable="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.favorable"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.CHARACTER_FAVORABLE]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    name: 'favorable',
                    pk: item.id,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.favorable,
                    dataList:
                      appConfigChoices[appConfigConstants.CHARACTER_FAVORABLE]
                  })
                "
              />
            </template>
            <template v-slot:item.disclosed_by="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.disclosed_by"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.CHARACTER_DISCLOSEDBY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'disclosed_by',
                    pk: item.id,
                    value: item.disclosed_by,
                    dataList: appConfigChoices[appConfigConstants.CHARACTER_DISCLOSEDBY]
                  })
                "
              />
            </template>
            <template v-slot:item.dispute="{ props: { item } }">
              <Disputed
                :value="item.disputed"
                @update="updateCharacter(item.id, 'dispute', $event)"
              />
            </template>
            <template v-slot:item.important="{ props: { item } }">
              <Range
                :value="item.important"
                @update="updateCharacter(item.id, 'important', $event)"
              />
            </template>
            <template v-slot:item.relevant="{ props: { item } }">
              <Range :value="item.relevant" @update="updateCharacter(item.id, 'relevant', $event)" />
            </template>
            <template v-slot:item.value_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.value_level"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'value_level',
                    pk: item.id,
                    value: item.value_level,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>
            <template v-slot:item.relevant_level="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.relevant_level"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'relevant_level',
                    pk: item.id,
                    value: item.relevant_level,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>
            <template v-slot:item.credibility="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.credibility"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'credibility',
                    pk: item.id,
                    value: item.credibility,
                    dataList: appConfigChoices[appConfigConstants.COMMON_LEVEL]
                  })
                "
              />
            </template>
            <template v-slot:item.position="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.position"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.CHARACTER_POSITION]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'position',
                    pk: item.id,
                    value: item.position,
                    dataList: [NA, ...appConfigChoices[appConfigConstants.CHARACTER_POSITION]]
                  })
                "
              />
            </template>
            <template v-slot:item.located="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.located"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.CHARACTER_LOCATED]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'located',
                    pk: item.id,
                    value: item.located,
                    dataList: [NA, ...appConfigChoices[appConfigConstants.CHARACTER_LOCATED]]
                  })
                "
              />
            </template>
            <template v-slot:item.availability="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.availability"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.CHARACTER_AVAILABILITY]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'availability',
                    pk: item.id,
                    value: item.availability,
                    dataList: [NA, ...appConfigChoices[appConfigConstants.CHARACTER_AVAILABILITY]]
                  })
                "
              />
            </template>
            <template v-slot:item.served="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.served"
                keyText="label"
                keyValue="value"
                :dataList="appConfigChoices[appConfigConstants.CHARACTER_SERVED]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    keyText: 'label',
                    keyValue: 'value',
                    name: 'served',
                    pk: item.id,
                    value: item.served,
                    dataList: [NA, ...appConfigChoices[appConfigConstants.CHARACTER_SERVED]]
                  })
                "
              />
            </template>
            <template v-slot:item.characters="{ props: { item } }">
              <Character
                :value="item.characters"
                @update="updateCharacter(item.id, 'characters', $event)"
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
            <template v-slot:item.tags="{ props: { item } }">
              <Tags
                :value="item.tags"
                :isLoadingGet="isLoadingGetTag"
                :isEmitOpenMenu="true"
                @update="updateCharacter(item.id, 'tags', $event)"
                @onOpenMenu="getDataTag"
              />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <Members
                :value="item.members"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateCharacter(item.id, 'members', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.character_types="{ props: { item } }">
              <SelectLabel
                textTooltip="Add type"
                title="Character type"
                :value="item.character_types"
                :labels="appConfigs.characterType"
                multiple
                @chooseLabel="
                  updateCharacter(item.id, 'character_types', $event)
                "
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes :totalNotes="item.total_notes" :characterId="item.id" />
            </template>

            <template v-slot:item.deposition="{ props: { item } }">
              {{ item.deposition.length }}
              <AddIcon
                @onClickIcon="onShowPopupDepostion(item, item.deposition)"
                icon="mdi-view-list"
              />
            </template>

            <template v-slot:item.request_sets="{ props: { item } }">
              {{ item.request_sets ? item.request_sets.length : 0 }}
              <AddIcon
                @onClickIcon="onShowPopupRequestStatus(item, item.request_sets)"
                icon="mdi-view-list"
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
                    pk: item.id,
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
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DEPOSITION_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>

            <template v-slot:item.related_evidence="{ props: { item } }">
              <ChipInlineList
                textNoData="(No evidence)"
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
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.EVIDENCE_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>

            <template v-slot:item.request_set="{ props: { item } }">
              <ChipInlineList
                textNoData="(No request set)"
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
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.REQUEST_SET_RELATED,
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
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DOCKET_RELATED,
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
                  :endpoint="`/api/matters/${$$$matterID}/characters/${item.pk}`"
                  routerMutation="ht_store/matter/character2/updateDataCharacter"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Flag
                  :isShowDetail="true"
                  :isShowBookmark="false"
                  @showDetail="showDetail(item.id)"
                  :isShowFlag="false"
                />
                <Action :item="item" @remove="removeCharacter(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateCharacter
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
    <CharacterDetail
      :isShow="showDetailRight"
      title="Fact Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      @openMenuMember="getDataMember"
      @onClickDeposition="onShowPopupDepostion($event, $event.deposition)"
      @onClickDiscoveryRequest="onShowPopupRequestStatus($event, $event.request_sets)"
    />
    <PopupDeposition
      :isShowPopup="isShowPopupDepostion"
      :character="characterEdit"
      :dataDepostion="dataDepostion"
      @closePopup="isShowPopupDepostion = false; isClickOutSidePopupDetail = false"
    />
    <PopupRequestStatus
      :isShowPopup="isShowPopupRequestStatus"
      :character="characterEdit"
      :dataRequestStatus="dataRequestStatus || []"
      @closePopup="isShowPopupRequestStatus = false; isClickOutSidePopupDetail = false"
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
          relatedDepositionMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuDepositionMixin_removeValue($event);
        removeRelated(
          appConfigConstants.DEPOSITION_RELATED,
          relatedDepositionMenu.pk,
          $event
        );
      "
      @closeMenu="relatedDepositionMenu.isShowMenu = false"
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

    <MenuTextArea
      width="350"
      title="Update"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="
        textAreaMenu.value = $event;
        updateCharacter(textAreaMenu.pk, textAreaMenu.name, $event);
      "
    />

    <MenuSelectCheckBox
      title="Update"
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
        updateCharacter(
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
        updateCharacter(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
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
          relatedRequestSetMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuRequestSetMixin_removeValue($event);
        removeRelated(
          appConfigConstants.REQUEST_SET_RELATED,
          relatedRequestSetMenu.pk,
          $event
        );
      "
      @closeMenu="relatedRequestSetMenu.isShowMenu = false"
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
          relatedDocketMenu.pk,
          $event,
          'description'
        );
      "
      @remove="
        $_toggleMenuDocketMixin_removeValue($event);
        removeRelated(
          appConfigConstants.DOCKET_RELATED,
          relatedDocketMenu.pk,
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
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import CharacterDetail from "@/sat-vue-toolkit/satlegal/ht_components/links/CharacterDetail";
import {
  typeFacts,
  level,
  nullalbe,
  NA
} from "@/sat-vue-toolkit/satlegal/config";
import { formatDate } from "@/sat-vue-toolkit/satlegal/utils";
// cells component
import FullName from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/FullName";
import Emails from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Emails";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import Phones from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Phones";
import Character from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Character";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import Notes from "@/sat-vue-toolkit/satlegal/views/CAF/Character/components/Notes";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import ChooseBirthday from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseBirthday";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
//cell related

// import Type from "@/sat-vue-toolkit/satlegal/ht_components/common/Type";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";

//form
import FormCreateCharacter from "./components/FormCreateCharacter";
import PopupDeposition from "./components/PopupDeposition";
import PopupRequestStatus from "./components/PopupRequestStatus";

//menus
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";
import MenuRelatedDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/MenuRelatedDeposition";
import MenuRelatedEvidence from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/MenuRelatedEvidence";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import MenuRelatedDocket from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/MenuRelatedDocket";

// mixins
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";
import toggleMenuDepositionMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/mixins/toggleMenuDepositionMixin";
import toggleMenuEvidenceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/mixins/toggleMenuEvidenceMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";
import toggleMenuDocketMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/mixins/toggleMenuDocketMixin";

export default {
  layout: "app",
  name: "ListCharacter",
  mixins: [
    appConfigMixin,
    toggleMenuFactMixin,
    toggleMenuDepositionMixin,
    toggleMenuEvidenceMixin,
    toggleMenuTextArea,
    toggleMenuSelectBox,
    toggleMenuIssueMixin,
    toggleMenuRequestSetMixin,
    toggleMenuDocketMixin
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    FullName,
    Emails,
    SelectLabel,
    Phones,
    Character,
    Tags,
    Members,
    Disputed,
    Range,
    Notes,
    Flag,
    ChooseBirthday,
    Action,
    AddIcon,
    ChipInlineList,
    TagableIssue,
    TextAreaInline,
    ChipJoinMenuSelectBox,
    // Type,
    FormCreateCharacter,
    CharacterDetail,
    ButtonLoadMore,
    PopupDeposition,
    PopupRequestStatus,
    // Menu
    MenuRelatedFact,
    MenuRelatedDeposition,
    MenuRelatedEvidence,
    MenuTextArea,
    MenuSelectCheckBox,
    MenuIssue,
    MenuRelatedRequestSet,
    MenuRelatedDocket,
    BookmarkOrFlag
  },
  data() {
    return {
      formatDate,
      NA,
      level: level.filter(x => x.id !== null),
      panel: [0],
      headers: [
        { text: "Name", value: "name", active: true, type: [1, 2] },
        { text: "Email ", value: "emails", active: true, type: [1] },
        { text: "Phone", value: "phone", active: true, type: [1] },
        { text: "Location", value: "location", active: true, type: [1] },
        {
          text: "Character Type",
          value: "character_types",
          active: true,
          type: [1]
        },
        { text: "Favorable", value: "favorable", active: true, type: [1] },
        {
          text: "Disclosed by",
          value: "disclosed_by",
          active: true,
          type: [1]
        },
        { text: "Credibility", value: "credibility", active: true, type: [1] },
        {
          text: "Character Position",
          value: "position",
          active: true,
          type: [1]
        },
        { text: "Located", value: "located", active: true, type: [1] },
        {
          text: "Availablility",
          value: "availability",
          active: true,
          type: [1]
        },
        { text: "Served?", value: "served", active: true, type: [1] },
        {
          text: "Related to Legal Issue",
          value: "legal_issues",
          active: true,
          type: [1]
        },
        { text: "Date of Birth", value: "birthday", active: true, type: [1] },
        { text: "Age", value: "age", active: true, type: [1] },
        { text: "Background", value: "background", active: true, type: [1] },
        {
          text: "Value Important Index",
          value: "important",
          active: true,
          type: [1]
        },
        { text: "Relevant Index", value: "relevant", active: true, type: [1] },
        { text: "Value Level", value: "value_level", active: true, type: [1] },
        {
          text: "Relevant Level",
          value: "relevant_level",
          active: true,
          type: [1]
        },
        { text: "Tag", value: "tags", active: true, type: [1] },
        { text: "Note", value: "total_notes", active: true, type: [1] },
        { text: "Deposition", value: "deposition", active: true, type: [1] },
        { text: "Member", value: "members", active: true, type: [1] },
        {
          text: "Discovery Request",
          value: "request_sets",
          active: true,
          type: [1]
        },
        // related cell
        {
          text: "Related Docket Entry",
          value: "related_docket",
          active: true,
          type: [2]
        },
        {
          text: "Related Depostion",
          value: "related_deposition",
          active: true,
          type: [2]
        },
        {
          text: "Related Facts",
          value: "related_fact",
          active: true,
          type: [2]
        },
        {
          text: "Related Evidences",
          value: "related_evidence",
          active: true,
          type: [2]
        },
        {
          text: "Related Request Set",
          value: "request_set",
          active: true,
          type: [2]
        },

        { text: "Action", value: "action", active: true, type: [1, 2] }
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
          field: "favorable",
          title: "Favorable",
          list: []
        },
        {
          id: 3,
          field: "credibility",
          title: "Credibility",
          list: []
        },
        {
          id: 4,
          field: "located",
          title: "Located",
          list: []
        },
        {
          id: 5,
          field: "availability",
          title: "Availability",
          list: []
        },
        {
          id: 5,
          field: "served",
          title: "Served",
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
          field: "tags",
          title: "Tag",
          list: []
        },
        {
          id: 9,
          field: "members",
          title: "Assigned members",
          list: []
        }
      ],
      isCallApiTagGroupBy: false,
      isCallApiMemberGroupBy: false,
      isCallApiIssueCell: false,
      isCallApiMemberCell: false,
      isCallApiTagCell: false,
      isLoadingUpdate: false,
      isLoadingGetTag: false,
      isLoadingGetMember: false,
      showDetailRight: false,

      isShowPopupDepostion: false,
      dataDepostion: [],

      isShowPopupRequestStatus: false,
      dataRequestStatus: [],

      characterEdit: {},

      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: false
    };
  },
  computed: {
    headersCustomize() {
      const slick_mode = this.querySlickMode;
      const mode = [1, 2].includes(slick_mode) ? slick_mode : 1;
      return this.headers.filter(h => h.type.includes(mode));
    },
    headersFilter() {
      const slick_mode = this.querySlickMode;
      const mode = [1, 2].includes(slick_mode) ? slick_mode : 1;
      return this.headers.filter(h => h.active && h.type.includes(mode));
    },
    querySlickMode() {
      return +this.$route.query.slick_mode;
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    isOutlinedButtonRelated() {
      if (!this.querySlickMode) {
        return true;
      }
      return this.querySlickMode === 1;
    },
    ...mapGetters("ht_store/matter/character2", [
      "dataCharacter",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["dataMembers"])
  },
  methods: {
    onShowPopupDepostion(character, depositions) {
      this.dataDepostion = depositions;
      this.characterEdit = character;
      this.isClickOutSidePopupDetail = true;
      this.isShowPopupDepostion = true;
    },
    onShowPopupRequestStatus(character, requestSets) {
      this.dataRequestStatus = requestSets;
      this.characterEdit = character;
      this.isClickOutSidePopupDetail = true;
      this.isShowPopupRequestStatus = true;
    },
    addQueryRouteRelated() {
      const slickMode = this.querySlickMode;
      const query = {
        ...this.$route.query
      };
      if (!slickMode) {
        query.slick_mode = 2;
        this.changeQueryRouter(query);
      } else {
        query.slick_mode = slickMode === 1 ? 2 : 1;
      }
      this.changeQueryRouter(query);
    },
    updateRelated(type, characterId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        }
      };
      this.updateRelationCharacterRequest(data);
    },
    removeRelated(type, characterId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        characterId,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationCharacterRequest(data);
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async showDetail(id) {
      this.showDetailRight = true;
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const data = {
        matterId: matterId,
        characterId: id
      };
      this.isLoadingGetDetail = true;
      this.getHistoriesCharacters({ ...data, page: 1 });
      await this.getCharacterDetailRequest(data);
      this.isLoadingGetDetail = false;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataCharacter[groupID]) return false;
      const totals = this.dataCharacter[groupID].totals;
      const results = this.dataCharacter[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchCharacter(text) {
      const query = {
        ...this.$route.query,
        full_name: text
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
    async removeCharacter(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        characterId: row.id
      };
      data.isFieldArray = Array.isArray(
        row[
          this.groupBy.field === "characters__character"
            ? "characters"
            : this.groupBy.field
        ]
      );
      await this.removeCharacterRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataCharacter2Request({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateCharacter(characterId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId
        },
        body: {
          [name]: value
        }
      };
      this.updateCharacterRequest(data);
    },
    async updateCharacterAsync(characterId, body) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId
        },
        body
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateCharacterAsyncRequest(data);
        this.isLoadingUpdate = false;
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    updateNameCharacter(characterId, body) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId
        },
        body
      };
      this.updateCharacterRequest(data);
    },

    resetFields(data) {
      const { item, status } = data;
      this.headers = this.headers.map(x => {
        if (x.value === item.value) {
          return {
            ...x,
            active: status
          };
        }
        return x;
      });
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "characters__character":
          if (!this.isCallApiCharacterGroupBy) {
            this.isCallApiCharacterGroupBy = true;
            const dataCharacter = await this.getDataCharacter2Request({
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
        case "type":
          groupByCurrent.list = typeFacts.map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "legal_issues":
          if (!this.isCallApiIssueGroupBy) {
            this.isCallApiIssueGroupBy = true;
            const dataIssues = await this.getDataIssuesRequest({
              matterId
            });
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
            ...this.appConfigChoices[
              this.appConfigConstants.CHARACTER_FAVORABLE
            ],
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
        case "credibility":
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
        case "located":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.CHARACTER_LOCATED],
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
        case "availability":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.CHARACTER_AVAILABILITY
            ],
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
        case "served":
          groupByCurrent.list = [
            ...this.appConfigChoices[this.appConfigConstants.CHARACTER_SERVED],
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
        case "value_level":
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
        case "relevant_level":
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
        case "tags":
          if (!this.isCallApiTagGroupBy) {
            this.isCallApiTagGroupBy = true;
            const result = await this.getDataTagRequest({
              matterId
            });
            groupByCurrent.list = [...result, nullalbe].map(x => {
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
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataCharacter(query, isFirstCall) {
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
    async getDataMember() {
      if (!this.isCallApiMemberCell) {
        this.isCallApiMemberCell = true;
        try {
          this.isLoadingGetMember = true;
          const matterId = this.$route.params.matter || this.$route.params.projectId;
          await this.getDataMembersRequest({ matterId });
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    ...mapActions("ht_store/matter/character2", [
      "getDataCharacter2Request",
      "updateCharacterRequest",
      "updateCharacterAsyncRequest",
      "removeCharacterRequest",
      "getCharacterDetailRequest",
      "getHistoriesCharacters",
      //relations
      "updateRelationCharacterRequest",
      "removeRelationCharacterRequest",
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataCharacter(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataCharacter(query, true);
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
.text-area-inline {
  width: 350px;
  word-break: break-all;
}
</style>
