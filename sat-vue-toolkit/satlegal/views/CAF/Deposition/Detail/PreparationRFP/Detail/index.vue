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
      width="45%"
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
                <label class="mb-3">Production Request:</label>
                <v-row class="px-3">
                  <v-text-field
                    :value="dataRFPDetail.name"
                    placeholder="Production Request"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRequestSetTask('name', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Produced:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataRFPDetail.produced"
                    @update="updateRFP('produced', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Source:</label>
                <v-row class="px-3">
                  <SourceDesposition
                    :value="dataRFPDetail.sources"
                    @update="updateRFP('sources', $event)"
                    lengthDisplay="2"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Step To Locate Request Documents:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataRFPDetail.step_to_locate || ''"
                    class="mx-2"
                    placeholder="Step To Locate Request Documents"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRFP('step_to_locate', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Availability:</label>
                <v-row class="px-3">
                  <SelectCheckBox
                    title="Availability"
                    :value="dataRFPDetail.availability"
                    :dataList="appConfigs.availablility"
                    @update="updateRFP('availability', $event.id)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Objection:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataRFPDetail.objection"
                    @update="updateRFP('objection', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Objection type:</label>
                <v-row class="px-3">
                  <ObjectionType
                    :value="dataRFPDetail.objection_types"
                    :isEmitOpenMenu="true"
                    @update="updateRFP('objection_types', $event)"
                    @onOpenMenu="$emit('getDataObjectionType')"
                    :isLoadingGet="isLoadingGetObjectionType"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataRFPDetail.comment_count"
                    @update="updateRFP('comment_count', $event)"
                    :rowId="dataRFPDetail.pk"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="$route.params.depositionId"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachments:</label>
                <v-row class="px-3">
                  {{dataRFPDetail.attachments && dataRFPDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="onShowPopupAttachment(dataRFPDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-2"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Legal Issue:</label>
                <v-row class="px-3">
                  <Issue
                    :value="dataRFPDetail.legal_issues"
                    :isEmitOpenMenu="true"
                    @update="updateRFP('legal_issues', $event)"
                    @onOpenMenu="$emit('getDataIssues')"
                    :isLoadingGet="isLoadingGetIssue"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Notes:</label>
                <v-row class="px-3">
                  <NoteDeposition
                    :totalNotes="dataRFPDetail.note_count"
                    :RFPId="dataRFPDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/requestforproddocs`"
                  routerMutation="ht_store/matter/deposition/RFP/updateDataRFP"
                  :pk="item.id"
                  :isShowFlag="false"
                />
                  <Action :item="dataRFPDetail" @remove="$emit('remove', dataRFPDetail, $event)" />
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
      :detail="true"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import SourceDesposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SourceDesposition";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import ObjectionType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ObjectionType";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import NoteDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/NoteDeposition";
import Attachments from "../../../components/request-for-production/Attachments";
import Comments from "../Comments";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    requestForProductionId: Number,
    isLoadingGetObjectionType: Boolean,
    isLoadingGetIssue: Boolean
  },
  components: {
    Disputed,
    SourceDesposition,
    SelectCheckBox,
    ObjectionType,
    AddIcon,
    Comments,
    Issue,
    NoteDeposition,
    Attachments,
    Action,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false,
      isShowPopupAttachment: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/deposition/RFP", [
      "updateRFPRequest",
    ]),
    updateRFP(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.requestForProductionId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateRFPRequest(data);
    },
    onShowPopupAttachment(attachments) {
      this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapMutations("ht_store/matter/deposition/RFP", ["getDataAttachments"])
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/RFP", [
      "dataRFPDetail",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
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
</style>
