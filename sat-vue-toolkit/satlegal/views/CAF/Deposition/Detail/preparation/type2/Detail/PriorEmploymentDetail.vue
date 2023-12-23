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
          <span>Prior Employment Detail</span>
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
                <label class="mb-3">Case name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorEmploymentDetail.case_name || ''"
                    class="mx-2"
                    placeholder="Case name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'case_name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Title:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorEmploymentDetail.title || ''"
                    class="mx-2"
                    placeholder="Title"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'title', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">From:</label>
                <v-row class="px-3">
                  <YearSelect
                    width="50px"
                    :max="dataPriorEmploymentDetail.to_year"
                    border-unset
                    hide-details
                    :value="dataPriorEmploymentDetail.from_year"
                    @update="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'from_year',$event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">To:</label>
                <v-row class="px-3">
                  <YearSelect
                    width="50px"
                    border-unset
                    hide-details
                    :min="dataPriorEmploymentDetail.from_year"
                    :value="dataPriorEmploymentDetail.to_year"
                    @update="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'to_year',$event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Role:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorEmploymentDetail.role || ''"
                    class="mx-2"
                    placeholder="Role"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'role', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Testimony side:</label>
                <v-row class="px-3">
                  <SelectCheckBox
                    title="Testimony side"
                    :value="dataPriorEmploymentDetail.testimony"
                    :dataList="[NA,...appConfigs.favorableEvidences]"
                    @update="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'testimony', $event.id)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Who win?:</label>
                <v-row class="px-3">
                  <SelectCheckBox
                    title="Who win"
                    :value="dataPriorEmploymentDetail.who_win"
                    :dataList="[NA,...appConfigs.whoWin]"
                    @update="$emit('updatePriorEmployment',dataPriorEmploymentDetail.pk,'who_win', $event.id)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  <AttachmentLink
                    :value="dataPriorEmploymentDetail.attachment"
                    @updateAsync="$emit('updatePriorEmploymentAsync',dataPriorEmploymentDetail.pk, 'attachment', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataPriorEmploymentDetail.total_notes"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataPriorEmploymentDetail.deposition"
                    :priorEmploymentId="dataPriorEmploymentDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataPriorEmploymentDetail.total_comments"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataPriorEmploymentDetail.deposition"
                    :priorEmploymentId="dataPriorEmploymentDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="dataPriorEmploymentDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/prior-employments/${dataPriorEmploymentDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/priorEmployment/updateData"
                    :pk="dataPriorEmploymentDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/priorEmployment/updateDataPriorEmploymentDetail"
                  />
                  <Action
                    :item="dataPriorEmploymentDetail"
                    @remove="$emit('remove', dataPriorEmploymentDetail, $event)"
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
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import Comments from "../../../../components/prior-employment/Comments";
import Notes from "../../../../components/prior-employment/Notes";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    priorEmploymentId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Action,
    YearSelect,
    BookmarkOrFlag,
    Comments,
    Notes,
    SelectCheckBox,
    AttachmentLink
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
    ...mapGetters("ht_store/matter/deposition/priorEmployment", [
      "dataPriorEmploymentDetail"
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
