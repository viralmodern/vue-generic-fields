<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            :hideFieldIndex="['drag']"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
          <span class="font-weight-bold mr-2">
            {{ dataPrivilegeAttorneyComputed.length }}
            of
            {{ totals }}
            items
          </span>
        </v-chip>
      </v-card-title>
      <v-card-text>
        <TableGridStackColumn
          hide-default-header
          hide-default-footer
          show-footer-stack-column
          :fixedHeader="false"
          :headers="headers.filter(h => h.active)"
          :headerStackColumn="headerStackColumn"
          :desserts="dataPrivilegeAttorneyComputed"
          :loading="isLoadingGet"
          :listIdItemNoShowFooterStackColumn="listIdItemNoShowFooterStackColumn"
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
                  value: item.entry_name
                })
                typeApi = typeApiConstant.PRIVILEGE
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
                  value: item.document_name
                })
                typeApi = typeApiConstant.PRIVILEGE
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
            <div class="d-flex align-center">
              <span class="text-no-wrap text-caption" v-if="item.document_date">
                {{
                item.document_date | formatShortDate
                }}
              </span>
              <span v-else class="text-caption" style="color:rgba(0,0,0,.6)">(No Date)</span>
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
                :colorButton="
                  `${[item.document_date].some(x => !!x) ? 'indigo' : ''}`
                "
                class="mx-2"
                @updateTime="
                  updatePrivilege(typeApiConstant.PRIVILEGE, item.pk, 'document_date', $event.date)
                "
              />
            </div>
          </template>
          <template v-slot:item.date_tagged="{ props: { item } }">
            <v-row no-gutters class="td-dateTag">
              <div
                v-if="
                  showDate(item.date_tagged_after, item.date_tagged_before) ===
                    'date'
                "
              >Date: {{ item.date_tagged_after | formatShortDate }}</div>
              <div
                v-if="
                  showDate(item.date_tagged_after, item.date_tagged_before) ===
                    'between'
                "
              >
                After day: {{ item.date_tagged_after | formatShortDate }}
                <br />
                Before day: {{ item.date_tagged_before | formatShortDate }}
              </div>
              <div
                v-if="
                  showDate(item.date_tagged_after, item.date_tagged_before) ===
                    'before'
                "
              >Before day: {{ item.date_tagged_before | formatShortDate }}</div>
              <div
                v-if="
                  showDate(item.date_tagged_after, item.date_tagged_before) ===
                    'after'
                "
              >After day: {{ item.date_tagged_after | formatShortDate }}</div>
              <DateTagged
                title="Date"
                nameButtonSubmit="Save"
                :isActions="true"
                :dateAfter="item.date_tagged_after"
                :dateBefore="item.date_tagged_before"
                :textTooltipAfter="
                  [item.date_tagged_after].some(x => !!x)
                    ? `${$options.filters.formatShortDate(
                        item.date_tagged_after
                      )}`
                    : 'Add date'
                "
                :textTooltipBefore="
                  [item.date_tagged_before].some(x => !!x)
                    ? `${$options.filters.formatShortDate(
                        item.date_tagged_before
                      )}`
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
                    appConfigChoices[
                      appConfigConstants.PRIVILEGE_CONFIDENTIALITY
                    ]
                })
                typeApi = typeApiConstant.PRIVILEGE
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
                updatePrivilege(typeApiConstant.PRIVILEGE, item.pk, 'privilege_justification', $event)
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
                    appConfigChoices[appConfigConstants.PRIVILEGE_RESPONSIVE]
                })
                typeApi = typeApiConstant.PRIVILEGE
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
                typeApi = typeApiConstant.PRIVILEGE
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
                  value: item.subject_matter
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>

          <template v-slot:item.privilege_labels="{ props: { item } }">
            <TagablePrivilegeLabel
              :tag="item.privilege_labels"
              @onClickIcon="
                $_toggleMenuPrivilegeLabelMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
                typeApi = typeApiConstant.PRIVILEGE
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
                  value: item.withheld_reason
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>

          <template v-slot:item.document_labels="{ props: { item } }">
            <TagableDocumentLabel
              :tag="item.document_labels"
              @onClickIcon="
                $_toggleMenuDocumentLabelMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>
          <template v-slot:item.issues="{ props: { item } }">
            <TagableIssue
              :tag="item.issues"
              @onClickIcon="
                $_toggleMenuIssueMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>
          <template v-slot:item.reviewers="{ props: { item } }">
            <Members
              textTooltip="Add"
              :value="item.reviewers"
              @update="updatePrivilege(typeApiConstant.PRIVILEGE, item.pk, 'reviewers', $event)"
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
                    appConfigChoices[appConfigConstants.PRIVILEGE_REVIEWSTATUS]
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>
          <template v-slot:item.tags="{ props: { item } }">
            <TagableTag
              textNoData="No Key Terms"
              :tag="item.tags"
              @onClickIcon="
                $_toggleMenuTagMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
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
                    appConfigChoices[appConfigConstants.PRIVILEGE_REDACTION]
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>

          <template v-slot:item.senders_characters="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Senders Characters)"
              :value="
                mapValueActorByCharacter(
                  filterValueByActorType(1, 'character', item.actors)
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  pk: item.id,
                  value: mapValueActorByCharacter(
                    filterValueByActorType(1, 'character', item.actors)
                  )
                });
                actor = {
                  type: 1,
                  list: cloneData(item.actors)
                };
              "
            />
          </template>

          <template v-slot:item.senders_members="{ props: { item } }">
            <Members
              textTooltip="Add"
              :value="
                mapValueActorByMember(
                  filterValueByActorType(1, 'workspace_member_id', item.actors)
                )
              "
              @selectRow="updatePrivilegeActorMember(item.pk, 1, $event)"
              @removeRow="
                removePrivilegeActorMember(
                  { type: 1, list: item.actors },
                  item.pk,
                  $event
                )
              "
              :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
            />
          </template>

          <template v-slot:item.recipients_characters="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Recipients Characters)"
              :value="
                mapValueActorByCharacter(
                  filterValueByActorType(2, 'character', item.actors)
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  pk: item.id,
                  value: mapValueActorByCharacter(
                    filterValueByActorType(2, 'character', item.actors)
                  )
                });
                actor = {
                  type: 2,
                  list: cloneData(item.actors)
                };
              "
            />
          </template>

          <template v-slot:item.recipients_members="{ props: { item } }">
            <Members
              textTooltip="Add"
              :value="
                mapValueActorByMember(
                  filterValueByActorType(2, 'workspace_member_id', item.actors)
                )
              "
              @selectRow="updatePrivilegeActorMember(item.pk, 2, $event)"
              @removeRow="
                removePrivilegeActorMember(
                  { type: 2, list: item.actors },
                  item.pk,
                  $event
                )
              "
              :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
            />
          </template>

          <template v-slot:item.copyees_characters="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Copyees Characters)"
              :value="
                mapValueActorByCharacter(
                  filterValueByActorType(3, 'character', item.actors)
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  pk: item.id,
                  value: mapValueActorByCharacter(
                    filterValueByActorType(3, 'character', item.actors)
                  )
                });
                actor = {
                  type: 3,
                  list: cloneData(item.actors)
                };
              "
            />
          </template>

          <template v-slot:item.copyees_members="{ props: { item } }">
            <Members
              textTooltip="Add"
              :value="
                mapValueActorByMember(
                  filterValueByActorType(3, 'workspace_member_id', item.actors)
                )
              "
              @selectRow="updatePrivilegeActorMember(item.pk, 3, $event)"
              @removeRow="
                removePrivilegeActorMember(
                  { type: 3, list: item.actors },
                  item.pk,
                  $event
                )
              "
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

          <template v-slot:item.client_privilege_type="{ props: { item } }">
            <ChipJoinMenuSelectBox
              :value="item.client_privilege_type"
              keyValue="value"
              keyText="label"
              :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_ATTORNEY_CLIENT_PRIVILEGE_TYPE]
              "
              @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Privilege Type',
                  name: 'client_privilege_type',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: item.client_privilege_type,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_ATTORNEY_CLIENT_PRIVILEGE_TYPE]
                })
                typeApi = typeApiConstant.PRIVILEGE
              "
            />
          </template>

          <template v-slot:itemStackColumn.is_communication="{ props: { itemStackColumn, item } }">
            <ChipJoinMenuSelectBox
              v-if="Object.keys(itemStackColumn).includes('is_communication')"
              :value="itemStackColumn.is_communication"
              keyValue="value"
              keyText="label"
              :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
              @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Is Communication',
                  name: 'is_communication',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: itemStackColumn.is_communication,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                });
                typeApi = typeApiConstant.PRIVILEGE;
              "
            />
          </template>

          <template v-slot:itemStackColumn.is_confidential="{ props: { itemStackColumn, item } }">
            <ChipJoinMenuSelectBox
              v-if="Object.keys(itemStackColumn).includes('is_confidential')"
              :value="itemStackColumn.is_confidential"
              keyValue="value"
              keyText="label"
              :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
              @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Is Confidential',
                  name: 'is_confidential',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: itemStackColumn.is_confidential,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                });
                typeApi = typeApiConstant.PRIVILEGE;
              "
            />
          </template>

          <template v-slot:itemStackColumn.is_legal_related="{ props: { itemStackColumn, item } }">
            <ChipJoinMenuSelectBox
              v-if="Object.keys(itemStackColumn).includes('is_legal_related')"
              :value="itemStackColumn.is_legal_related"
              keyValue="value"
              keyText="label"
              :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                "
              @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Is Legal Related',
                    name: 'is_legal_related',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: itemStackColumn.is_legal_related,
                    dataList:
                      appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                  });
                  typeApi = typeApiConstant.PRIVILEGE;
                "
            />
          </template>

          <template v-slot:itemStackColumn.character_name="{ props: { itemStackColumn } }">
            <div
              v-if="Object.keys(itemStackColumn).includes('character_name')"
              class="d-flex align-center"
            >
              <UserAvatar
                class="mx-1"
                :avatarSize="30"
                :imageUrl="itemStackColumn.character_avatar"
                :name="itemStackColumn.character_name"
              />
              <span class="text-no-wrap bold--text">{{itemStackColumn.character_name}}</span>
            </div>
          </template>

          <template v-slot:itemStackColumn.is_privilege="{ props: { itemStackColumn, item } }">
            <ChipJoinMenuSelectBox
              v-if="Object.keys(itemStackColumn).includes('is_privilege')"
              :value="itemStackColumn.is_privilege"
              keyValue="value"
              keyText="label"
              :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
              @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Is Privileged',
                  name: 'is_privilege',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: itemStackColumn.is_privilege,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                });
                itemStackColumnEdit = cloneData(itemStackColumn);
                typeApi = typeApiConstant.PRIVILEGE_CHECK;
              "
            />
          </template>

          <template
            v-slot:appendItemStackColumn.list_privilege_checks="{
              props: { itemStackColumn, item }
            }"
          >
            <div class="d-flex align-center" style="height:60px">
              <div class="pagination-custody-item">
                <v-pagination
                  v-if="totalsPageStackColumn[item.pk] && totalsPageStackColumn[item.pk].totalsPagePrivilegeCheck > 1"
                  :value="options[item.pk] ? options[item.pk].pagePrivilegeCheck : 1"
                  :length="totalsPageStackColumn[item.pk] ? totalsPageStackColumn[item.pk].totalsPagePrivilegeCheck : 0"
                  circle
                  @input="onPagingListCustodyItem(item.pk, $event)"
                ></v-pagination>
              </div>
            </div>
          </template>

          <template v-slot:item.action="{ props: { item } }">
            <div class="d-flex">
              <BookmarkOrFlag
                :valueBookmark="item.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/privilege-attorney-logs/${item.pk}`"
                routerMutation="ht_store/matter/privilegeAttorney/updateDataPrivilege"
                :pk="item.pk"
                :valueFlag="item.reported_object && item.reported_object.pk"
              />
              <Actions
                :isShowActionBookmark="false"
                @onClickView="showDetail(item.pk)"
                @onClickDelete="
                actionDetele = { item };
                isShowPopupDelete = true;
              "
                :isShowActionFlag="false"
              />
            </div>
          </template>
        </TableGridStackColumn>
        <div class="d-flex align-center mt-2">
          <v-col cols="10" class="pa-0">
            <FormCreatePrivilegeAttorney @onAddNewItemSuccess="onAddNewItemSuccess" class="mt-2" />
          </v-col>
          <v-col cols="2 text-right">
            <ButtonLoadMore
              v-if="
                totals > 20 && totals > dataPrivilegeAttorneyComputed.length
              "
              @onPageChanged="loadMore"
            />
          </v-col>
        </div>
      </v-card-text>
    </v-card>
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
        updatePrivilege(typeApi, menuSelectBox.pk, menuSelectBox.name, $event[menuSelectBox.keyValue], itemStackColumnEdit.pk)
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
        updatePrivilege(typeApi, menuIssue.pk, 'issues', $event);
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
        updatePrivilege(typeApi, menuPrivilegeLabel.pk, 'privilege_labels', $event);
      "
      @resetValueCheck="menuPrivilegeLabel.value = $event"
    />

    <MenuTag
      :labels="menuTag.value"
      :isShowMenu="menuTag.isShowMenu"
      :positionX="menuTag.positionX"
      :positionY="menuTag.positionY"
      :isLoadingGet="isLoadingGetTag"
      @closeMenu="menuTag.isShowMenu = false"
      @update="
        menuTag.value = $event;
        updatePrivilege(typeApi, menuTag.pk, 'tags', $event);
      "
      @resetValueCheck="menuTag.value = $event"
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
        updatePrivilege(typeApi, menuDocumentLabel.pk, 'document_labels', $event);
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
        updatePrivilege(typeApi, textFieldMenu.pk, textFieldMenu.name, $event);
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
        updatePrivilege(typeApi, textAreaMenu.pk, textAreaMenu.name, $event);
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

    <PrivilegeAttorneyDetail
      :isShow="isShowDetailRight"
      title="Privilege Attorney Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      @updateReports="updateReports"
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
import TableGridStackColumn from "@/sat-vue-toolkit/satlegal/reuse-components/TableGridStackColumn";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import { cloneData } from "@/sat-vue-toolkit/satlegal/utils";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
import PrivilegeAttorneyDetail from "./components/privilege-attorney/PrivilegeAttorneyDetail";

