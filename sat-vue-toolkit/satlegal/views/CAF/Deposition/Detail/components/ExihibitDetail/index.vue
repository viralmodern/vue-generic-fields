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
          <span>Deposition Exihibit Detail</span>
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
                <label class="mb-3">Order:</label>
                <v-row class="px-3">{{dataExhibitDetail.order}}</v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Exhibit Name:</label>
                <v-row class="px-3">
                  <v-text-field
                    :value="dataExhibitDetail.name"
                    placeholder="Name"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateExhibit('name', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Date:</label>
                <v-row class="px-3">
                  <div>{{dataExhibitDetail.date | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataExhibitDetail.date"
                    :textTooltip="
                  [dataExhibitDetail.date].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataExhibitDetail.date)}`
                    : 'Add date'
                "
                    :colorButton="`${[dataExhibitDetail.date].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="updateExhibit('date', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Exhibit Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataExhibitDetail.desc || ''"
                    class="mx-2"
                    placeholder="Exhibit Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateExhibit('desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Exhibit Document:</label>
                <v-row class="px-3">
                  <AttachmentLink
                    :value="dataExhibitDetail.attachment"
                    @updateAsync="updateExhibitsAsync('attachment', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Legal Issue:</label>
                <v-row class="px-3">
                  <Issue
                    :value="dataExhibitDetail.legal_issues"
                    :isEmitOpenMenu="true"
                    @update="updateExhibit('legal_issues', $event)"
                    @onOpenMenu="$emit('getDataIssues')"
                    :isLoadingGet="isLoadingGetIssue"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="(dataExhibitDetail.total_comments || 0)"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="$$$depositionId"
                    :keyPleadingId="dataExhibitDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3">
                  <div class="d-flex">
                    <BookmarkOrFlag
                      :valueBookmark="dataExhibitDetail.bookmarked_pk"
                      :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/exhibits/${dataExhibitDetail.pk}`"
                      routerMutation="ht_store/matter/deposition/exhibitSlickgrid/updateDataKeyExhibit"
                      :pk="dataExhibitDetail.pk"
                      :detail="true"
                      routerMutationDetail="ht_store/matter/deposition/exhibitSlickgrid/updateDataExhibitDetail"
                      :isShowFlag="false"
                    />
                    <Action
                      :dataExhibitDetail="dataExhibitDetail"
                      @remove="$emit('removeKeyExhibit', dataExhibitDetail, $event)"
                    />
                    <v-btn
                      class="ma-0"
                      icon
                      small
                      :href="dataExhibitDetail.attachment"
                      target="_blank"
                      download
                      :disabled="!dataExhibitDetail.attachment"
                    >
                      <v-icon small color="primary">mdi-download</v-icon>
                    </v-btn>
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
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import Comments from "../../../components/Exhibit/Comments";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    keyExhibitId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    AttachmentLink,
    Comments,
    Issue,
    DatePicker,
    Action,
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
    ...mapActions("ht_store/matter/deposition/exhibitSlickgrid", [
      "updateKeyExhibitRequest",
      "updateExhibitsAsyncRequest",
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),

    updateExhibit(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          keyExhibitId: this.keyExhibitId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateKeyExhibitRequest(data);
    },
    async updateExhibitsAsync(name, { value, setLoading }) {
      try {
        const data = {
          name: name,
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
            keyExhibitId: this.keyExhibitId
          },
          body: {
            [name]: value
          },
          detail: true
        };
        setLoading(true);
        await this.updateExhibitsAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/exhibitSlickgrid", [
      "dataExhibitDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    $$$matterID() {
      try {
        return this.$route.params.matter || this.$route.params.projectId
      } catch (e) {
        console.log('$$$matterID', e.message) // eslint-disable-line
        return null
      }
    },
    $$$depositionId() {
      try {
        return this.$route.params.depositionId
      } catch (e) {
        console.log('$$$depositionId', e.message) // eslint-disable-line
        return null
      }
    },
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
