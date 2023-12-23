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
          <span>Given Deposition Detail</span>
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
                <label class="mb-3">Deposition Date:</label>
                <v-row class="px-3">
                  <div>{{dataGeventDetail.deposition_date | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataGeventDetail.deposition_date"
                    :textTooltip="
                  [dataGeventDetail.deposition_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataGeventDetail.deposition_date)}`
                    : 'Add date'
                  "
                    class="mx-2"
                    @updateTime="$emit('updateGiven',dataGeventDetail.pk, 'deposition_date', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Case:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataGeventDetail.case || ''"
                    class="mx-2"
                    placeholder="Case"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateGiven',dataGeventDetail.pk,'case', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Availability of Transcript:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataGeventDetail.able_transcript"
                    @update="$emit('updateGiven',dataGeventDetail.pk, 'able_transcript', !dataGeventDetail.able_transcript)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataGeventDetail.desc || ''"
                    class="mx-2"
                    placeholder="Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateGiven',dataGeventDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Label:</label>
                <v-row class="px-3">
                  <Label
                    :value="(dataGeventDetail.labels || []).map(x => x.pk)"
                    @update="$emit('updateGiven',dataGeventDetail.pk, 'labels', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataGeventDetail.attachments && dataGeventDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataGeventDetail.pk, dataGeventDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataGeventDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataGeventDetail.deposition"
                    :rowId="dataGeventDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataGeventDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataGeventDetail.deposition"
                    :rowId="dataGeventDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="dataGeventDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/prior-employments/${dataGeventDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/givenDeposition/updateDataMutations"
                    :pk="dataGeventDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/givenDeposition/updateDataDetail"
                  />
                  <Action
                    :item="dataGeventDetail"
                    @remove="$emit('remove', dataGeventDetail, $event)"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Comments from "../Comments";
import Notes from "../Notes";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    rowId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Action,
    Comments,
    Notes,
    AddIcon,
    DatePicker,
    Disputed,
    Label,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false,
      NA
    };
  },
  methods: {},
  computed: {
    ...mapGetters("ht_store/matter/deposition/givenDeposition", [
      "dataGeventDetail"
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
