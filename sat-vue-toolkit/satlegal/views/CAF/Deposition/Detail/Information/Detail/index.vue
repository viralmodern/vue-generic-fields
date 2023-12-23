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
          <span>Information Detail</span>
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
                <label class="mb-3">Received Item:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataInfomationDetail.received_item || ''"
                    class="mx-2"
                    placeholder="Received Item"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateInfo',dataInfomationDetail.pk,'received_item', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Received Date:</label>
                <v-row class="px-3">
                  <div>{{ dataInfomationDetail.date_received | formatShortDate }}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataInfomationDetail.date_received"
                    :textTooltip="
                    [dataInfomationDetail.date_received].some(x => !!x)
                      ? `${$options.filters.formatShortDate(
                          dataInfomationDetail.date_received
                        )}`
                      : 'Add date'
                  "
                    class="mx-2"
                    :colorButton="
                    `${[dataInfomationDetail.date_received].some(x => !!x) ? 'indigo' : ''}`
                  "
                    @updateTime="$emit('updateInfo',dataInfomationDetail.pk, 'date_received', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Item Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataInfomationDetail.desc || ''"
                    class="mx-2"
                    placeholder="Item Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateInfo',dataInfomationDetail.pk,'desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Label:</label>
                <v-row class="px-3">
                  <Label
                    :value="dataInfomationDetail.labels"
                    @update="$emit('updateInfo',dataInfomationDetail.pk, 'labels', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{dataInfomationDetail.attachments && dataInfomationDetail.attachments.length}}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment',dataInfomationDetail.pk, dataInfomationDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataInfomationDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataInfomationDetail.deposition"
                    :InfoId="dataInfomationDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataInfomationDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataInfomationDetail.deposition"
                    :InfoId="dataInfomationDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                    <BookmarkOrFlag
                    :valueBookmark="dataInfomationDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/info-and-docs-experts/${dataInfomationDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/information/updateDataInfo"
                    :pk="dataInfomationDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/information/updateDataDetail"
                  />
                  <Action
                    :item="dataInfomationDetail"
                    @remove="$emit('remove', dataInfomationDetail, $event)"
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
    ...mapGetters("ht_store/matter/deposition/information", [
      "dataInfomationDetail"
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