// cells component
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import DateTagged from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/DateTagged";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import TagablePrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/TagablePrivilegeLabel";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TagableDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/TagableDocumentLabel";
import TagableTag from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/TagableTag";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";

//form
import FormCreatePrivilegeAttorney from "./components/privilege-attorney/FormCreatePrivilegeAttorney";
import Comments from "./components/privilege-attorney/Comments";
//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuPrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/MenuPrivilegeLabel";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/MenuDocumentLabel";
import MenuTag from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/MenuTag";
//mixins
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuPrivilegeLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/mixins/toggleMenuPrivilegeLabelMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuDocumentLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/mixins/toggleMenuDocumentLabelMixin";
import toggleMenuTagMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/mixins/toggleMenuTagMixin";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// moment
import moment from "moment";
const rowsPerPage = 5;

const constants = {
  PRIVILEGE: "privilege",
  PRIVILEGE_CHECK: "privilege_check"
};

export default {
  mixins: [
    appConfigMixin,
    toggleMenuSelectBox,
    toggleMenuTextField,
    toggleMenuCharacterMixin,
    toggleMenuTextArea,
    toggleMenuPrivilegeLabelMixin,
    toggleMenuIssueMixin,
    toggleMenuDocumentLabelMixin,
    toggleMenuTagMixin
  ],
  components: {
    TableGridStackColumn,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Members,
    ButtonLoadMore,
    DateTagged,
    DatePicker,
    FormCreatePrivilegeAttorney,
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
    TagableTag,
    UserAvatar,
    PrivilegeAttorneyDetail,

    //menus
    MenuRelatedCharacter,
    MenuTextField,
    MenuSelectCheckBox,
    MenuTextArea,
    MenuPrivilegeLabel,
    MenuIssue,
    MenuDocumentLabel,
    MenuTag,
    ConfirmItem,
    BookmarkOrFlag
  },
  data() {
    return {
      headerStackColumn: [
        {
          text: "Is a communication?",
          value: "is_communication",
          headerValue: "satified_elements",
          color: "cyan"
        },
        {
          text: "Is confidential?",
          value: "is_confidential",
          headerValue: "satified_elements",
          color: "green"
        },
        {
          text: "Is legal assistance?",
          value: "is_legal_related",
          headerValue: "satified_elements",
          color: "purple"
        },
        {
          text: "Character Name",
          value: "character_name",
          headerValue: "list_privilege_checks",
          color: "indigo"
        },
        {
          text: "Is Privileged?",
          value: "is_privilege",
          headerValue: "list_privilege_checks",
          color: "blue"
        }
      ],
      headers: [
        {
          text: "Privilege Entry",
          value: "entry_name",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Name",
          value: "document_name",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Upload",
          value: "document_attachment",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Date",
          value: "document_date",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Import Date",
          value: "import_date",
          active: true,
          rowspan: 2
        },
        { text: "Date Tagged", value: "date_tagged", active: true, rowspan: 2 },
        {
          text: "Confidentiality",
          value: "confidentiality",
          active: true,
          rowspan: 2
        },
        { text: "Responsive", value: "responsive", active: true, rowspan: 2 },
        {
          text: "Document Description",
          value: "document_desc",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Labels",
          value: "document_labels",
          active: true,
          rowspan: 2
        },
        { text: "Legal Issues", value: "issues", active: true, rowspan: 2 },
        { text: "Reviewers", value: "reviewers", active: true, rowspan: 2 },
        {
          text: "Review Status",
          value: "review_status",
          active: true,
          rowspan: 2
        },
        { text: "Key Terms", value: "tags", active: true, rowspan: 2 },
        { text: "Comment", value: "total_comments", active: true, rowspan: 2 },
        { text: "Redaction", value: "redaction", active: true, rowspan: 2 },
        {
          text: "Senders (characters)",
          value: "senders_characters",
          active: true,
          rowspan: 2
        },
        {
          text: "Senders (matter members)",
          value: "senders_members",
          active: true,
          rowspan: 2
        },
        {
          text: "Recipients (characters)",
          value: "recipients_characters",
          active: true,
          rowspan: 2
        },
        {
          text: "Recipients (matter members)",
          value: "recipients_members",
          active: true,
          rowspan: 2
        },
        {
          text: "Copyees (characters)",
          value: "copyees_characters",
          active: true,
          rowspan: 2
        },
        {
          text: "Copyees (matter members)",
          value: "copyees_members",
          active: true,
          rowspan: 2
        },
        {
          text: "Privilege Label",
          value: "privilege_labels",
          active: true,
          rowspan: 2
        },
        {
          text: "Document Subject Matter",
          value: "subject_matter",
          active: true,
          rowspan: 2
        },
        {
          text: "Withheld Reason",
          value: "withheld_reason",
          active: true,
          rowspan: 2
        },
        {
          text: "Attorney Client Privilege Type",
          value: "client_privilege_type",
          active: true,
          rowspan: 2
        },
        {
          text: "Satified Elements",
          value: "satified_elements",
          active: true,
          isStackColumn: true,
          center: true
        },
        {
          text: "Privlege Check",
          value: "list_privilege_checks",
          active: true,
          isStackColumn: true,
          center: true
        },
        { text: "Action", value: "action", active: true, rowspan: 2 }
      ],
      options: {},
      isLoadingGetTag: false,
      isCallApiTagCell: false,

      actor: {
        type: "",
        list: []
      },
      isShowDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: false,
      isLoadingUpdatePrivilegeActorCharacter: false,
      isLoadingUpdatePrivilegeActorMember: false,
      //groupby
      isCallApiIssueGroupBy: false,
      isCallApiDocumentLabelGroupBy: false,
      isCallApiTagsGroupBy: false,

      // delete
      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false,

      typeApi: constants.PRIVILEGE,
      itemStackColumnEdit: {}
    };
  },
  computed: {
    typeApiConstant() {
      return constants;
    },
    cloneData() {
      return cloneData;
    },
    nullalbe() {
      return nullalbe;
    },
    mapPrillegeDetail() {
      return (
        this.appConfigChoices[
          this.appConfigConstants.PRIVILEGE_JUSTIFICATION
        ] || []
      ).map(x => ({ id: x.value, name: x.label, color: x.color }));
    },
    dataPrivilegeAttorneyComputed() {
      const data = this.dataPrivilegeAttorney.map(x => {
        const option = this.options[x.pk] || {};
        const end = (option.pagePrivilegeCheck || 1) * rowsPerPage;
        const listCharacters = x.list_privilege_checks.slice(
          end - rowsPerPage,
          end
        );
        return {
          ...x,
          list_privilege_checks: listCharacters
        };
      });
      return data;
    },
    totalsPageStackColumn() {
      const data = {};
      this.dataPrivilegeAttorney.forEach(x => {
        data[x.pk] = {
          totalsPagePrivilegeCheck: Math.ceil(
            x.list_privilege_checks.length / rowsPerPage
          )
        };
      });
      return data;
    },
    listIdItemNoShowFooterStackColumn() {
      const data = [];
      this.dataPrivilegeAttorney.forEach(x => {
        if (Math.ceil(x.list_privilege_checks.length / rowsPerPage) <= 1) {
          data.push(x.pk);
        }
      });
      return data;
    },
    ...mapGetters("ht_store/matter/privilegeAttorney", [
      "dataPrivilegeAttorney",
      "isLoadingGet",
      "totals"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    setStatus(status) {
      this.isShowDetailRight = status;
    },
    async showDetail(privilegeId) {
      this.isShowDetailRight = true;
      const matterId =
        this.$route.params.matter || this.$route.params.projectId;
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
    onAddNewItemSuccess(data) {
      this.options = {
        ...this.options,
        [data.pk]: {
          pagePrivilegeCheck: 1
        }
      };
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
          const matterId =
            this.$route.params.matter || this.$route.params.projectId;
          await this.getDataTagRequest({ matterId });
          this.isLoadingGetTag = false;
        } catch (error) {
          this.isLoadingGetTag = false;
        }
      }
    },
    async removePrivilege() {
      const { item } = this.actionDetele;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: item.pk
      };
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
    updatePrivilege(typeApi, id, name, value, characterId) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id
        },
        body: {
          [name]: value
        }
      };
      if (typeApi === this.typeApiConstant.PRIVILEGE) {
        this.updatePrivilegeRequest(data);
      } else {
        data.idParams.characterId = characterId;
        this.updatePrivilegeCheckRequest(data);
      }
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$$$matterID,
          rowId: pk
        },
        body: value,
        detail: this.isShowDetailRight
      };
      await this.updateReportRequest(data);
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
    onPagingListCustodyItem(evidenceId, page) {
      this.options[evidenceId].pagePrivilegeCheck = page;
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      const options = {};
      this.dataPrivilegeAttorney.forEach(x => {
        options[x.pk] = {
          pagePrivilegeCheck: 1
        };
      });
      this.options = options;
      setLoading(false);
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidenceId: this.$route.params.evidenceId
      };
      return this.getDataPrivilegeRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    ...mapMutations("ht_store/matter/privilegeAttorney", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/privilegeAttorney", [
      "getDataPrivilegeRequest",
      "getPrivilegeDetailRequest",
      "updatePrivilegeRequest",
      "updatePrivilegeCheckRequest",
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
  async mounted() {
    this.getDataMembersRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId
    });
    const { results } = await this.updatePagination({
      page: 1,
      isFirstCall: true
    });
    const options = {};
    results.forEach(x => {
      options[x.pk] = {
        pagePrivilegeCheck: 1
      };
    });
    this.options = options;
  }
};
</script>

<style scoped>
.td-dateTag {
  justify-content: space-between;
  flex-direction: row;
  width: 200px;
  align-items: center;
}
</style>
