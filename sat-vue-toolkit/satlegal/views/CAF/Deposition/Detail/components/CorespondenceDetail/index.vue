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
          <span>Correspondence Detail</span>
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
                <label class="mb-3">Correspondence Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataCorrespondenceDetail.name || ''"
                    class="mx-2"
                    placeholder="Correspondence Name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateCorrespondence',dataCorrespondenceDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Custodian:</label>
                <v-row class="px-3">
                  <Character
                    :value="dataCorrespondenceDetail.custodians"
                    @update="$emit('updateCorrespondence',dataCorrespondenceDetail.pk,'custodians', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Correspondence date:</label>
                <v-row class="px-3">
                  <div>{{dataCorrespondenceDetail.date | formatShortDate}}</div>
                  <DatePicker
                    title="Correspondence date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataCorrespondenceDetail.date"
                    :textTooltip="
                  [dataCorrespondenceDetail.date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataCorrespondenceDetail.date)}`
                    : 'Add correspondence date'
                "
                    class="mx-2"
                    @updateTime="$emit('updateCorrespondence',dataCorrespondenceDetail.pk,'date', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataCorrespondenceDetail.desc || ''"
                    class="mx-2"
                    placeholder="Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateCorrespondence',dataCorrespondenceDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataCorrespondenceDetail.attachments && dataCorrespondenceDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataCorrespondenceDetail.pk, dataCorrespondenceDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataCorrespondenceDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataCorrespondenceDetail.deposition"
                    :id="dataCorrespondenceDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataCorrespondenceDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataCorrespondenceDetail.deposition"
                    :id="dataCorrespondenceDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="dataCorrespondenceDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/correspondences/${dataCorrespondenceDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/correspondence/updateDataMutations"
                    :pk="dataCorrespondenceDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/correspondence/updateDataDetail"
                  />
                  <Action
                    :item="dataCorrespondenceDetail"
                    @remove="$emit('remove', dataCorrespondenceDetail, $event)"
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
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Comments from "../../../components/Correspondence/Comments";
import Character from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Character";
import Notes from "../../../components/deposition/TdNotesCorrespondence";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
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
    Comments,
    DatePicker,
    Action,
    Notes,
    Character,
    AddIcon,
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
  computed: {
    ...mapGetters("ht_store/matter/deposition/correspondence", [
      "dataCorrespondenceDetail"
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
