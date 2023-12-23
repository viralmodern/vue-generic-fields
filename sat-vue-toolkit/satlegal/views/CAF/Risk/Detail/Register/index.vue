<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.full_name"
          placeholder="Search Risk Register"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRisk"
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
                dataRisk[groupItem.groupID]
                ? dataRisk[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataRisk[groupItem.groupID]
                ? dataRisk[groupItem.groupID].totals
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
              dataRisk[groupItem.groupID]
                ? dataRisk[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.id="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/risks/${item.id}`"
                  routerMutation="ht_store/matter/risk/register/updateDataRisk"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Flag
                  class="mr-2"
                  :isShowBookmark="false"
                  :isShowDetail="true"
                  @showDetail="showDetail(item.id, groupItem.groupID)"
                  :isShowFlag="false"
                />
              </div>
            </template>
            <template v-slot:item.name="{ props: { item } }">
              <TextField :value="item.name" @update="updateRisk(item.id, 'name', $event)" />
            </template>
            <template v-slot:item.potential_consequence="{ props: { item } }">
              <SelectCheckBox
                title="Potential Consequences Level"
                :value="item.potential_consequence"
                :dataList="appConfigs.potential_consequence"
                @update="updateRisk(item.id, 'potential_consequence', $event.id)"
              />
            </template>
            <template v-slot:item.legal_issues="{ props: { item } }">
              <TagableIssue
                :tag="item.legal_issues"
                @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: item.id,
                  })"
              />
            </template>
            <template v-slot:item.risk_areas="{ props: { item } }">
              <TagableRiskArea
                :tag="item.risk_areas"
                @onClickIcon="
                  $_toggleMenuRiskAreaMixin_openMenu({
                    ...$event,
                    pk: item.id,
                  })"
              />
            </template>
            <template v-slot:item.likelihood="{ props: { item } }">
              <SelectCheckBox
                title="Likelihood"
                :value="item.likelihood"
                :dataList="appConfigs.likelihood"
                @update="updateRisk(item.id, 'likelihood', $event.id)"
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextArea :value="item.desc" @update="updateRisk(item.id, 'desc', $event)" />
            </template>
            <template v-slot:item.severity="{ props: { item } }">
              <SelectCheckBox
                title="Severity"
                :value="item.severity"
                :dataList="appConfigs.severity"
                @update="updateRisk(item.id, 'severity', $event.id)"
              />
            </template>
            <template v-slot:item.priority="{ props: { item } }">
              <SelectCheckBox
                title="Priority"
                :value="item.priority"
                :dataList="appConfigs.priority_risk"
                @update="updateRisk(item.id, 'priority', $event.id)"
              />
            </template>
            <template v-slot:item.status="{ props: { item } }">
              <SelectCheckBox
                title="Status"
                :value="item.status"
                :dataList="appConfigs.status_risk"
                @update="updateRisk(item.id, 'status', $event.id)"
              />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <Members
                :value="item.members"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateRisk(item.id, 'members', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.point_of_contact="{ props: { item } }">
              <Members
                single
                :value="item.point_of_contact"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateRisk(item.id, 'point_of_contact', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.who_at_risk="{ props: { item } }">
              <SelectCheckBox
                title="Who at Risk"
                :value="item.who_at_risk"
                :dataList="appConfigs.who_at_risk"
                @update="updateRisk(item.id, 'who_at_risk', $event.id)"
              />
            </template>
            <template v-slot:item.level="{ props: { item } }">
              <SelectCheckBox
                title="Level"
                :value="item.level"
                :dataList="appConfigs.level_risk"
                @update="updateRisk(item.id, 'level', $event.id)"
              />
            </template>
            <template v-slot:item.direction="{ props: { item } }">
              <SelectCheckBox
                title="Direction"
                :value="item.direction"
                :dataList="appConfigs.direction"
                @update="updateRisk(item.id, 'direction', $event.id)"
              />
            </template>
            <template v-slot:item.frequency="{ props: { item } }">
              <SelectCheckBox
                title="Frequency"
                :value="item.frequency"
                :dataList="appConfigs.frequency"
                @update="updateRisk(item.id, 'frequency', $event.id)"
              />
            </template>
            <template v-slot:item.detectability="{ props: { item } }">
              <SelectCheckBox
                title="Detectability"
                :value="item.detectability"
                :dataList="appConfigs.detectability"
                @update="updateRisk(item.id, 'detectability', $event.id)"
              />
            </template>
            <template v-slot:item.criticality="{ props: { item } }">
              <SelectCheckBox
                title="Criticality"
                :value="item.criticality"
                :dataList="appConfigs.criticality"
                @update="updateRisk(item.id, 'criticality', $event.id)"
              />
            </template>
            <template v-slot:item.owner="{ props: { item } }">
              <SelectCheckBox
                title="Owner"
                :value="item.owner"
                :dataList="appConfigs.owner"
                @update="updateRisk(item.id, 'owner', $event.id)"
              />
            </template>
            <template v-slot:item.trigger_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.trigger_date | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.trigger_date"
                  :textTooltip="
                  [item.trigger_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.trigger_date)}`
                    : 'Add date'"
                  :colorButton="`${[item.trigger_date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updateRisk(item.id, 'trigger_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.expiration_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.expiration_date | formatShortDate}}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.expiration_date"
                  :textTooltip="
                  [item.expiration_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(item.expiration_date)}`
                    : 'Add date'"
                  :colorButton="`${[item.expiration_date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updateRisk(item.id, 'expiration_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.attachments="{ props: { item } }">
              {{ item.attachments.length }}
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item.id, item.attachments)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.tags="{ props: { item } }">
              <Tags
                :value="item.tags"
                :isLoadingGet="isLoadingGetTag"
                :isEmitOpenMenu="true"
                @update="updateRisk(item.id, 'tags', $event)"
                @onOpenMenu="getDataTag"
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes
                :totalNotes="item.total_notes"
                @update="updateRisk(item.id, 'total_notes', $event)"
                :riskId="item.id"
              />
            </template>
            <template v-slot:item.risk_sources="{ props: { item } }">
              <TagableRiskSource
                :tag="item.risk_sources"
                @onClickIcon="
                  $_toggleMenuRiskSourceMixin_openMenu({
                    ...$event,
                    pk: item.id,
                  })"
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

            <template v-slot:item.related_privilege="{ props: { item } }">
              <ChipInlineList
                textNoData="(No privilege)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.PRIVILEGE_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="entry_name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuPrivilegeLogMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.PRIVILEGE_RELATED,
                    pk: item.id,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.PRIVILEGE_RELATED,
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
                  })"
              />
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <Action :item="item" @remove="removeRisk(groupItem.groupID, item, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRegister
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
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :riskId="this.riskId"
      @closePopup="isShowPopupAttachment = false"
    />
    <!-- realted -->
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
    <MenuRelatedPrivilegeLog
      keyId="pk"
      :value="relatedPrivilegeLogMenu.value"
      :isShowMenu="relatedPrivilegeLogMenu.isShowMenu"
      :positionX="relatedPrivilegeLogMenu.positionX"
      :positionY="relatedPrivilegeLogMenu.positionY"
      :isLoadingGet="isLoadingGetPrivilegeLog"
      @select="
        $_toggleMenuPrivilegeLogMixin_addValue($event);
        updateRelated(
          appConfigConstants.PRIVILEGE_RELATED,
          relatedPrivilegeLogMenu.pk,
          $event,
          'entry_name'
        );
      "
      @remove="
        $_toggleMenuPrivilegeLogMixin_removeValue($event);
        removeRelated(
          appConfigConstants.PRIVILEGE_RELATED,
          relatedPrivilegeLogMenu.pk,
          $event
        );
      "
      @closeMenu="relatedPrivilegeLogMenu.isShowMenu = false"
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
        updateRisk(textAreaMenu.pk, textAreaMenu.name, $event);"
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
        updateRisk(menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <MenuRiskArea
      :labels="menuRiskArea.value"
      :isShowMenu="menuRiskArea.isShowMenu"
      :positionX="menuRiskArea.positionX"
      :positionY="menuRiskArea.positionY"
      :isLoadingGet="isLoadingGetIssue"
      @closeMenu="menuRiskArea.isShowMenu = false"
      @update="
        menuRiskArea.value = $event;
        updateRisk(menuRiskArea.pk, 'risk_areas', $event);
      "
      @resetValueCheck="menuRiskArea.value = $event"
    />
    <MenuRiskSource
      :labels="menuRiskSource.value"
      :isShowMenu="menuRiskSource.isShowMenu"
      :positionX="menuRiskSource.positionX"
      :positionY="menuRiskSource.positionY"
      :isLoadingGet="isLoadingGetIssue"
      @closeMenu="menuRiskSource.isShowMenu = false"
      @update="
        menuRiskSource.value = $event;
        updateRisk(menuRiskSource.pk, 'risk_sources', $event);
      "
      @resetValueCheck="menuRiskSource.value = $event"
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

    <RiskDetail
      :isShow="showDetailRight"
      :riskId="riskId"
      @closeMenuRight="setStatus"
      :isClickOutSide="true"
      :isLoadingGetDetail="isLoadingGetDetail"
      title="Risk Detail"
      @updateReports="updateReports"
      @remove="removeDetail"
      :slickMode="$route.query.slick_mode"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import {
  favorables,
  typeFacts,
  level,
  nullalbe,
  NA
} from "@/sat-vue-toolkit/satlegal/config";
import { formatDate } from "@/sat-vue-toolkit/satlegal/utils";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Notes from "./components/Notes";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Attachments from "./components/Attachments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TagableRiskArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/TagableRiskArea";
import TagableRiskSource from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/TagableRiskSource";

import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
//cell related
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// import Type from "@/sat-vue-toolkit/satlegal/ht_components/common/Type";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";

//form
import FormCreateRegister from "./components/FormCreateRegister";
import RiskDetail from "./Detail/index";
//menus
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";
import MenuRelatedDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/MenuRelatedDeposition";
import MenuRelatedEvidence from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/MenuRelatedEvidence";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuRiskArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/MenuRiskArea";
import MenuRiskSource from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/MenuRiskSource";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import MenuRelatedDocket from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/MenuRelatedDocket";
import MenuRelatedPrivilegeLog from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/privilegeLog/MenuRelatedPrivilegeLog";
// mixins
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";
import toggleMenuDepositionMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/mixins/toggleMenuDepositionMixin";
import toggleMenuEvidenceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/mixins/toggleMenuEvidenceMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuRiskAreaMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/mixins/toggleMenuRiskAreaMixin";
import toggleMenuRiskSourceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/mixins/toggleMenuRiskSourceMixin";
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";
import toggleMenuDocketMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/docket/mixins/toggleMenuDocketMixin";
import toggleMenuPrivilegeLogMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/privilegeLog/mixins/toggleMenuPrivilegeLogMixin";

export default {
  name: "ListRisk",
  mixins: [
    appConfigMixin,
    toggleMenuFactMixin,
    toggleMenuDepositionMixin,
    toggleMenuEvidenceMixin,
    toggleMenuTextArea,
    toggleMenuSelectBox,
    toggleMenuIssueMixin,
    toggleMenuRiskAreaMixin,
    toggleMenuRiskSourceMixin,
    toggleMenuRequestSetMixin,
    toggleMenuDocketMixin,
    toggleMenuPrivilegeLogMixin
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Tags,
    Members,
    DatePicker,
    Notes,
    Flag,
    SelectCheckBox,
    TextField,
    Action,
    AddIcon,
    ChipInlineList,
    TagableIssue,
    TagableRiskArea,
    TagableRiskSource,
    Attachments,
    // Type,
    FormCreateRegister,
    ButtonLoadMore,
    // Menu
    MenuRelatedFact,
    MenuRelatedDeposition,
    MenuRelatedEvidence,
    MenuTextArea,
    MenuIssue,
    MenuRiskArea,
    MenuRiskSource,
    MenuRelatedRequestSet,
    MenuRelatedDocket,
    MenuRelatedPrivilegeLog,
    RiskDetail,
    BookmarkOrFlag
  },
  data() {
    return {
      formatDate,
      NA,
      level: level.filter(x => x.id !== null),
      panel: [0],
      headers: [
        { text: "Risk ID", value: "id", active: true, type: [1] },
        { text: "Risk Name", value: "name", active: true, type: [1] },
        {
          text: "Potential Consequences Level",
          value: "potential_consequence",
          active: true,
          type: [1]
        },
        { text: "Legal Issue", value: "legal_issues", active: true, type: [1] },
        { text: "Risk Area", value: "risk_areas", active: true, type: [1] },
        { text: "Likelihood", value: "likelihood", active: true, type: [1] },
        { text: "Risk Description", value: "desc", active: true, type: [1] },
        { text: "Severity", value: "severity", active: true, type: [1] },
        { text: "Priority", value: "priority", active: true, type: [1] },
        { text: "Status", value: "status", active: true, type: [1] },
        { text: "Assigned Member", value: "members", active: true, type: [1] },
        {
          text: "Point of Contact",
          value: "point_of_contact",
          active: true,
          type: [1]
        },
        { text: "Who at Risk", value: "who_at_risk", active: true, type: [1] },
        { text: "Risk Level", value: "level", active: true, type: [1] },
        { text: "Risk Direction", value: "direction", active: true, type: [1] },
        { text: "Risk Frequency", value: "frequency", active: true, type: [1] },
        {
          text: "Risk Detectability",
          value: "detectability",
          active: true,
          type: [1]
        },
        {
          text: "Risk Criticality",
          value: "criticality",
          active: true,
          type: [1]
        },
        { text: "Risk Owner", value: "owner", active: true, type: [1] },
        {
          text: "Risk Trigger Date",
          value: "trigger_date",
          active: true,
          type: [1]
        },
        {
          text: "Risk Expiration Date",
          value: "expiration_date",
          active: true,
          type: [1]
        },
        { text: "Attachment", value: "attachments", active: true, type: [1] },
        { text: "Tags", value: "tags", active: true, type: [1] },
        { text: "Note", value: "total_notes", active: true, type: [1] },
        {
          text: "Source of Risk",
          value: "risk_sources",
          active: true,
          type: [1]
        },
        { text: "Risk Cost", value: "cost", active: true, type: [1] },
        // related cell
        {
          text: "Related Risks",
          value: "name",
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
          text: "Legal Issue",
          value: "legal_issues",
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
          text: "Related Documents",
          value: "related_document",
          active: true,
          type: [2]
        },
        {
          text: "Related Privilege",
          value: "related_privilege",
          active: true,
          type: [2]
        },
        {
          text: "Related Citation",
          value: "related_citation",
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
          text: "Related Docket Entry",
          value: "related_docket",
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
          field: "categories",
          title: "Categories",
          list: []
        },
        {
          id: 3,
          field: "hazards",
          title: "Hazards",
          list: []
        },
        {
          id: 4,
          field: "risk_areas",
          title: "Risk Areas",
          list: []
        },
        {
          id: 5,
          field: "root_causes",
          title: "Root Causes",
          list: []
        },
        {
          id: 5,
          field: "strategies",
          title: "Strategies",
          list: []
        },
        {
          id: 6,
          field: "tags",
          title: "Tags",
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
          title: "Tag",
          list: []
        },
        {
          id: 9,
          field: "risk_sources",
          title: "Risk Sources",
          list: []
        },
        {
          id: 10,
          field: "members",
          title: "Members",
          list: []
        },
        {
          id: 11,
          field: "potential_consequence",
          title: "Potential Consequence",
          list: []
        },
        {
          id: 12,
          field: "likelihood",
          title: "Likelihood",
          list: []
        },
        {
          id: 13,
          field: "priority",
          title: "Priority",
          list: []
        },
        {
          id: 14,
          field: "severity",
          title: "Severity",
          list: []
        },
        {
          id: 15,
          field: "status",
          title: "Status",
          list: []
        },
        {
          id: 16,
          field: "action_plan",
          title: "Action Plan",
          list: []
        },
        {
          id: 17,
          field: "who_at_risk",
          title: "Who at Risk",
          list: []
        },
        {
          id: 18,
          field: "level",
          title: "Level",
          list: []
        },
        {
          id: 19,
          field: "direction",
          title: "Direction",
          list: []
        },
        {
          id: 20,
          field: "frequency",
          title: "Frequency",
          list: []
        },
        {
          id: 21,
          field: "detectability",
          title: "Detectability",
          list: []
        },
        {
          id: 22,
          field: "criticality",
          title: "Criticality",
          list: []
        },
        {
          id: 23,
          field: "owner",
          title: "Owner",
          list: []
        },
        {
          id: 24,
          field: "impact",
          title: "Impact",
          list: []
        },
        {
          id: 25,
          field: "contingency_plan_status",
          title: "Contingency Plan Status",
          list: []
        },
        {
          id: 26,
          field: "source_of_risk",
          title: "Source of Risk",
          list: []
        },
        {
          id: 27,
          field: "prob_of_occur",
          title: "Prob_of_Occur",
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
      riskId: 0,
      //attachment
      isShowPopupAttachment: false,
      groupId: ""
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
    ...mapGetters("ht_store/matter/risk/register", [
      "dataRisk",
      "isLoadingGet",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    // showDetail(riskActionId) {
    //   this.$router.push({
    //     name: "riskActionEntry",
    //     params: {
    //       riskActionId
    //     }
    //   });
    // },
    async showDetail(riskId, groupId) {
      this.showDetailRight = true;
      this.groupId = groupId;
      this.isLoadingGetDetail = true;
      const idParams = {
        riskId,
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      await this.getRiskDetailRequest(idParams);
      this.isLoadingGetDetail = false;
      this.riskId = riskId;
    },
    async removeDetail(item, close) {
      await this.removeRisk(this.groupId, item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(riskId, attachments) {
      (this.riskId = riskId), this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    onShowPopupDepostion(character, depositions) {
      this.dataDepostion = depositions;
      this.characterEdit = character;
      this.isShowPopupDepostion = true;
    },
    onShowPopupRequestStatus(character, requestSets) {
      this.dataRequestStatus = requestSets;
      this.characterEdit = character;
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
    updateRelated(type, riskId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        }
      };
      this.updateRelationRiskRequest(data);
    },
    removeRelated(type, riskId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        riskId,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationRiskRequest(data);
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRisk[groupID]) return false;
      const totals = this.dataRisk[groupID].totals;
      const results = this.dataRisk[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchRisk(text) {
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
    async removeRisk(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        riskId: row.id
      };
      data.isFieldArray = Array.isArray(
        row[
          this.groupBy.field === "characters__character"
            ? "characters"
            : this.groupBy.field
        ]
      );
      await this.removeRiskRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataRiskRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRisk(riskId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskId
        },
        body: {
          [name]: value
        }
      };
      this.updateRiskRequest(data);
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
      const matterId =
        this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "characters__character":
          if (!this.isCallApiRiskGroupBy) {
            this.isCallApiRiskGroupBy = true;
            const dataRisk = await this.getDataRiskRequest({
              matterId
            });
            groupByCurrent.list = [...dataRisk, nullalbe].map(x => {
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
        case "risk_areas":
          if (!this.isCallApiRiskAreaGroupBy) {
            this.isCallApiRiskAreaGroupBy = true;
            const dataRiskArea = await this.getDataRiskAreaRequest({
              matterId
            });
            groupByCurrent.list = [...dataRiskArea, nullalbe].map(x => {
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
        case "risk_sources":
          if (!this.isCallApiRiskSourceGroupBy) {
            this.isCallApiRiskSourceGroupBy = true;
            const dataRiskSource = await this.getDataRiskSourceRequest({
              matterId
            });
            groupByCurrent.list = [...dataRiskSource, nullalbe].map(x => {
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
          groupByCurrent.list = [...favorables, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "credibility":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "located":
          groupByCurrent.list = [...this.appConfigs.located, nullalbe].map(
            x => {
              return { id: x.id, groupID: x.id, value: x.id, text: x.name };
            }
          );
          return groupByCurrent;
        case "availability":
          groupByCurrent.list = [
            ...this.appConfigs.availablility,
            nullalbe
          ].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "served":
          groupByCurrent.list = [...this.appConfigs.served, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "value_level":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "relevant_level":
          groupByCurrent.list = [...this.level, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
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
    async getDataRisk(query, isFirstCall) {
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
          const matterId =
            this.$route.params.matter || this.$route.params.projectId;
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
          const matterId =
            this.$route.params.matter || this.$route.params.projectId;
          await this.getDataMembersRequest({ matterId });
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    ...mapActions("ht_store/matter/risk/register", [
      "getDataRiskRequest",
      "updateRiskRequest",
      "updateRiskAsyncRequest",
      "removeRiskRequest",
      "getHistoriesRisks",
      //relations
      "updateRelationRiskRequest",
      "removeRelationRiskRequest",
      "updateReportRequest",
      "getRiskDetailRequest"
    ]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/riskAreas", ["getDataRiskAreaRequest"]),
    ...mapActions("ht_store/matter/riskSource", ["getDataRiskSourceRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    ...mapMutations("ht_store/matter/risk/register", ["getDataAttachments"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataRisk(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataRisk(query, true);
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
</style>
