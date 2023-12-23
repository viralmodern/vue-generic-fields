<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataRequestDetail.name || ''"
              label="Name"
              placeholder="Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateRequestDetail('name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-numeric</v-icon>
            <v-text-field
              :value="dataRequestDetail.pk || ''"
              label="Request Number"
              placeholder="Request Number"
              :readonly="true"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <p>Assigned Members:</p>
          <Members
            textTooltip="Assigned Members"
            :value="dataRequestDetail.members"
            @update="updateRequestDetail('members', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigs.listPriority"
            label="Request Priority"
            item-text="name"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataRequestDetail.priority"
            @change="updateRequestDetail('priority', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigs.responseStatus"
            label="Response Status"
            item-text="name"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataRequestDetail.response_status"
            @change="updateRequestDetail('response_status', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigs.requestStatus"
            label="Request Status"
            item-text="name"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="dataRequestDetail.request_status"
            @change="updateRequestDetail('request_status', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-textarea
              :value="dataRequestDetail.req_desc || ''"
              class="mx-2"
              label="Request Item Description"
              placeholder="Request Item Description"
              rows="10"
              prepend-icon="mdi-comment"
              :rules="[v => !!v || 'This field is required']"
              @change="updateRequestDetail('req_desc', $event)"
            ></v-textarea>
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Under Oath?:</label>
          <Disputed
            :value="dataRequestDetail.enable_portal"
            @update="updateRequestDetail('enable_portal', $event)"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Deadline:</label>
          <v-row no-gutters class="td-date">
            <div>{{dataRequestDetail.deadline | formatShortDate}}</div>
            <DatePicker
              title="Date"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataRequestDetail.deadline"
              :textTooltip="
                  [dataRequestDetail.deadline].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataRequestDetail.deadline)}`
                    : 'Add date'
                "
              :colorButton="`${[dataRequestDetail.date].some(x => !!x) ? 'indigo' : ''}`"
              class="mx-2"
              @updateTime="updateRequestDetail('deadline', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Privilege Invoke?:</label>
          <Disputed
            :value="dataRequestDetail.privilege_invoke"
            @update="updateRequestDetail('privilege_invoke', $event)"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Attachments:</label>
          <div>
            {{(dataRequestDetail.attachments || []).length}}
            <AddIcon
              @onClickIcon="onShowPopupAttachment(dataRequestDetail.pk, dataRequestDetail.attachments)"
              icon="mdi-attachment"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Note:</label>
          <Notes
            :totalNotes="dataRequestDetail.total_notes"
            :rSId="dataRequestDetail.request_set"
            :rowId="dataRequestDetail.pk"
            :detail="true"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Countdown:</label>
          <div>
            <Countdown :expired="dataRequestDetail.deadline" />
          </div>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-textarea
              :value="dataRequestDetail.res_desc || ''"
              class="mx-2"
              label="Response Item Description"
              placeholder="Response Item Description"
              rows="10"
              prepend-icon="mdi-comment"
              :rules="[v => !!v || 'This field is required']"
              @change="updateRequestDetail('res_desc', $event)"
            ></v-textarea>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <div class="d-flex">
              <BookmarkOrFlag
                :valueBookmark="dataRequestDetail.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/request-sets/${$route.params.requestSetId}/items/${dataRequestDetail.pk}`"
                routerMutation="ht_store/matter/requestStatus/requestItem/patchRequestApi"
                :pk="dataRequestDetail.pk"
                :valueFlag="dataRequestDetail.reported_object && dataRequestDetail.reported_object.pk"
                :detail="true"
                routerMutationDetail="ht_store/matter/requestStatus/requestItem/updateDetail"
              />
              <Action
                :item="dataRequestDetail"
                @remove="$emit('remove', {item:dataRequestDetail, close:$event})"
              />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="this.requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
      :detail="true"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/inputs/SelectChip";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Attachments from "../../../TdAttachmentRequestItem";
import Countdown from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/CountDown";
import Notes from "../../../TdNotesRequestItem";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  components: {
    Members,
    SelectChip,
    Disputed,
    DatePicker,
    AddIcon,
    Attachments,
    Countdown,
    Notes,
    Action,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      requestForProductionId: 0,
      isShowPopupAttachment: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestItem", [
      "dataRequestDetail",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapMutations("ht_store/matter/requestStatus/requestItem", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "patchRequestApi"
    ]),
    updateRequestDetail(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rSId: this.$route.params.requestSetId,
          rowId: this.dataRequestDetail.pk
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.patchRequestApi(data);
    }
  }
};
</script>

<style scoped>
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
</style>
