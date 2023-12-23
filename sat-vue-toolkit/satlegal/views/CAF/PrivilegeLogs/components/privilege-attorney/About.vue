<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Document Upload :</p>
          <AttachmentLink
            :value="dataPrivilegeAttorneyDetail.document_attachment"
            @updateAsync="updateAttachmentPrivilegeDetail"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Action :</p>
          <div class="d-flex">
            <BookmarkOrFlag
              :valueBookmark="dataPrivilegeAttorneyDetail.bookmarked_pk"
              :endpoint="`/api/matters/${$$$matterID}/privilege-attorney-logs/${dataPrivilegeAttorneyDetail.pk}`"
              routerMutation="ht_store/matter/privilege/updateDataPrivilege"
              :pk="dataPrivilegeAttorneyDetail.pk"
              :valueFlag="dataPrivilegeAttorneyDetail.reported_object && dataPrivilegeAttorneyDetail.reported_object.pk"
              routerMutationDetail="ht_store/matter/privilege/setDataPrivileDetail"
              :detail="true"
            />
            <Actions
              :isShowActionFlag="false"
              :isShowActionBookmark="false"
              style="justify-content: unset!important;"
              :isShowActionView="false"
              @onClickDelete="isShowPopupDelete = true;"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataPrivilegeAttorneyDetail.entry_name"
              label="Privilege Entry"
              placeholder="Privilege Entry"
              @change="updatePrivilegeAttorneyDetail('entry_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataPrivilegeAttorneyDetail.document_name"
              label="Document Name"
              placeholder="Document Name"
              @change="updatePrivilegeAttorneyDetail('document_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeAttorneyDetail.document_desc"
              label="Document Description"
              placeholder="Document Description"
              @change="updatePrivilegeAttorneyDetail('document_desc', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeAttorneyDetail.subject_matter"
              label="Subject Matter"
              placeholder="Subject Matter"
              @change="updatePrivilegeAttorneyDetail('subject_matter', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeAttorneyDetail.withheld_reason"
              label="Withheld Reason"
              placeholder="Withheld Reason"
              @change="updatePrivilegeAttorneyDetail('withheld_reason', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="
              appConfigChoices[appConfigConstants.PRIVILEGE_CONFIDENTIALITY]
            "
            label="Confidentiality"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataPrivilegeAttorneyDetail.confidentiality"
            @change="updatePrivilegeAttorneyDetail('confidentiality', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.PRIVILEGE_RESPONSIVE]"
            label="Responsive"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataPrivilegeAttorneyDetail.responsive"
            @change="updatePrivilegeAttorneyDetail('responsive', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.PRIVILEGE_REVIEWSTATUS]"
            label="Review Status"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataPrivilegeAttorneyDetail.review_status"
            @change="updatePrivilegeAttorneyDetail('review_status', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.PRIVILEGE_REDACTION]"
            label="Redaction"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataPrivilegeAttorneyDetail.redaction"
            @change="updatePrivilegeAttorneyDetail('redaction', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="
              appConfigChoices[
                appConfigConstants.PRIVILEGE_ATTORNEY_CLIENT_PRIVILEGE_TYPE
              ]
            "
            label="Privilege Type"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataPrivilegeAttorneyDetail.client_privilege_type"
            @change="
              updatePrivilegeAttorneyDetail('client_privilege_type', $event)
            "
          />
        </v-col>
        <v-col cols="12">
          <label class="mb-3">Satified Elements:</label>
          <v-row class="px-3">
            <SatifiedElement
              :desserts="[{...dataPrivilegeAttorneyDetail}]"
              :privilegeId="dataPrivilegeAttorneyDetail.pk"
              class="py-3"
              @updateSelectBox="$_toggleMenuSelectBox_openMenu"
            />
          </v-row>
        </v-col>
        <v-col cols="12">
          <label class="mb-3">Privlege Check:</label>
          <v-row class="px-3">
            <PrivilegeCheck
              :desserts="(dataPrivilegeAttorneyDetail.list_privilege_checks || [])"
              :privilegeId="dataPrivilegeAttorneyDetail.pk"
              class="py-3"
              @update="updatePrivilegeAttorneyCheckDetail($event.characterId, $event.value)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Privilege Label :</p>
          <TagablePrivilegeLabel
            maxWidth="200px"
            :tag="dataPrivilegeAttorneyDetail.privilege_labels || []"
            @onClickIcon="
              $_toggleMenuPrivilegeLabelMixin_openMenu({
                ...$event,
                pk: dataPrivilegeAttorneyDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Document Labels :</p>
          <TagableDocumentLabel
            maxWidth="200px"
            :tag="dataPrivilegeAttorneyDetail.document_labels"
            @onClickIcon="
              $_toggleMenuDocumentLabelMixin_openMenu({
                ...$event,
                pk: dataPrivilegeAttorneyDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Legal Issues :</p>
          <TagableIssue
            maxWidth="200px"
            :tag="dataPrivilegeAttorneyDetail.issues"
            @onClickIcon="
              $_toggleMenuIssueMixin_openMenu({
                ...$event,
                pk: dataPrivilegeAttorneyDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Key Terms :</p>
          <TagableTag
            maxWidth="200px"
            :lengthDisplay="2"
            textNoData="No Key Terms"
            :tag="dataPrivilegeAttorneyDetail.tags"
            @onClickIcon="
              $_toggleMenuTagMixin_openMenu({
                ...$event,
                pk: dataPrivilegeAttorneyDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Reviewers :</p>
          <Members
            textTooltip="Add"
            :value="dataPrivilegeAttorneyDetail.reviewers"
            @update="updatePrivilegeAttorneyDetail('reviewers', $event)"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Senders Characters :</p>
          <ChipInlineList
            maxWidth="200px"
            textNoData="(No Senders Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  1,
                  'character',
                  dataPrivilegeAttorneyDetail.actors
                )
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
                pk: dataPrivilegeAttorneyDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    1,
                    'character',
                    dataPrivilegeAttorneyDetail.actors
                  )
                )
              });
              actor = {
                type: 1,
                list: cloneData(dataPrivilegeAttorneyDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Senders Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  1,
                  'workspace_member_id',
                  dataPrivilegeAttorneyDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeAttorneyDetail.pk,
                1,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 1, list: dataPrivilegeAttorneyDetail.actors },
                dataPrivilegeAttorneyDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Recipients Characters :</p>
          <ChipInlineList
            maxWidth="200px"
            textNoData="(No Recipients Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  2,
                  'character',
                  dataPrivilegeAttorneyDetail.actors
                )
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
                pk: dataPrivilegeAttorneyDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    2,
                    'character',
                    dataPrivilegeAttorneyDetail.actors
                  )
                )
              });
              actor = {
                type: 2,
                list: cloneData(dataPrivilegeAttorneyDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Recipients Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  2,
                  'workspace_member_id',
                  dataPrivilegeAttorneyDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeAttorneyDetail.pk,
                2,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 2, list: dataPrivilegeAttorneyDetail.actors },
                dataPrivilegeAttorneyDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Copyees Characters :</p>
          <ChipInlineList
            maxWidth="200px"
            textNoData="(No Copyees Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  3,
                  'character',
                  dataPrivilegeAttorneyDetail.actors
                )
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
                pk: dataPrivilegeAttorneyDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    3,
                    'character',
                    dataPrivilegeAttorneyDetail.actors
                  )
                )
              });
              actor = {
                type: 3,
                list: cloneData(dataPrivilegeAttorneyDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Copyees Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  3,
                  'workspace_member_id',
                  dataPrivilegeAttorneyDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeAttorneyDetail.pk,
                3,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 3, list: dataPrivilegeAttorneyDetail.actors },
                dataPrivilegeAttorneyDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Comments :</p>
          <Comments
            :totalComments="dataPrivilegeAttorneyDetail.total_comments"
            :matterId="$route.params.matter || $route.params.projectId"
            :privilegeId="dataPrivilegeAttorneyDetail.pk"
          />
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Date Tagged :</p>
          <div class="d-flex">
            <div
              v-if="
                showDate(
                  dataPrivilegeAttorneyDetail.date_tagged_after,
                  dataPrivilegeAttorneyDetail.date_tagged_before
                ) === 'date'
              "
            >
              Date:
              {{
              dataPrivilegeAttorneyDetail.date_tagged_after | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeAttorneyDetail.date_tagged_after,
                  dataPrivilegeAttorneyDetail.date_tagged_before
                ) === 'between'
              "
            >
              After day:
              {{
              dataPrivilegeAttorneyDetail.date_tagged_after | formatShortDate
              }}
              <br />
              Before day:
              {{
              dataPrivilegeAttorneyDetail.date_tagged_before | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeAttorneyDetail.date_tagged_after,
                  dataPrivilegeAttorneyDetail.date_tagged_before
                ) === 'before'
              "
            >
              Before day:
              {{
              dataPrivilegeAttorneyDetail.date_tagged_before | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeAttorneyDetail.date_tagged_after,
                  dataPrivilegeAttorneyDetail.date_tagged_before
                ) === 'after'
              "
            >
              After day:
              {{
              dataPrivilegeAttorneyDetail.date_tagged_after | formatShortDate
              }}
            </div>
            <DateTagged
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :dateAfter="dataPrivilegeAttorneyDetail.date_tagged_after"
              :dateBefore="dataPrivilegeAttorneyDetail.date_tagged_before"
              :textTooltipAfter="
                [dataPrivilegeAttorneyDetail.date_tagged_after].some(x => !!x)
                  ? `${$options.filters.formatShortDate(
                      dataPrivilegeAttorneyDetail.date_tagged_after
                    )}`
                  : 'Add date'
              "
              :textTooltipBefore="
                [dataPrivilegeAttorneyDetail.date_tagged_before].some(x => !!x)
                  ? `${$options.filters.formatShortDate(
                      dataPrivilegeAttorneyDetail.date_tagged_before
                    )}`
                  : 'Add date'
              "
              class="mx-2"
              @updateTime="updateTimePrivilege"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p class="mb-1 font-weight-bold">Document Date :</p>
          <div class="d-flex align-center">
            <span class="text-no-wrap caption" v-if="dataPrivilegeAttorneyDetail.document_date">
              {{
              dataPrivilegeAttorneyDetail.document_date | formatShortDate
              }}
            </span>
            <span v-else class="caption" style="color:rgba(0,0,0,.6)">(No Date)</span>
            <DatePicker
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataPrivilegeAttorneyDetail.document_date"
              :textTooltip="
                [dataPrivilegeAttorneyDetail.document_date].some(x => !!x)
                  ? 'Update Date'
                  : 'Add date'
              "
              :colorButton="
                `${
                  [dataPrivilegeAttorneyDetail.document_date].some(x => !!x)
                    ? 'indigo'
                    : ''
                }`
              "
              class="mx-2"
              @updateTime="
                updatePrivilegeAttorneyDetail('document_date', $event.date)
              "
            />
          </div>
        </v-col>
      </v-row>
    </v-form>

    <MenuPrivilegeLabel
      :labels="menuPrivilegeLabel.value"
      :isShowMenu="menuPrivilegeLabel.isShowMenu"
      :positionX="menuPrivilegeLabel.positionX"
      :positionY="menuPrivilegeLabel.positionY"
      :isLoadingGet="isLoadingGetPrivilegeLabel"
      @closeMenu="menuPrivilegeLabel.isShowMenu = false"
      @update="
        menuPrivilegeLabel.value = $event;
        updatePrivilegeAttorneyDetail('privilege_labels', $event);
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
        updatePrivilegeAttorneyDetail('document_labels', $event);
      "
      @resetValueCheck="menuDocumentLabel.value = $event"
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
        updatePrivilegeAttorneyDetail('tags', $event);
      "
      @resetValueCheck="menuTag.value = $event"
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
        updatePrivilegeAttorneyDetail('issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
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
        updatePrivilegeActorCharacter(
          relatedCharacterMenu.pk,
          actor.type,
          $event
        );
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        removePrivilegeActorCharacter(actor, relatedCharacterMenu.pk, $event);
      "
    />

    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removePrivilege"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete= false"
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
        updatePrivilegeAttorneyDetail(menuSelectBox.name, $event[menuSelectBox.keyValue])
      "
    />
  </div>
</template>
<script>
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import DateTagged from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/DateTagged";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/inputs/SelectChip";
import TagablePrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/TagablePrivilegeLabel";
import TagableDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/TagableDocumentLabel";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TagableTag from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/TagableTag";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import Comments from "./Comments";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import SatifiedElement from "./Detail/SatifiedElements";
import MenuPrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/MenuPrivilegeLabel";
import MenuDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/MenuDocumentLabel";
import MenuTag from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/MenuTag";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuPrivilegeLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/mixins/toggleMenuPrivilegeLabelMixin";
import toggleMenuDocumentLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/mixins/toggleMenuDocumentLabelMixin";
import toggleMenuTagMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/mixins/toggleMenuTagMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import PrivilegeCheck from "./Detail/PrivlegeCheck";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { cloneData } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  mixins: [
    appConfigMixin,
    toggleMenuSelectBox,
    toggleMenuPrivilegeLabelMixin,
    toggleMenuDocumentLabelMixin,
    toggleMenuIssueMixin,
    toggleMenuTagMixin,
    toggleMenuCharacterMixin
  ],
  data() {
    return {
      valid: false,
      isLoadingUpdate: false,
      isLoadingUpdatePrivilegeActorCharacter: false,
      isLoadingUpdatePrivilegeActorMember: false,
      actor: {
        type: "",
        list: []
      },
      // delete
      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false
    };
  },
  components: {
    PrivilegeCheck,
    AttachmentLink,
    DatePicker,
    DateTagged,
    SelectChip,
    TagablePrivilegeLabel,
    TagableDocumentLabel,
    TagableIssue,
    TagableTag,
    ChipInlineList,
    Comments,
    Actions,
    SatifiedElement,
    MenuPrivilegeLabel,
    MenuDocumentLabel,
    MenuTag,
    MenuIssue,
    Members,
    MenuRelatedCharacter,
    ConfirmItem,
    MenuSelectCheckBox,
    BookmarkOrFlag
  },
  computed: {
    cloneData() {
      return cloneData;
    },
    mapPrivilegeJustification() {
      return (
        this.appConfigChoices[
          this.appConfigConstants.PRIVILEGE_JUSTIFICATION
        ] || []
      ).map(x => ({ id: x.value, name: x.label, color: x.color }));
    },
    ...mapGetters("ht_store/matter/privilegeAttorney", [
      "dataPrivilegeAttorneyDetail"
    ]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]) // eslint-disable-line
  },
  methods: {

    filterValueByActorType(actorType, field, list = []) {
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
        const result = await this.updatePrivilegeDetailActorRequest(data);
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
        await this.updatePrivilegeDetailActorRequest(data);
        this.isLoadingUpdatePrivilegeActorMember = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorMember = false;
        throw error;
      }
    },

    async removePrivilege() {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: this.dataPrivilegeAttorneyDetail.pk
      };
      try {
        this.isLoadingDelete = true;
        await this.removePrivilegeRequest(data);
        this.$emit("onDeleteSuccess");
        this.isLoadingDelete = false;
        this.isShowPopupDelete = false;
      } catch (error) {
        this.isLoadingDelete = false;
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
        await this.removePrivilegeDetailActorRequest(data);
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
        await this.removePrivilegeDetailActorRequest(data);
        this.actor.list = this.actor.list.filter(x => x.pk !== data.actorId);
        this.isLoadingUpdatePrivilegeActorCharacter = false;
      } catch (error) {
        this.isLoadingUpdatePrivilegeActorCharacter = false;
        throw error;
      }
    },

    updatePrivilegeAttorneyDetail(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeAttorneyDetail.pk
        },
        body: {
          [name]: value
        }
      };
      this.updatePrivilegeAttorneyDetailRequest(data);
    },
    updatePrivilegeAttorneyCheckDetail(characterId, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeAttorneyDetail.pk,
          characterId
        },
        body: {
          is_privilege: value
        },
        detail: true
      };
      this.updatePrivilegeCheckRequest(data);
    },
    updateTimePrivilege(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeAttorneyDetail.pk
        },
        body: value
      };
      this.updatePrivilegeAttorneyDetailRequest(data);
    },
    async updateAttachmentPrivilegeDetail({ value, setLoading }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeAttorneyDetail.pk
        },
        body: {
          document_attachment: value
        }
      };
      try {
        setLoading(true);
        await this.updatePrivilegeAttorneyDetailAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    showDate(date1, date2) {
      if (date1 && date2 && moment(date1).isBefore(date2)) return "between";
      if (!date1 && date2) return "before";
      if (!date2 && date1) return "after";
      if (date2 && date1) return "date";
      return "no date";
    },
    ...mapActions("ht_store/matter/privilegeAttorney", [
      "updatePrivilegeAttorneyDetailRequest",
      "updatePrivilegeAttorneyDetailAsyncRequest",
      "updatePrivilegeDetailActorRequest",
      "removePrivilegeDetailActorRequest",
      "removePrivilegeRequest",
      "updatePrivilegeCheckRequest"
    ]) // eslint-disable-line
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.custom-chip /deep/ .v-chip {
  max-width: 80px;
}
</style>
