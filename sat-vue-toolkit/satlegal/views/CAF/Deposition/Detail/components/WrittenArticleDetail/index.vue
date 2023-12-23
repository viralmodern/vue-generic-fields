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
          <span>Written Article Detail</span>
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
                <label class="mb-3">Publication Date:</label>
                <v-row class="px-3">
                  <div>{{dataWrittenArticleDetail.publish_date | formatShortDate}}</div>
                  <DatePicker
                    title="Publication Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataWrittenArticleDetail.publish_date"
                    :textTooltip="
                  [dataWrittenArticleDetail.publish_date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataWrittenArticleDetail.publish_date)}`
                    : 'Add publication Date'
                "
                    class="mx-2"
                    @updateTime="$emit('updateKeyPleading',dataWrittenArticleDetail.pk,'publish_date', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Publication Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataWrittenArticleDetail.name || ''"
                    class="mx-2"
                    placeholder="Publication Name"
                    rows="3"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateKeyPleading',dataWrittenArticleDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Publisher:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataWrittenArticleDetail.publisher || ''"
                    class="mx-2"
                    placeholder="Publisher"
                    rows="3"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateKeyPleading',dataWrittenArticleDetail.pk,'publisher', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataWrittenArticleDetail.desc || ''"
                    class="mx-2"
                    placeholder="Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateKeyPleading',dataWrittenArticleDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Label:</label>
                <v-row class="px-3">
                  <Label
                    :value="(dataWrittenArticleDetail.labels || []).map(x => x.pk)"
                    @update="$emit('updateKeyPleading',dataWrittenArticleDetail.pk,'labels', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataWrittenArticleDetail.attachments && dataWrittenArticleDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataWrittenArticleDetail.pk, dataWrittenArticleDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataWrittenArticleDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataWrittenArticleDetail.deposition"
                    :id="dataWrittenArticleDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataWrittenArticleDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataWrittenArticleDetail.deposition"
                    :keyPleadingId="dataWrittenArticleDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                  :valueBookmark="dataWrittenArticleDetail.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/written-articles/${dataWrittenArticleDetail.pk}`"
                  routerMutation="ht_store/matter/deposition/writtenarticl/updateDataMutations"
                  :pk="dataWrittenArticleDetail.pk"
                  :isShowFlag="false"
                  :detail="true"
                  routerMutationDetail="ht_store/matter/deposition/writtenarticl/updateDataDetail"
                />
                  <Action
                    :item="dataWrittenArticleDetail"
                    @remove="$emit('remove', dataWrittenArticleDetail, $event)"
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
import Comments from "../../../components/WrittenArticle/Comments";
import Notes from "../../../components/deposition/TdNotesWrittenArticle";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
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
    Label,
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
    ...mapGetters("ht_store/matter/deposition/writtenarticl", [
      "dataWrittenArticleDetail"
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
