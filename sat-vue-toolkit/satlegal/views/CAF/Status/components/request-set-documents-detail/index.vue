<template>
  <div>
    <v-navigation-drawer
      :value="isShowPopup"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="60%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Request Set Document Detail</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat :disabled="isLoadingGetDetail" class="phong">
        <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="px-3">
              <v-col cols="6">
                <label class="mb-3">Request Item Description:</label>
                <v-row class="px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <div class="ml-3">
                    {{(dataDocumentDetail.request_item && dataDocumentDetail.request_item.name) || ''}}
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </div>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Request Number:</label>
                <v-row class="px-3">
                  <v-icon>mdi-numeric</v-icon>
                  <div class="ml-3">
                    {{(dataDocumentDetail.request_item && dataDocumentDetail.request_item.pk) || ''}}
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </div>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Name:</label>
                <v-row class="px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <v-text-field
                    :value="dataDocumentDetail.name"
                    placeholder="Name"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRequestDocumentDetail('name', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Date:</label>
                <v-row no-gutters class="td-date">
                  <div>{{dataDocumentDetail.date | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataDocumentDetail.date"
                    :textTooltip="
                  [dataDocumentDetail.date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataDocumentDetail.date)}`
                    : 'Add date'
                "
                    :colorButton="`${[dataDocumentDetail.date].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="updateRequestDocumentDetail('deadline', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Upload:</label>
                <AttachmentLink
                  :isStyle="true"
                  :attachment="dataDocumentDetail.attachment"
                  @update="updateAttachmentRSID($event.value)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Import Date:</label>
                <div class="ml-3">
                  {{dataDocumentDetail.import_date}}
                  <v-icon slot="prepend" color="red">mdi-create</v-icon>
                </div>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Date:</label>
                <v-row no-gutters class="td-dateTag">
                  <div
                    v-if="showDate(dataDocumentDetail.date_tagged_after, dataDocumentDetail.date_tagged_before) === 'date'"
                  >Date: {{dataDocumentDetail.date_tagged_after | formatShortDate}}</div>
                  <div
                    v-if="showDate(dataDocumentDetail.date_tagged_after, dataDocumentDetail.date_tagged_before) === 'between'"
                  >
                    After day: {{dataDocumentDetail.date_tagged_after | formatShortDate}}
                    <br />
                    Before day: {{dataDocumentDetail.date_tagged_before | formatShortDate}}
                  </div>
                  <div
                    v-if="showDate(dataDocumentDetail.date_tagged_after, dataDocumentDetail.date_tagged_before) === 'before'"
                  >Before day: {{dataDocumentDetail.date_tagged_before | formatShortDate}}</div>
                  <div
                    v-if="showDate(dataDocumentDetail.date_tagged_after, dataDocumentDetail.date_tagged_before) === 'after'"
                  >After day: {{dataDocumentDetail.date_tagged_after | formatShortDate}}</div>
                  <DateTagged
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :dateAfter="dataDocumentDetail.date_tagged_after"
                    :dateBefore="dataDocumentDetail.date_tagged_before"
                    :textTooltipAfter="
                  [dataDocumentDetail.date_tagged_after].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataDocumentDetail.date_tagged_after)}`
                    : 'Add date'
                  "
                    :textTooltipBefore="
                  [dataDocumentDetail.date_tagged_before].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataDocumentDetail.date_tagged_before)}`
                    : 'Add date'
                  "
                    class="mx-2"
                    @updateTime="updateTimeRSID($event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Custodians:</label>
                <RelatedCharacter
                  :value="dataDocumentDetail.custodians"
                  @update="updateRequestDocumentDetail('custodians', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Recipients:</label>
                <RelatedCharacter
                  :value="dataDocumentDetail.recipients"
                  @update="updateRequestDocumentDetail('recipients', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Authors:</label>
                <RelatedCharacter
                  :value="dataDocumentDetail.authors"
                  @update="updateRequestDocumentDetail('authors', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Filetype:</label>
                <div class="ml-3">{{dataDocumentDetail.file_ext}}</div>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Included in Trial?:</label>
                <Disputed
                  :value="dataDocumentDetail.included_trial"
                  @update="updateRequestDocumentDetail('included_trial', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Confidentiality:</label>
                <SelectCheckBox
                  title="Request Set Confidentiality"
                  keyText="name"
                  :value="dataDocumentDetail.confident"
                  :dataList="appConfigs.listPriority"
                  @update="updateRequestDocumentDetail('confident', $event.value)"
                  keyValue="value"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Privilege:</label>
                <SelectLabel
                  textTooltip="Add type"
                  title="Privileges"
                  :value="dataDocumentDetail.privileges"
                  :labels="mapPrillegeDetail"
                  :multiple="true"
                  @chooseLabel="
                  updateRequestDocumentDetail('privileges', $event)
                "
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Responsive:</label>
                <SelectCheckBox
                  title="Request Set Responsive"
                  keyText="label"
                  :value="dataDocumentDetail.responsive"
                  :dataList="appConfigChoices[appConfigConstants.RESPONSIVE]"
                  @update="updateRequestDocumentDetail('responsive', $event.value)"
                  keyValue="value"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataDocumentDetail.desc || ''"
                    class="mx-2"
                    placeholder="Document Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRequestDocumentDetail('desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Document Labels:</label>
                <Label
                  :value="dataDocumentDetail.labels"
                  @update="
                  updateRequestDocumentDetail('labels', $event)
                "
                  @onOpenMenu="
                  getDataLabelsRequest({ matterId:$route.params.matter || $route.params.projectId})
                "
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Legal Issues:</label>
                <Issue
                  :value="dataDocumentDetail.legal_issues"
                  @update="updateRequestDocumentDetail('legal_issues', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Reviewers:</label>
                <Members
                  :value="dataDocumentDetail.reviewers"
                  @update="updateRequestDocumentDetail('reviewers', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Review Status:</label>
                <SelectCheckBox
                  title="Request Set Review Status"
                  keyText="label"
                  :value="dataDocumentDetail.review_status"
                  :dataList="appConfigChoices[appConfigConstants.REVIEWSTATUS]"
                  @update="updateRequestDocumentDetail('review_status', $event.value)"
                  keyValue="value"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Key Terms:</label>
                <Tags
                  :value="dataDocumentDetail.tags"
                  :isLoadingGet="isLoadingGetTag"
                  :isEmitOpenMenu="true"
                  @update="updateRequestDocumentDetail('tags', $event)"
                  @onOpenMenu="getDataTag"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comments:</label>
                <Comments
                  :totalComments="dataDocumentDetail.total_comments"
                  :matterId="$route.params.matter || $route.params.projectId"
                  :rSId="dataDocumentDetail.request_set"
                  :itemsId="dataDocumentDetail.request_item && dataDocumentDetail.request_item.pk"
                  :id="dataDocumentDetail.pk"
                  :detail="true"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Redaction:</label>
                <SelectCheckBox
                  title="Request Set Redaction"
                  keyText="label"
                  :value="dataDocumentDetail.redaction"
                  :dataList="appConfigChoices[appConfigConstants.REDACTION]"
                  @update="updateRequestDocumentDetail('redaction', $event.value)"
                  keyValue="value"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                 <div class="d-flex">
                <v-btn
                  class="ma-0"
                  @click="$emit('updateBookmarkRSID',dataDocumentDetail.pk, dataDocumentDetail.bookmarked_pk, dataDocumentDetail.request_item && dataDocumentDetail.request_item.pk)"
                  icon
                  small
                >
                  <v-icon small :color="dataDocumentDetail.bookmarked_pk ? 'success' : 'grey'">mdi-bookmark</v-icon>
                </v-btn>
                <Action
                  :item="dataDocumentDetail"
                  @remove="$emit('remove',dataDocumentDetail, $event, dataDocumentDetail.request_item && dataDocumentDetail.request_item.pk)"
                />
                <a
                  class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
                  :title="dataDocumentDetail.total_reports"
                  @click="updateReports(dataDocumentDetail.pk, dataDocumentDetail.reported_object, dataDocumentDetail.request_item && dataDocumentDetail.request_item.pk)"
                >
                  <v-icon small :color="dataDocumentDetail.reported_object ? 'red' : 'grey'">mdi-flag</v-icon>
                </a>
              </div>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/AttachmentLink";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import moment from "moment";
import DateTagged from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/DateTagged";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import Comments from "../request-set-document/Comments";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean
  },
  components: {
    AttachmentLink,
    DatePicker,
    DateTagged,
    RelatedCharacter,
    Disputed,
    SelectCheckBox,
    SelectLabel,
    Label,
    Issue,
    Members,
    Tags,
    Comments,
    Action
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false
    };
  },
  methods: {
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
     async updateAttachmentRSID( value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
           itemsId:
            this.dataDocumentDetail.request_item &&
            this.dataDocumentDetail.request_item.pk,
          id: this.dataDocumentDetail.pk
        },
        body: {
          attachment: value
        },
        detail: true
      };
      await this.updateAttachmentRSIDRequest(data);
    },
    updateRequestDocumentDetail(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId:
            this.dataDocumentDetail.request_item &&
            this.dataDocumentDetail.request_item.pk,
          id: this.dataDocumentDetail.pk
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateRSIDRequest(data);
    },
    updateTimeRSID(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          itemsId:
            this.dataDocumentDetail.request_item &&
            this.dataDocumentDetail.request_item.pk,
          id: this.dataDocumentDetail.pk
        },
        body: {
          date_tagged_after: value.date_tagged_after || "",
          date_tagged_before: value.date_tagged_before || ""
        },
        detail: true
      };
      this.updateRSIDRequest(data);
    },
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"]),
    ...mapActions("ht_store/matter/requestStatus/requestSetsDocument", [
      "updateRSIDRequest",
      "updateAttachmentRSIDRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSetsDocument", [
      "dataDocumentDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", [
      "dataMembersNotExitsCurrentUser"
    ]),
    mapPrillegeDetail() {
      return (
        this.appConfigChoices[this.appConfigConstants.PRIVILLEGEDETAIL] || []
      ).map(x => ({ id: x.value, name: x.label, color: x.color }));
    }
  },
  watch: {
    isShowPopup: {
      handler(val) {
        if (val) {
          this.showExpenseDetail = val;
        }
      }
    },
    showExpenseDetail: {
      handler(val) {
        if (!val) {
          this.$emit("closeMenuRight");
        }
      }
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
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
.td-dateTag {
}
</style>
