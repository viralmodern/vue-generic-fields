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
          <span>Affidavitatement Detail</span>
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
                <label class="mb-3">Affidavit Statement:</label>
                <v-row class="px-3">
                  <v-text-field
                    :value="dataAffDetail.name"
                    placeholder="Name"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateKeyPleading('name', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Date Statement Made:</label>
                <v-row class="px-3">
                  <div>{{dataAffDetail.date_made | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataAffDetail.date_made"
                    :textTooltip="
                  [dataAffDetail.date_made].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataAffDetail.date_made)}`
                    : 'Add date'
                "
                    :colorButton="`${[dataAffDetail.date_made].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="updateKeyPleading('date_made', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Perjury Risk?:</label>
                <v-row class="px-3">
                  <FlagBtn
                    @update="updateKeyPleading('perjury_risk', $event)"
                    :isActive="dataAffDetail.perjury_risk"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Who made this affidavit statement:</label>
                <v-row class="px-3">
                  <CharacterSingles
                    textTooltip="Select Make By"
                    :value="dataAffDetail.make_by && dataAffDetail.make_by.pk"
                    @update="updateMakeBy($event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Question:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataAffDetail.question || ''"
                    class="mx-2"
                    placeholder="Question"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateExhibit('question', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Answer:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataAffDetail.answer || ''"
                    class="mx-2"
                    placeholder="Answer"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateKeyPleading('answer', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Follow up?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataAffDetail.follow_up"
                    @update="updateKeyPleading('follow_up', !dataAffDetail.follow_up)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Legal Issue:</label>
                <v-row class="px-3">
                  <Issue
                    :value="dataAffDetail.legal_issues"
                    @update="updateKeyPleading('legal_issues', $event)"
                    :isEmitOpenMenu="true"
                    @onOpenMenu="$emit('getDataIssues')"
                    :isLoadingGet="isLoadingGetIssue"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataAffDetail.total_comments"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataAffDetail.deposition"
                    :id="dataAffDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3">
                  <div class="d-flex">
                    <BookmarkOrFlag
                      :valueBookmark="dataAffDetail.bookmarked_pk"
                      :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/affs/${dataAffDetail.pk}`"
                      routerMutation="ht_store/matter/deposition/affidavitStatement/updateDataKeyPleading"
                      :pk="dataAffDetail.pk"
                      :detail="true"
                      routerMutationDetail="ht_store/matter/deposition/affidavitStatement/updateDataDetail"
                      :isShowFlag="false"
                    />
                    <Action :item="dataAffDetail" @remove="$emit('remove', dataAffDetail, $event)" />
                  </div>
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
import { mapGetters, mapActions } from "vuex";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import FlagBtn from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/FlagBtn";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Comments from "../../../components/Affs/Comments";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    affId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Disputed,
    Comments,
    DatePicker,
    Action,
    FlagBtn,
    CharacterSingles,
    Issue,
    BookmarkOrFlag
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
    ...mapActions("ht_store/matter/deposition/affidavitStatement", [
      "updateKeyPleadingRequest",
      "updateKeyPleadingAsyncRequest",
      "updateMakeByRequest"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    updateMakeBy(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          affId: this.affId
        },
        body: {
          make_by: value
        },
        detail: true
      };
      this.updateMakeByRequest(data);
    },
    updateKeyPleading(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          affId: this.affId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateKeyPleadingRequest(data);
    },
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/affidavitStatement", [
      "dataAffDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
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
