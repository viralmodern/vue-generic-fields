<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Document Upload :</p>
          <AttachmentLink
            :value="dataPrivilegeDetail.document_attachment"
            @updateAsync="updateAttachmentPrivilegeDetail"
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Action :</p>
          <div class="d-flex">
            <BookmarkOrFlag
              :valueBookmark="dataPrivilegeDetail.bookmarked_pk"
              :endpoint="`/api/matters/${$$$matterID}/privilege-logs/${dataPrivilegeDetail.pk}`"
              routerMutation="ht_store/matter/privilege/updateDataPrivilege"
              :pk="dataPrivilegeDetail.pk"
              :valueFlag="dataPrivilegeDetail.reported_object && dataPrivilegeDetail.reported_object.pk"
              routerMutationDetail="ht_store/matter/privilege/setDataPrivileDetail"
              :detail="true"
            />
            <Actions
              :isShowActionBookmark="false"
              style="justify-content: unset!important;"
              :isShowActionView="false"
              :isShowActionFlag="false"
              @onClickDelete="isShowPopupDelete = true;"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataPrivilegeDetail.entry_name"
              label="Privilege Entry"
              placeholder="Privilege Entry"
              @change="updatePrivilegeDetail('entry_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataPrivilegeDetail.document_name"
              label="Document Name"
              placeholder="Document Name"
              @change="updatePrivilegeDetail('document_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeDetail.document_desc"
              label="Document Description"
              placeholder="Document Description"
              @change="updatePrivilegeDetail('document_desc', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeDetail.subject_matter"
              label="Subject Matter"
              placeholder="Subject Matter"
              @change="updatePrivilegeDetail('subject_matter', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-textarea
              rows="1"
              auto-grow
              :value="dataPrivilegeDetail.withheld_reason"
              label="Withheld Reason"
              placeholder="Withheld Reason"
              @change="updatePrivilegeDetail('withheld_reason', $event)"
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
            :value="dataPrivilegeDetail.confidentiality"
            @change="updatePrivilegeDetail('confidentiality', $event)"
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
            :value="dataPrivilegeDetail.responsive"
            @change="updatePrivilegeDetail('responsive', $event)"
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
            :value="dataPrivilegeDetail.review_status"
            @change="updatePrivilegeDetail('review_status', $event)"
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
            :value="dataPrivilegeDetail.redaction"
            @change="updatePrivilegeDetail('redaction', $event)"
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
            :value="dataPrivilegeDetail.client_privilege_type"
            @change="
              updatePrivilegeDetail('client_privilege_type', $event)
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Privilege Label :</p>
          <TagablePrivilegeLabel
            maxWidth="200px"
            :tag="dataPrivilegeDetail.privilege_labels || []"
            @onClickIcon="
              $_toggleMenuPrivilegeLabelMixin_openMenu({
                ...$event,
                pk: dataPrivilegeDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Document Labels :</p>
          <TagableDocumentLabel
            maxWidth="200px"
            :tag="dataPrivilegeDetail.document_labels"
            @onClickIcon="
              $_toggleMenuDocumentLabelMixin_openMenu({
                ...$event,
                pk: dataPrivilegeDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Legal Issues :</p>
          <TagableIssue
            maxWidth="200px"
            :tag="dataPrivilegeDetail.issues"
            @onClickIcon="
              $_toggleMenuIssueMixin_openMenu({
                ...$event,
                pk: dataPrivilegeDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Key Terms :</p>
          <TagableTag
            maxWidth="200px"
            :lengthDisplay="2"
            textNoData="No Key Terms"
            :tag="dataPrivilegeDetail.tags"
            @onClickIcon="
              $_toggleMenuTagMixin_openMenu({
                ...$event,
                pk: dataPrivilegeDetail.pk
              })
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Reviewers :</p>
          <Members
            textTooltip="Add"
            :value="dataPrivilegeDetail.reviewers"
            @update="updatePrivilegeDetail('reviewers', $event)"
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Senders Characters :</p>
          <ChipInlineList
            maxWidth="200px"
            textNoData="(No Senders Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  1,
                  'character',
                  dataPrivilegeDetail.actors
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
                pk: dataPrivilegeDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    1,
                    'character',
                    dataPrivilegeDetail.actors
                  )
                )
              });
              actor = {
                type: 1,
                list: cloneData(dataPrivilegeDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Senders Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  1,
                  'workspace_member_id',
                  dataPrivilegeDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeDetail.pk,
                1,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 1, list: dataPrivilegeDetail.actors },
                dataPrivilegeDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Recipients Characters :</p>
          <ChipInlineList
            textNoData="(No Recipients Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  2,
                  'character',
                  dataPrivilegeDetail.actors
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
                pk: dataPrivilegeDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    2,
                    'character',
                    dataPrivilegeDetail.actors
                  )
                )
              });
              actor = {
                type: 2,
                list: cloneData(dataPrivilegeDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Recipients Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  2,
                  'workspace_member_id',
                  dataPrivilegeDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeDetail.pk,
                2,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 2, list: dataPrivilegeDetail.actors },
                dataPrivilegeDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Copyees Characters :</p>
          <ChipInlineList
            textNoData="(No Copyees Characters)"
            :value="
              mapValueActorByCharacter(
                filterValueByActorType(
                  3,
                  'character',
                  dataPrivilegeDetail.actors
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
                pk: dataPrivilegeDetail.pk,
                value: mapValueActorByCharacter(
                  filterValueByActorType(
                    3,
                    'character',
                    dataPrivilegeDetail.actors
                  )
                )
              });
              actor = {
                type: 3,
                list: cloneData(dataPrivilegeDetail.actors)
              };
            "
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Copyees Members :</p>
          <Members
            textTooltip="Add"
            :value="
              mapValueActorByMember(
                filterValueByActorType(
                  3,
                  'workspace_member_id',
                  dataPrivilegeDetail.actors
                )
              )
            "
            @selectRow="
              updatePrivilegeActorMember(
                dataPrivilegeDetail.pk,
                3,
                $event
              )
            "
            @removeRow="
              removePrivilegeActorMember(
                { type: 3, list: dataPrivilegeDetail.actors },
                dataPrivilegeDetail.pk,
                $event
              )
            "
            :isLoadingUpdate="isLoadingUpdatePrivilegeActorMember"
          />
        </v-col>
        <v-col cols="6">
          <p>Comments :</p>
          <Comments
            :totalComments="dataPrivilegeDetail.total_comments"
            :matterId="$route.params.matter || $route.params.projectId"
            :privilegeId="dataPrivilegeDetail.pk"
          />
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Date Tagged :</p>
          <div class="d-flex">
            <div
              v-if="
                showDate(
                  dataPrivilegeDetail.date_tagged_after,
                  dataPrivilegeDetail.date_tagged_before
                ) === 'date'
              "
            >
              Date:
              {{
              dataPrivilegeDetail.date_tagged_after | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeDetail.date_tagged_after,
                  dataPrivilegeDetail.date_tagged_before
                ) === 'between'
              "
            >
              After day:
              {{
              dataPrivilegeDetail.date_tagged_after | formatShortDate
              }}
              <br />
              Before day:
              {{
              dataPrivilegeDetail.date_tagged_before | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeDetail.date_tagged_after,
                  dataPrivilegeDetail.date_tagged_before
                ) === 'before'
              "
            >
              Before day:
              {{
              dataPrivilegeDetail.date_tagged_before | formatShortDate
              }}
            </div>
            <div
              v-if="
                showDate(
                  dataPrivilegeDetail.date_tagged_after,
                  dataPrivilegeDetail.date_tagged_before
                ) === 'after'
              "
            >
              After day:
              {{
              dataPrivilegeDetail.date_tagged_after | formatShortDate
              }}
            </div>
            <DateTagged
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :dateAfter="dataPrivilegeDetail.date_tagged_after"
              :dateBefore="dataPrivilegeDetail.date_tagged_before"
              :textTooltipAfter="
                [dataPrivilegeDetail.date_tagged_after].some(x => !!x)
                  ? `${$options.filters.formatShortDate(
                      dataPrivilegeDetail.date_tagged_after
                    )}`
                  : 'Add date'
              "
              :textTooltipBefore="
                [dataPrivilegeDetail.date_tagged_before].some(x => !!x)
                  ? `${$options.filters.formatShortDate(
                      dataPrivilegeDetail.date_tagged_before
                    )}`
                  : 'Add date'
              "
              class="mx-2"
              @updateTime="updateTimePrivilege"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Document Date :</p>
          <div class="d-flex align-center">
            <span class="text-no-wrap caption" v-if="dataPrivilegeDetail.document_date">
              {{
              dataPrivilegeDetail.document_date | formatShortDate
              }}
            </span>
            <span v-else class="caption" style="color:rgba(0,0,0,.6)">(No Date)</span>
            <DatePicker
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataPrivilegeDetail.document_date"
              :textTooltip="
                [dataPrivilegeDetail.document_date].some(x => !!x)
                  ? 'Update Date'
                  : 'Add date'
              "
              :colorButton="
                `${
                  [dataPrivilegeDetail.document_date].some(x => !!x)
                    ? 'indigo'
                    : ''
                }`
              "
              class="mx-2"
              @updateTime="
                updatePrivilegeDetail('document_date', $event.date)
              "
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p class="font-weight-bold mb-1">Document Import Date :</p>
          <div class="caption">{{dataPrivilegeDetail.import_date}}</div>
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
        updatePrivilegeDetail('privilege_labels', $event);
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
        updatePrivilegeDetail('document_labels', $event);
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
        updatePrivilegeDetail('tags', $event);
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
        updatePrivilegeDetail('issues', $event);
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
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import Comments from "./Comments";

import MenuPrivilegeLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/MenuPrivilegeLabel";
import MenuDocumentLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/MenuDocumentLabel";
import MenuTag from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/MenuTag";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";

import toggleMenuPrivilegeLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/privilege-label/mixins/toggleMenuPrivilegeLabelMixin";
import toggleMenuDocumentLabelMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/document-label/mixins/toggleMenuDocumentLabelMixin";
import toggleMenuTagMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/tag/mixins/toggleMenuTagMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { cloneData } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  mixins: [
    appConfigMixin,
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
    AttachmentLink,
    DatePicker,
    DateTagged,
    SelectChip,
    TagablePrivilegeLabel,
    TagableDocumentLabel,
    TagableIssue,
    TagableTag,
    ChipInlineList,
    Actions,
    Comments,
    BookmarkOrFlag,
    MenuPrivilegeLabel,
    MenuDocumentLabel,
    MenuTag,
    MenuIssue,
    Members,
    MenuRelatedCharacter,
    ConfirmItem
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
    ...mapGetters("ht_store/matter/privilege", ["dataPrivilegeDetail"]), // eslint-disable-line
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
        id: this.dataPrivilegeDetail.pk,
        isFieldArray: true
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

    updatePrivilegeDetail(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeDetail.pk
        },
        body: {
          [name]: value
        }
      };
      this.updatePrivilegeDetailRequest(data);
    },
    updateTimePrivilege(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeDetail.pk
        },
        body: value
      };
      this.updatePrivilegeDetailRequest(data);
    },
    async updateAttachmentPrivilegeDetail({ value, setLoading }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          id: this.dataPrivilegeDetail.pk
        },
        body: {
          document_attachment: value
        }
      };
      try {
        setLoading(true);
        await this.updatePrivilegeDetailAsyncRequest(data);
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
    ...mapActions("ht_store/matter/privilege", [
      "updatePrivilegeDetailRequest",
      "updatePrivilegeDetailAsyncRequest",
      "updatePrivilegeDetailActorRequest",
      "removePrivilegeDetailActorRequest",
      "removePrivilegeRequest"
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
