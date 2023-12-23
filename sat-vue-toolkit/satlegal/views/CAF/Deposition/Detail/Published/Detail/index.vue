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
          <span>Published Detail</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat :disabled="isLoadingGetDetail">
        <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="px-3">
              <v-col cols="6">
                <label class="mb-3">Publication Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPublishedDetail.name || ''"
                    class="mx-2"
                    placeholder="Publication Name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePublisheds',dataPublishedDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Author:</label>
                <v-row class="px-3">
                  <v-icon>mdi-account</v-icon>
                  <v-text-field
                    :value="dataPublishedDetail.author"
                    placeholder="Author"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePublisheds',dataPublishedDetail.pk,'author', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Publication Year:</label>
                <v-row class="px-3">
                  <YearSelect
                    width="50px"
                    :max="new Date().getFullYear()"
                    border-unset
                    hide-details
                    :value="dataPublishedDetail.publication_year"
                    @update="$emit('updatePublisheds',dataPublishedDetail.pk,'publication_year', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Bibilography:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPublishedDetail.bibliography || ''"
                    class="mx-2"
                    placeholder="Bibilography"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePublisheds',dataPublishedDetail.pk,'bibliography', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPublishedDetail.desc || ''"
                    class="mx-2"
                    placeholder="Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updatePublisheds',dataPublishedDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataPublishedDetail.attachments && dataPublishedDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataPublishedDetail.pk, dataPublishedDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <NotePublished
                    :totalNotes="dataPublishedDetail.note_count"
                    :pubId="dataPublishedDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataPublishedDetail.total_comments"
                    :rowId="dataPublishedDetail.pk"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="$route.params.depositionId"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="dataPublishedDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/literatures/${dataPublishedDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/published/updateData"
                    :pk="dataPublishedDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/published/updateDataPublishedDetail"
                  />
                  <Action
                    :item="dataPublishedDetail"
                    @remove="$emit('remove', dataPublishedDetail, $event)"
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
import NotePublished from "../../../components/NotePublished";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
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
    AddIcon,
    YearSelect,
    NotePublished,
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
    ...mapGetters("ht_store/matter/deposition/published", [
      "dataPublishedDetail"
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
