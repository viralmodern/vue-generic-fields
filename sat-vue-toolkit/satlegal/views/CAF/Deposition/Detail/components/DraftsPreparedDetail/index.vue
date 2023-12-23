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
                <label class="mb-3">Draft Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataDraftsDetail.name || ''"
                    class="mx-2"
                    placeholder="Draft Name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateDraftsPrepared',dataDraftsDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Draft Date:</label>
                <v-row class="px-3">
                  <div>{{ dataDraftsDetail.date | formatShortDate }}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataDraftsDetail.date"
                    :textTooltip="
                    [dataDraftsDetail.date].some(x => !!x)
                      ? `${$options.filters.formatShortDate(dataDraftsDetail.date)}`
                      : 'Add date'
                  "
                    class="mx-2"
                    :colorButton="`${[dataDraftsDetail.date].some(x => !!x) ? 'indigo' : ''}`"
                    @updateTime="
                   $emit('updateDraftsPrepared',dataDraftsDetail.pk,'date', $event.date)
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Draft Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataDraftsDetail.desc || ''"
                    class="mx-2"
                    placeholder="Draft Name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateDraftsPrepared',dataDraftsDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Who Read It?:</label>
                <v-row class="px-3">
                  <RelatedCharacter
                    :value="dataDraftsDetail.who_reads"
                    @update="$emit('updateDraftsPrepared',dataDraftsDetail.pk,'who_reads', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataDraftsDetail.attachments && dataDraftsDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataDraftsDetail.pk, dataDraftsDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataDraftsDetail.note_count"
                    :draftId="dataDraftsDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataDraftsDetail.comment_count"
                    :draftId="dataDraftsDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="dataDraftsDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/drafts/${dataDraftsDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/priorEmployment/updateData"
                    :pk="dataDraftsDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/priorEmployment/updateDataDraftsDetail"
                  />
                  <Action
                    :item="dataDraftsDetail"
                    @remove="$emit('remove', dataDraftsDetail.pk, $event)"
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
import Comments from "../../../components/drafts-prepared/Comments";
import Notes from "../../../components/drafts-prepared/Notes";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    draftId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Comments,
    DatePicker,
    Action,
    Notes,
    RelatedCharacter,
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
    ...mapGetters("ht_store/matter/deposition/draftsPrepare", [
      "dataDraftsDetail"
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
