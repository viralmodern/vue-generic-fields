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
      width="60%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Request Set Expense Detail</span>
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
                <label class="mb-3">Task Name:</label>
                <v-row class="px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <v-text-field
                    :value="dataRequestSetTaskDetail.name"
                    placeholder="Task Name"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRequestSetTask('name', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3 py-3">Request Item:</label>
                <v-row class="py-3 px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <div
                    class="px-3"
                  >{{ dataRequestSetTaskDetail.request_set && dataRequestSetTaskDetail.request_set.name}}</div>
                  <v-icon slot="prepend" color="red">mdi-create</v-icon>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Notes:</label>
                <Notes
                  :totalNotes="dataRequestSetTaskDetail.total_notes"
                  :matterId="$route.params.matter || $route.params.projectId"
                  :requestSetId="dataRequestSetTaskDetail.request_set && dataRequestSetTaskDetail.request_set.pk"
                  :requestSetTaskId="dataRequestSetTaskDetail.pk"
                  :detail="true"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Request Item:</label>
                <ChipInlineList
                  textNoData="(No request set items)"
                  :value="dataRequestSetTaskDetail.request_items || []"
                  :lengthDisplay="2"
                  keyId="pk"
                  keyText="name"
                  colorChipDefault="gray"
                  colorTextChip="black--text"
                  @onClickIcon="
                  $emit('testEmit',{
                    ...$event,
                    name: 'request_items',
                    pk: dataRequestSetTaskDetail.pk,
                    value: dataRequestSetTaskDetail.request_items,
                    matterId:$route.params.matter || $route.params.projectId,
                    requestSetId: dataRequestSetTaskDetail.request_set.pk,
                    isCallApi: true,
                    detail: true
                  })
                "
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Deadline:</label>
                <v-row no-gutters class="td-date">
                  <div>{{dataRequestSetTaskDetail.deadline | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataRequestSetTaskDetail.deadline"
                    :textTooltip="
                  [dataRequestSetTaskDetail.deadline].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataRequestSetTaskDetail.deadline)}`
                    : 'Add date'
                "
                    :colorButton="`${[dataRequestSetTaskDetail.date].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="updateRequestSetTask('deadline', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <div style="width:350px">
                    <RichTextArea
                      :value="dataRequestSetTaskDetail.desc"
                      @update="updateRequestSetTask('desc', $event)"
                    />
                  </div>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Litigation code:</label>
                <v-row class="px-3">
                  <v-select
                    :items="appConfigs.litigationCode"
                    :value="dataRequestSetTaskDetail.litigation"
                    item-text="name"
                    item-value="code"
                    @change="updateRequestSetTask('litigation', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-select>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Activities code:</label>
                <v-row class="px-3">
                  <v-select
                    :items="appConfigs.activitiesCode"
                    :value="dataRequestSetTaskDetail.activities"
                    item-text="name"
                    item-value="code"
                    @change="updateRequestSetTask('activities', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-select>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Current Expense:</label>
                <div>{{dataRequestSetTaskDetail.total_expense || '(No data)'}}</div>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Time log:</label>
                <TimePicker
                  :value="dataRequestSetTaskDetail.time"
                  @update="updateRequestSetTask('time', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Status:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="dataRequestSetTaskDetail.status"
                    keyValue="value"
                    :dataList="appConfigs.taskStatus"
                    @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Status',
                    name: 'status',
                    pk: dataRequestSetTaskDetail.pk,
                    keyValue: 'value',
                    value: dataRequestSetTaskDetail.status,
                    dataList: appConfigs.taskStatus
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachments:</label>
                <div>
                  {{ dataRequestSetTaskDetail.attachments && dataRequestSetTaskDetail.attachments.length }}
                  <AddIcon @onClickIcon="onShowPopupAttachment" icon="mdi-attachment" />
                </div>
              </v-col>
              <v-col>
                <label class="mb-3">Attachments:</label>
                <div>
                  <Comments
                    :totalComments="dataRequestSetTaskDetail.total_comments"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :requestSetId="dataRequestSetTaskDetail.request_set && dataRequestSetTaskDetail.request_set.pk"
                    :requestSetTaskId="dataRequestSetTaskDetail.pk"
                    :detail="true"
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <MenuSelectCheckBox
      :title="menuSelectBox.title"
      :keyValue="menuSelectBox.keyValue"
      :keyText="menuSelectBox.keyText"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="menuSelectBox.dataList"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event[menuSelectBox.keyValue];
        menuSelectBox.isShowMenu = false;
        updateRequestSetTask(
          requestSetId,
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
      "
    />
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestSetId="this.requestSetId"
      :requestSetTaskId="this.requestSetTaskId"
      @closePopup="isShowPopupAttachment = false"
      :detail="true"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import TimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/TimePicker";
import Attachments from "../Attachments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Comments from "../Comments";
import Notes from "../Notes";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";

export default {
  mixins: [appConfigMixin, toggleMenuSelectBox],
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    requestSetId: Number
  },
  components: {
    ChipInlineList,
    DatePicker,
    RichTextArea,
    TimePicker,
    ChipJoinMenuSelectBox,
    MenuSelectCheckBox,
    Attachments,
    AddIcon,
    Comments,
    Notes
  },
  data() {
    return {
      valid: false,
      showRequestSetTaskDetail: false,
      requestSetTaskId: 0,
      isShowPopupAttachment: false
    };
  },
  methods: {
    onShowPopupAttachment() {
      this.requestSetTaskId = this.dataRequestSetTaskDetail.pk;
      this.getDataAttachments(this.dataRequestSetTaskDetail.attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapMutations("ht_store/matter/requestStatus/requestSetTask", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/requestStatus/requestSetTask", [
      "removeRequestItemInTaskRequest",
      "updateRequestSetTaskRequest"
    ]),
    updateRequestSetTask(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: this.dataRequestSetTaskDetail.request_set.pk,
          requestSetTaskId: this.dataRequestSetTaskDetail.pk
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateRequestSetTaskRequest(data);
    },

    removeRequestItemInTask(requestItemId) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.dataRequestSetTaskDetail.request_set.pk,
        requestSetTaskId: this.dataRequestSetTaskDetail.pk,
        requestItemId,
        detail: true
      };
      this.removeRequestItemInTaskRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSetTask", [
      "dataRequestSetTaskDetail",
      "dataAttachments"
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
          this.showRequestSetTaskDetail = val;
        }
      }
    },
    showRequestSetTaskDetail: {
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
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
.custom-chip /deep/ .v-chip {
  max-width: 80px;
}
.text-custom {
  color: rgba(0, 0, 0, 0.6);
}
</style>
