<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <label class="mb-3">Risk Name:</label>
          <v-row class="px-3">
            <TextField
              :value="riskDetail.name"
              @update="updateRisk(riskDetail.pk, 'name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Potential Consequences Level:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Potential Consequences Level"
              :value="riskDetail.potential_consequence"
              :dataList="appConfigs.potential_consequence"
              @update="updateRisk(riskDetail.pk, 'potential_consequence', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Legal Issue:</label>
          <v-row class="px-3">
            <TagableIssue
              :tag="riskDetail.legal_issues || []"
              @onClickIcon="
                  $_toggleMenuIssueMixin_openMenu({
                    ...$event,
                    pk: riskDetail.pk,
                  })"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Area:</label>
          <v-row class="px-3">
            <TagableRiskArea
              :tag="riskDetail.risk_areas || []"
              @onClickIcon="
                  $_toggleMenuRiskAreaMixin_openMenu({
                    ...$event,
                    pk: riskDetail.pk,
                  })"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Likelihood:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Likelihood"
              :value="riskDetail.likelihood"
              :dataList="appConfigs.likelihood"
              @update="updateRisk(riskDetail.pk, 'likelihood', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Description:</label>
          <v-row class="px-3">
            <TextArea :value="riskDetail.desc" @update="updateRisk(riskDetail.pk, 'desc', $event)" />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Severity:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Severity"
              :value="riskDetail.severity"
              :dataList="appConfigs.severity"
              @update="updateRisk(riskDetail.pk, 'severity', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Priority:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Priority"
              :value="riskDetail.priority"
              :dataList="appConfigs.priority_risk"
              @update="updateRisk(riskDetail.pk, 'priority', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Status:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Status"
              :value="riskDetail.status"
              :dataList="appConfigs.status_risk"
              @update="updateRisk(riskDetail.pk, 'status', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Assigned Member:</label>
          <v-row class="px-3">
            <Members
              :value="riskDetail.members"
              :isLoadingGet="isLoadingGetMember"
              :isEmitOpenMenu="true"
              @update="updateRisk(riskDetail.pk, 'members', $event)"
              @onOpenMenu="getDataMember"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Point of Contact:</label>
          <v-row class="px-3">
            <Members
              single
              :value="riskDetail.point_of_contact"
              :isLoadingGet="isLoadingGetMember"
              :isEmitOpenMenu="true"
              @update="updateRisk(riskDetail.pk, 'point_of_contact', $event)"
              @onOpenMenu="getDataMember"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Who at Risk:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Who at Risk"
              :value="riskDetail.who_at_risk"
              :dataList="appConfigs.who_at_risk"
              @update="updateRisk(riskDetail.pk, 'who_at_risk', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Level:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.level"
              :dataList="appConfigs.level_risk"
              @update="updateRisk(riskDetail.pk, 'level', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Direction:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.direction"
              :dataList="appConfigs.direction"
              @update="updateRisk(riskDetail.pk, 'direction', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Frequency:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.frequency"
              :dataList="appConfigs.frequency"
              @update="updateRisk(riskDetail.pk, 'frequency', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Detectability:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.detectability"
              :dataList="appConfigs.detectability"
              @update="updateRisk(riskDetail.pk, 'detectability', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Criticality:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.criticality"
              :dataList="appConfigs.criticality"
              @update="updateRisk(riskDetail.pk, 'criticality', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Owner:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Level"
              :value="riskDetail.owner"
              :dataList="appConfigs.owner"
              @update="updateRisk(riskDetail.pk, 'owner', $event.id)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Trigger Date:</label>
          <v-row class="px-3">
            <div>{{riskDetail.trigger_date | formatShortDate}}</div>
            <DatePicker
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="riskDetail.trigger_date"
              :textTooltip="
                  [riskDetail.trigger_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(riskDetail.trigger_date)}`
                    : 'Add date'"
              :colorButton="`${[riskDetail.trigger_date].some(x => !!x) ? 'indigo' : ''}`"
              class="mx-2"
              @updateTime="updateRisk(riskDetail.pk, 'trigger_date', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Expiration Date:</label>
          <v-row class="px-3">
            <div>{{riskDetail.expiration_date | formatShortDate}}</div>
            <DatePicker
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="riskDetail.expiration_date"
              :textTooltip="
                  [riskDetail.expiration_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(riskDetail.expiration_date)}`
                    : 'Add date'"
              :colorButton="`${[riskDetail.expiration_date].some(x => !!x) ? 'indigo' : ''}`"
              class="mx-2"
              @updateTime="updateRisk(riskDetail.pk, 'expiration_date', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Attachment:</label>
          <v-row class="px-3">
            {{ (riskDetail.attachments ||[]).length }}
            <AddIcon
              @onClickIcon="onShowPopupAttachment(riskDetail.attachments)"
              icon="mdi-attachment"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Tags:</label>
          <v-row class="px-3">
            <Tags
              :value="riskDetail.tags"
              :isLoadingGet="isLoadingGetTag"
              :isEmitOpenMenu="true"
              @update="updateRisk(riskDetail.pk, 'tags', $event)"
              @onOpenMenu="getDataTag"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Note:</label>
          <v-row class="px-3">
            <Notes
              :totalNotes="riskDetail.total_notes"
              @update="updateRisk(riskDetail.pk, 'total_notes', $event)"
              :riskId="riskDetail.pk"
              :detail="true"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Source of Risk: {{riskDetail.risk_sources}}</label>

          <v-row class="px-3">
            <TagableRiskSource
              :tag="riskDetail.risk_sources || []"
              @onClickIcon="
                  $_toggleMenuRiskSourceMixin_openMenu({
                    ...$event,
                    pk: riskDetail.pk,
                  })"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Risk Cost:</label>
          <v-row class="px-3">{{riskDetail.cost}}</v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Action:</label>
          <v-row class="px-3 d-flex">
            <BookmarkOrFlag
              :valueBookmark="riskDetail.bookmarked_pk"
              :endpoint="`/api/matters/${$$$matterID}/risks/${riskDetail.pk}`"
              routerMutation="ht_store/matter/risk/register/updateDataRisk"
              :pk="riskDetail.id"
              :valueFlag="riskDetail.reported_object && riskDetail.reported_object.pk"
              :detail="true"
              routerMutationDetail="ht_store/matter/risk/register/getRiskDetail"
            />
            <Action
              :item="riskDetail"
              @remove="$emit('remove', {item: riskDetail, close: $event})"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-form>
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
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :riskId="this.riskId"
      @closePopup="isShowPopupAttachment = false"
      :detail="true"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Notes from "../../components/Notes";
