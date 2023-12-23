<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
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
                dataPrivilege[groupItem.groupID]
                ? dataPrivilege[groupItem.groupID].results.length
                : 0
                }}
                of {{
                dataPrivilege[groupItem.groupID]
                ? dataPrivilege[groupItem.groupID].totals
                : 0
                }} items
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
              dataPrivilege[groupItem.groupID]
                ? dataPrivilege[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.entry_name="{ props: { item } }">
              <TextInline
                textNodata="(No Privilege Entry)"
                :value="item.entry_name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Privilege Entry',
                    name: 'entry_name',
                    pk: item.pk,
                    value: item.entry_name,
                  })
                "
              />
            </template>
            <template v-slot:item.document_name="{ props: { item } }">
              <TextInline
                textNodata="(No Document Name)"
                :value="item.document_name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Document Name',
                    name: 'document_name',
                    pk: item.pk,
                    value: item.document_name,
                  })
                "
              />
            </template>
            <template v-slot:item.document_attachment="{ props: { item } }">
              <AttachmentLink
                :value="item.document_attachment"
                @updateAsync="updateAttachmentPrivilege(item.pk, $event)"
              />
            </template>
            <template v-slot:item.document_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div class="caption">
                  <span v-if="item.document_date">{{item.document_date | formatShortDate}}</span>
                  <span v-else style="color:rgba(0,0,0,.6)">(No Date)</span>
                </div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.document_date"
                  :textTooltip="
                  [item.document_date].some(x => !!x)
                    ? 'Update Date'
                    : 'Add date'
                "
                  :colorButton="`${[item.document_date].some(x => !!x) ? 'indigo' : ''}`"
                  class="mx-2"
                  @updateTime="updatePrivilege(item.pk, 'document_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.import_date="{ props: { item } }">
              <div class="caption">
                <span v-if="item.import_date">{{item.import_date}}</span>
                <span v-else style="color:rgba(0,0,0,.6)">(No Date)</span>
              </div>
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
                  @updateTime="updateTimePrivilege(item.id, $event)"
                />
              </v-row>
            </template>
            <template v-slot:item.confidentiality="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.confidentiality"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_CONFIDENTIALITY]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Confidentiality',
                    name: 'confidentiality',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.confidentiality,
                    dataList:
                      [NA, ...appConfigChoices[appConfigConstants.PRIVILEGE_CONFIDENTIALITY]]
                  })
                "
              />
            </template>
            <template v-slot:item.privilege_justification="{ props: { item } }">
              <SelectLabel
                textTooltip="Add type"
                title="Privileges"
                :value="item.privilege_justification"
                :labels="mapPrillegeDetail"
                multiple
                @chooseLabel="
                  updatePrivilege(item.pk, 'privilege_justification', $event)
                "
              />
            </template>
            <template v-slot:item.responsive="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.responsive"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_RESPONSIVE]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Responsive',
                    name: 'responsive',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.responsive,
                    dataList:
                      [NA, ...appConfigChoices[appConfigConstants.PRIVILEGE_RESPONSIVE]]
                  })
                "
              />
            </template>
            <template v-slot:item.document_desc="{ props: { item } }">
              <TextInline
                textNodata="(No Document Description)"
                :value="item.document_desc"
                @onClick="
                  $_toggleMenuTextArea_openMenu({
                    ...$event,
                    name: 'document_desc',
                    pk: item.id,
                    value: item.document_desc
                  })
                "
              />
            </template>
            <template v-slot:item.subject_matter="{ props: { item } }">
              <TextInline
                textNodata="(No Subject Matter)"
                :value="item.subject_matter"
                @onClick="
                  $_toggleMenuTextArea_openMenu({
                    ...$event,
                    title: 'Subject Matter',
                    name: 'subject_matter',
                    pk: item.pk,
                    value: item.subject_matter,
                  })
                "
              />
            </template>

            <template v-slot:item.privilege_labels="{ props: { item } }">
              <TagablePrivilegeLabel
                :tag="item.privilege_labels"
                @onClickIcon="
                  $_toggleMenuPrivilegeLabelMixin_openMenu({
                    ...$event,
                    pk: item.pk,
                  })
                "
              />
            </template>

            <template v-slot:item.withheld_reason="{ props: { item } }">
              <TextInline
                textNodata="(No Withheld Reason)"
                :value="item.withheld_reason"
                @onClick="
                  $_toggleMenuTextArea_openMenu({
                    ...$event,
                    title: 'Withheld Reason',
                    name: 'withheld_reason',
                    pk: item.pk,
                    value: item.withheld_reason,
                  })
                "
              />
            </template>

            <template v-slot:item.document_labels="{ props: { item } }">
              <TagableDocumentLabel
                :tag="item.document_labels"
                @onClickIcon="
                  $_toggleMenuDocumentLabelMixin_openMenu({
                    ...$event,
                    pk: item.pk,
                  })
                "
              />
            </template>
            <template v-slot:item.issues="{ props: { item } }">
              <TagableIssue
                :tag="item.issues"
                @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: item.pk,
                  })
                "
              />
            </template>
            <template v-slot:item.reviewers="{ props: { item } }">
              <Members
                textTooltip="Add"
                :value="item.reviewers"
                @update="updatePrivilege(item.pk, 'reviewers', $event)"
              />
            </template>
            <template v-slot:item.review_status="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.review_status"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_REVIEWSTATUS]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Review Status',
                    name: 'review_status',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.review_status,
                    dataList:
                      [NA, ...appConfigChoices[appConfigConstants.PRIVILEGE_REVIEWSTATUS]]
                  })
                "
              />
            </template>
            <template v-slot:item.tags="{ props: { item } }">
              <Tags
                :value="item.tags"
                :isLoadingGet="isLoadingGetTag"
                :isEmitOpenMenu="true"
                @update="updatePrivilege(item.pk, 'tags', $event)"
                @onOpenMenu="getDataTag"
              />
            </template>
            <template v-slot:item.redaction="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.redaction"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_REDACTION]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Redaction',
                    name: 'redaction',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.redaction,
                    dataList:
                      [NA, ...appConfigChoices[appConfigConstants.PRIVILEGE_REDACTION]]
                  })
                "
              />
            </template>

            <template v-slot:item.senders_characters="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Senders Characters)"
                :value="mapValueActorByCharacter(filterValueByActorType(1, 'character', item.actors))"
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuCharacterMixin_openMenu({
                    ...$event,
                    pk: item.id,
                    value: mapValueActorByCharacter(filterValueByActorType(1, 'character', item.actors))
                  });
                  actor = {
                    type: 1,
                    list: cloneData(item.actors)
                  }
                "
              />
            </template>

            <template v-slot:item.senders_members="{ props: { item } }">
              <Members
                textTooltip="Add"
                :value="mapValueActorByMember(filterValueByActorType(1, 'workspace_member_id', item.actors))"
                @selectRow="updatePrivilegeActorMember(item.pk, 1, $event)"
                @removeRow="removePrivilegeActorMember({type: 1, list: item.actors}, item.pk, $event)"
                :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
              />
            </template>

            <template v-slot:item.recipients_characters="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Recipients Characters)"
                :value="mapValueActorByCharacter(filterValueByActorType(2, 'character', item.actors))"
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuCharacterMixin_openMenu({
                    ...$event,
                    pk: item.id,
                    value: mapValueActorByCharacter(filterValueByActorType(2, 'character', item.actors))
                  });
                  actor = {
                    type: 2,
                    list: cloneData(item.actors)
                  }
                "
              />
            </template>

            <template v-slot:item.recipients_members="{ props: { item } }">
              <Members
                textTooltip="Add"
                :value="mapValueActorByMember(filterValueByActorType(2, 'workspace_member_id', item.actors))"
                @selectRow="updatePrivilegeActorMember(item.pk, 2, $event)"
                @removeRow="removePrivilegeActorMember({type: 2, list: item.actors}, item.pk, $event)"
                :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
              />
            </template>

            <template v-slot:item.copyees_characters="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Copyees Characters)"
                :value="mapValueActorByCharacter(filterValueByActorType(3, 'character', item.actors))"
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuCharacterMixin_openMenu({
                    ...$event,
                    pk: item.id,
                    value: mapValueActorByCharacter(filterValueByActorType(3, 'character', item.actors))
                  });
                  actor = {
                    type: 3,
                    list: cloneData(item.actors)
                  }
                "
              />
            </template>

            <template v-slot:item.copyees_members="{ props: { item } }">
              <Members
                textTooltip="Add"
                :value="mapValueActorByMember(filterValueByActorType(3, 'workspace_member_id', item.actors))"
                @selectRow="updatePrivilegeActorMember(item.pk, 3, $event)"
                @removeRow="removePrivilegeActorMember({type: 3, list: item.actors}, item.pk, $event)"
                :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
              />
            </template>

            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :privilegeId="item.pk"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/privilege-logs/${item.pk}`"
                  routerMutation="ht_store/matter/privilege/updateDataPrivilege"
                  :pk="item.pk"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Actions
                  :isShowActionBookmark="false"
                  :isShowActionFlag="false"
                  @onClickView="showDetail(item.pk)"
                  @onClickDelete="actionDetele = {groupId: groupItem.groupID, item}; isShowPopupDelete = true"
                />
              </div>
              <!-- <Action :item="item" @remove="removePrivilege(groupItem.groupID, item, $event)" /> -->
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreatePrivilegeLog
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
        updatePrivilege(menuSelectBox.pk, menuSelectBox.name, $event[menuSelectBox.keyValue])
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
        updatePrivilege(menuIssue.pk, 'issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />

    <MenuPrivilegeLabel
      :labels="menuPrivilegeLabel.value"
      :isShowMenu="menuPrivilegeLabel.isShowMenu"
      :positionX="menuPrivilegeLabel.positionX"
      :positionY="menuPrivilegeLabel.positionY"
      :isLoadingGet="isLoadingGetPrivilegeLabel"
      @closeMenu="menuPrivilegeLabel.isShowMenu = false"
      @update="
        menuPrivilegeLabel.value = $event;
        updatePrivilege(menuPrivilegeLabel.pk, 'privilege_labels', $event);
      "
      @resetValueCheck="menuPrivilegeLabel.value = $event"
    />

    <MenuDocumentLabel
      :labels="menuDocumentLabel.value"
      :isShowMenu="menuDocumentLabel.isShowMenu"
      :positionX="menuDocumentLabel.positionX"
      :positionY="menuDocumentLabel.positionY"
      :isLoadingGet="isLoadingGetDocumentLabel"
      @closeMenu="menuDocumentLabel.isShowMenu = false"
      @update="
        menuDocumentLabel.value = $event;
        updatePrivilege(menuDocumentLabel.pk, 'document_labels', $event);
      "
      @resetValueCheck="menuDocumentLabel.value = $event"
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
        updatePrivilege(textFieldMenu.pk, textFieldMenu.name, $event);
      "
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
        updatePrivilege(textAreaMenu.pk, textAreaMenu.name, $event);
      "
    />

    <MenuRelatedCharacter
      keyId="pk"
      :value="relatedCharacterMenu.value"
      :isShowMenu="relatedCharacterMenu.isShowMenu"
      :positionX="relatedCharacterMenu.positionX"
      :positionY="relatedCharacterMenu.positionY"
      :isLoadingGet="isLoadingGetCharacter"
      :isLoadingUpdate="isLoadingUpdatePrivilegeActorCharacter"
      @select="
        $_toggleMenuCharacterMixin_addValue($event, ['pk', 'name']);
        updatePrivilegeActorCharacter(relatedCharacterMenu.pk, actor.type, $event)
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        removePrivilegeActorCharacter(actor, relatedCharacterMenu.pk, $event)
      "
    />

    <PrivilegeDetail
      :isShow="isShowDetailRight"
      title="Privilege Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      @updateReports="updateReports($event.pk, $event.value)"
    />

    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removePrivilege"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete= false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import { cloneData } from "@/sat-vue-toolkit/satlegal/utils";
import { nullalbe, NA } from "@/sat-vue-toolkit/satlegal/config";

// cells component
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import DateTagged from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/DateTagged";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import TagablePrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/TagablePrivilegeLabel";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TagableDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/TagableDocumentLabel";
import PrivilegeDetail from "./PrivilegeDetail";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreatePrivilegeLog from "../components/FormCreatePrivilegeLog";
import Comments from "../components/Comments";
//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuPrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/MenuPrivilegeLabel";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/MenuDocumentLabel";

//mixins
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuPrivilegeLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/mixins/toggleMenuPrivilegeLabelMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuDocumentLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/mixins/toggleMenuDocumentLabelMixin";

// moment
import moment from "moment";

export default {
  mixins: [
    appConfigMixin,
    toggleMenuSelectBox,
    toggleMenuTextField,
    toggleMenuCharacterMixin,
    toggleMenuTextArea,
    toggleMenuPrivilegeLabelMixin,
    toggleMenuIssueMixin,
    toggleMenuDocumentLabelMixin
  ],
  components: {
    PrivilegeDetail,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    Members,
    ButtonLoadMore,
    Tags,
    DateTagged,
    DatePicker,
    FormCreatePrivilegeLog,
    Comments,
    AttachmentLink,
    SelectLabel,
    ChipInlineList,
    TextInline,
    ChipJoinMenuSelectBox,
    TagablePrivilegeLabel,
    Actions,
    TagableIssue,
    TagableDocumentLabel,
    BookmarkOrFlag,
    //menus
    MenuRelatedCharacter,
    MenuTextField,
    MenuSelectCheckBox,
    MenuTextArea,
    MenuPrivilegeLabel,
    MenuIssue,
    MenuDocumentLabel,
    ConfirmItem
  },
  data() {
    return {
      cloneData,
      panel: [0],
      headers: [
        { text: "Privilege Entry", value: "entry_name", active: true },
        { text: "Document Name", value: "document_name", active: true },
        { text: "Document Upload", value: "document_attachment", active: true },
        { text: "Document Date", value: "document_date", active: true },
        { text: "Document Import Date", value: "import_date", active: true },
        { text: "Date Tagged", value: "date_tagged", active: true },
        { text: "Confidentiality", value: "confidentiality", active: true },
        {
          text: "Privilege Justification",
          value: "privilege_justification",
          active: true
        },
        { text: "Responsive", value: "responsive", active: true },
        { text: "Document Description", value: "document_desc", active: true },
        { text: "Document Labels", value: "document_labels", active: true },
        { text: "Legal Issues", value: "issues", active: true },
        { text: "Reviewers", value: "reviewers", active: true },
        { text: "Review Status", value: "review_status", active: true },
        { text: "Key Terms", value: "tags", active: true },
        { text: "Comment", value: "total_comments", active: true },
        { text: "Redaction", value: "redaction", active: true },
        {
          text: "Senders (characters)",
          value: "senders_characters",
          active: true
        },
        {
          text: "Senders (matter members)",
          value: "senders_members",
          active: true
        },
        {
          text: "Recipients (characters)",
          value: "recipients_characters",
          active: true
        },
        {
          text: "Recipients (matter members)",
          value: "recipients_members",
          active: true
        },
        {
          text: "Copyees (characters)",
          value: "copyees_characters",
          active: true
        },
        {
          text: "Copyees (matter members)",
          value: "copyees_members",
          active: true
        },
        { text: "Privilege Label", value: "privilege_labels", active: true },
        {
          text: "Document Subject Matter",
          value: "subject_matter",
          active: true
        },
        { text: "Withheld Reason", value: "withheld_reason", active: true },
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
          field: "confidentiality",
          title: "Confidentiality",
          list: []
        },
        {
          id: 3,
          field: "privilege_justification",
          title: "Privilege Justification",
          list: []
        },
        {
          id: 4,
          field: "responsive",
          title: "Responsive",
          list: []
        },
        {
          id: 5,
          field: "document_labels",
          title: "Document Labels",
          list: []
        },
        {
          id: 6,
          field: "issues",
          title: "Legal Issues",
          list: []
        },
        {
          id: 7,
          field: "reviewers",
          title: "Reviewers",
          list: []
        },
        {
          id: 8,
          field: "review_status",
          title: "Review Status",
          list: []
        },
        {
          id: 9,
          field: "tags",
          title: "Key Terms",
          list: []
        },
        {
          id: 10,
          field: "redaction",
          title: "Redaction",
          list: []
        }
      ],
      isLoadingGetTag: false,
      isCallApiTagCell: false,

      actor: {
        type: "",
        list: []
      },
      isLoadingUpdatePrivilegeActorCharacter: false,
      isLoadingUpdatePrivilegeActorMember: false,
      //groupby
      isCallApiIssueGroupBy: false,
      isCallApiDocumentLabelGroupBy: false,
      isCallApiTagsGroupBy: false,
      isCallApiMemberGroupBy: false,

      // delete
      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false,

      isShowDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: false
    };
  },
  computed: {
    NA() {
      return NA;
    },
    nullalbe() {
      return nullalbe;
    },
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/privilege", [
      "dataPrivilege",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    mapPrillegeDetail() {
      return (
        this.appConfigChoices[
          this.appConfigConstants.PRIVILEGE_JUSTIFICATION
        ] || []
      ).map(x => ({ id: x.value, name: x.label, color: x.color }));
    }
  },
  methods: {
    setStatus(status) {
      this.isShowDetailRight = status;
    },
    async showDetail(privilegeId) {
      this.isShowDetailRight = true;
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const data = {
        idParams: {
          matterId: matterId,
          privilegeId
        }
      };
      this.isLoadingGetDetail = true;
      await this.getPrivilegeDetailRequest(data);
      this.isLoadingGetDetail = false;
    },
    async updatePrivilegeActorCharacter(privilegeId, actorType, value) {
      let data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          privilegeId
        },
        body: {
          actor_type: actorType,
          characterId: value.pk,
          character: {
            pk: value.pk,
            first_name: value.first_name,
            last_name: value.last_name,
            avatar: value.avatar
          }
        }
      };
      try {
        this.isLoadingUpdatePrivilegeActorCharacter = true;
        const result = await this.updatePrivilegeActorRequest(data);
        this.actor.list.push(result);
        this.isLoadingUpdatePrivilegeActorCharacter = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorCharacter = false;
        throw error;
      }
    },

    async updatePrivilegeActorMember(privilegeId, actorType, value) {
      let data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          privilegeId
        },
        body: {
          workspace_member_id: value,
          actor_type: actorType
        }
      };
      try {
        this.isLoadingUpdatePrivilegeActorMember = true;
        await this.updatePrivilegeActorRequest(data);
        this.isLoadingUpdatePrivilegeActorMember = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorMember = false;
        throw error;
      }
    },

    async removePrivilegeActorCharacter(actor, privilegeId, value) {
      const listActorCharacter = actor.list.filter(x => x.character);
      const findActor = listActorCharacter.find(
        x => x.actor_type === actor.type && x.character.pk === value.pk
      );
      let data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        privilegeId,
        actorId: findActor.pk
      };
      try {
        this.isLoadingUpdatePrivilegeActorCharacter = true;
        await this.removePrivilegeActorRequest(data);
        this.actor.list = this.actor.list.filter(x => x.pk !== data.actorId);
        this.isLoadingUpdatePrivilegeActorCharacter = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorCharacter = false;
        throw error;
      }
    },

    async removePrivilegeActorMember(actor, privilegeId, value) {
      const listActorMember = actor.list.filter(x => x.workspace_member_id);
      const findActor = listActorMember.find(
        x => x.actor_type === actor.type && x.workspace_member_id === value
      );
      let data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        privilegeId,
        actorId: findActor.pk
      };
      try {
        this.isLoadingUpdatePrivilegeActorMember = true;
        await this.removePrivilegeActorRequest(data);
        this.isLoadingUpdatePrivilegeActorMember = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorMember = false;
        throw error;
      }
    },

    filterValueByActorType(actorType, field, list) {
      return list.filter(x => x.actor_type === actorType && x[field]);
    },

    mapValueActorByCharacter(list) {
      return list.map(x => {
        return {
          pk: x.character.pk,
          name: x.character.first_name + " " + x.character.last_name
        };
      });
    },

    mapValueActorByMember(list) {
      return list.map(x => x.workspace_member_id);
    },

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
      if (!this.dataPrivilege[groupID]) return false;
      const totals = this.dataPrivilege[groupID].totals;
      const results = this.dataPrivilege[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
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
    async removePrivilege() {
      const { groupId, item } = this.actionDetele;
      const data = {
        name: groupId,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: item.pk
      };
      data.isFieldArray = Array.isArray(item[this.groupBy.field]);
      try {
        this.isLoadingDelete = true;
        await this.removePrivilegeRequest(data);
        this.isLoadingDelete = false;
        this.isShowPopupDelete = false;
      } catch (error) {
        this.isLoadingDelete = false;
        throw error;
      }
    },
    async updatePagination(
      { page, ungroup, group_by, group_items },
      isFirstCall
    ) {
      const searchObject = {
        page,
        group_by,
        ungroup,
        group_items
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: 3
      };
      return this.getDataPrivilegeRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updatePrivilege(id, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id
        },
        body: {
          [name]: value
        }
      };
      this.updatePrivilegeRequest(data);
    },
    updateTimePrivilege(id, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id
        },
        body: value
      };
      this.updatePrivilegeRequest(data);
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: pk
        },
        body: value,
        detail: this.isShowDetailRight
      };
      await this.updateReportRequest(data);
    },
    async updateAttachmentPrivilege(id, { value, setLoading }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id
        },
        body: {
          document_attachment: value
        }
      };
      try {
        setLoading(true);
        await this.updateAttachmentPrivilegeRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "confidentiality":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.PRIVILEGE_CONFIDENTIALITY
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
        case "privilege_justification":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.PRIVILEGE_JUSTIFICATION
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
        case "responsive":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.PRIVILEGE_RESPONSIVE
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
        case "document_labels":
          if (!this.isCallApiDocumentLabelGroupBy) {
            this.isCallApiDocumentLabelGroupBy = true;
            const dataDocumentLabels = await this.getDataDocumentLabelRequest({
              matterId
            });
            groupByCurrent.list = [...dataDocumentLabels, nullalbe].map(x => {
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
        case "issues":
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
        case "reviewers":
          if (!this.isCallApiMemberGroupBy) {
            this.isCallApiMemberGroupBy = true;
            await this.getDataMembersRequest({
              matterId
            });
            groupByCurrent.list = [...this.dataMembers].map(x => {
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
        case "review_status":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.PRIVILEGE_REVIEWSTATUS
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
        case "tags":
          if (!this.isCallApiTagsGroupBy) {
            this.isCallApiTagsGroupBy = true;
            const dataTags = await this.getDataTagRequest({
              matterId
            });
            groupByCurrent.list = [...dataTags, nullalbe].map(x => {
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
            ...this.appConfigChoices[
              this.appConfigConstants.PRIVILEGE_REDACTION
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

        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataPrivilegeEntry(query, isFirstCall) {
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
    ...mapMutations("ht_store/matter/privilege", ["getDataAttachments"]),
    ...mapActions("ht_store/matter/privilege", [
      "getDataPrivilegeRequest",
      "getPrivilegeDetailRequest",
      "updatePrivilegeRequest",
      "removePrivilegeRequest",
      "updateAttachmentPrivilegeRequest",
      // actors
      "updatePrivilegeActorRequest",
      "removePrivilegeActorRequest",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/labelDocument", [
      "getDataDocumentLabelRequest"
    ]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataPrivilegeEntry(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataPrivilegeEntry(query, true);
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
