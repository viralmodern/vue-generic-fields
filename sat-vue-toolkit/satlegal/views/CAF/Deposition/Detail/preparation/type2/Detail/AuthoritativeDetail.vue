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
                <label class="mb-3">Authoritative Treaties:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataAuthoritativeDetail.treatise || ''"
                    class="mx-2"
                    placeholder="Authoritative Treaties"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateAuthoritative',dataAuthoritativeDetail.pk,'treatise', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Treatise Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataAuthoritativeDetail.desc || ''"
                    class="mx-2"
                    placeholder="Treatise Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateAuthoritative',dataAuthoritativeDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataAuthoritativeDetail.attachments && dataAuthoritativeDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataAuthoritativeDetail.pk, dataAuthoritativeDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataAuthoritativeDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataAuthoritativeDetail.deposition"
                    :id="dataAuthoritativeDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataAuthoritativeDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataAuthoritativeDetail.deposition"
                    :id="dataAuthoritativeDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                   <BookmarkOrFlag
                    :valueBookmark="dataAuthoritativeDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/authoritatives/${dataAuthoritativeDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/authoritative/updateDataMutations"
                    :pk="dataAuthoritativeDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/authoritative/updateDataDetail"
                  />
                  <Action
                    :item="dataAuthoritativeDetail"
                    @remove="$emit('remove', dataAuthoritativeDetail, $event)"
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
import Comments from "../../../../components/Authoritative/Comments";
import Notes from "../../../../components/deposition/TdNotesAuthoritative";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
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
    AddIcon,
    BookmarkOrFlag,
    Comments,
    Notes
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
    ...mapGetters("ht_store/matter/deposition/authoritative", [
      "dataAuthoritativeDetail"
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