import Attachments from "../../components/Attachments";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import TagableRiskArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/TagableRiskArea";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import TagableRiskSource from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/TagableRiskSource";
import MenuRiskSource from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/MenuRiskSource";
import MenuRiskArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/MenuRiskArea";

// import Comments from "../../components/Comments";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuRiskAreaMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/risk-area/mixins/toggleMenuRiskAreaMixin";
import toggleMenuRiskSourceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/mixins/toggleMenuRiskSourceMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [
    appConfigMixin,
    toggleMenuIssueMixin,
    toggleMenuRiskAreaMixin,
    toggleMenuRiskSourceMixin
  ],
  props: {
    isLoadingGetMember: Boolean,
    riskId: Number,
    slickMode: String
  },
  components: {
    Members,
    SelectCheckBox,
    DatePicker,
    Notes,
    TextField,
    TagableIssue,
    MenuIssue,
    TagableRiskArea,
    TextArea,
    AddIcon,
    Tags,
    TagableRiskSource,
    MenuRiskSource,
    MenuRiskArea,
    Attachments,
    Action,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      isCallApiTagCell: false,
      isLoadingGetTag: false,
      isCallApiMemberCell: false,
      isShowPopupAttachment: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/risk/register", [
      "riskDetail",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/risk/register", ["updateRiskRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    ...mapMutations("ht_store/matter/risk/register", ["getDataAttachments"]),
    updateRisk(riskId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateRiskRequest(data);
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
    onShowPopupAttachment(attachments) {
      this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    }
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
.text-custom {
  color: rgba(0, 0, 0, 0.6);
}
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 100px;
  align-items: center;
}
</style>
