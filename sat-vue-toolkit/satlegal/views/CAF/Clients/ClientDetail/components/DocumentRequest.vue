<template>
  <v-container fluid class="pa-0">
    <TableGrid
      hide-default-header
      hide-default-footer
      :headers="headers.filter(h => h.active)"
      :desserts="dataDocument"
      :loading="isLoadingGetDocument"
    >
      <template v-slot:item.name="{ props: { item } }">
        <TextArea :value="item.name" @update="updateDocument(item.pk, 'name', $event)" />
      </template>
      <template v-slot:item.desc="{ props: { item } }">
        <TextArea :value="item.desc" @update="updateDocument(item.pk, 'desc', $event)" />
      </template>
      <template v-slot:item.assignees="{ props: { item } }">
        <MembersWorkspace
          :value="item.assignees"
          :isLoadingGet="false"
          :isEmitOpenMenu="true"
          @update="updateDocument(item.pk, 'assignees', $event)"
        />
      </template>
      <template v-slot:item.status="{ props: { item } }">
        <SelectCheckBox
          title="Approval Status"
          keyText="label"
          keyValue="value"
          :value="item.status"
          :dataList="appConfigChoices[appConfigConstants.CLIENTS_DOCUMENT_STATUS]"
          @update="updateDocument(item.pk, 'status', $event.value)"
        />
      </template>
      <template v-slot:item.deadline="{ props: { item } }">
        <ChooseDatePicker
          :isValidate="true"
          :date="item.deadline"
          :isFormatChooseISOString="false"
          @update="updateDocument(item.pk, 'deadline', $event)"
        />
      </template>
      <template v-slot:item.total_comments="{ props: { item } }">
        <Comments :totalComments="item.total_comments" :clientId="clientId" :id="item.pk" />
      </template>
      <template v-slot:item.attachments="{ props: { item } }">
        {{item.attachments.length}}
        <AddIcon
          @onClickIcon="onShowPopupAttachment(item.pk, item.attachments)"
          icon="mdi-attachment"
        />
      </template>
      <template v-slot:item.action="{ props: { item } }">
        <div class="d-flex align-center">
          <Action :item="item" @remove="removeDocument(item.pk, $event)" />
        </div>
      </template>
    </TableGrid>
    <div class="d-flex align-center">
      <v-col cols="10" class="pa-0">
        <CreatedDocument :clientId="clientId" />
      </v-col>
      <v-col cols="2 text-right">
        <ButtonLoadMore
          v-if="totals > 20 && totals > dataDocument.length"
          ref="refLoadMore"
          :loading="isLoadingGetDocument"
          @onPageChanged="paginationDocument"
        />
      </v-col>
    </div>
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="this.requestForProductionId"
      @closePopup="isShowPopupAttachment = false;"
      :clientId="clientId"
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import CreatedDocument from "./CreatedDocument";
// Cell
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Attachments from "./AttachmentsDocumentRequest";
import Comments from "./CommentsDocumentRequest";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ChooseDatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDatePicker";

import { $$STORE_PREFIX } from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    TableGrid,
    ButtonLoadMore,
    CreatedDocument,
    TextArea,
    Action,
    MembersWorkspace,
    SelectCheckBox,
    Attachments,
    Comments,
    AddIcon,
    ChooseDatePicker
  },
  props: {
    clientId: String
  },
  data() {
    return {
      isLoadingComment: false,
      isLoadingSendComment: false,
      isLoadingUpdate: false,
      headers: [
        { text: "Name", value: "name", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Due Date", value: "deadline", active: true },
        { text: "Approval Status ", value: "status", active: true },
        { text: "Approval Date", value: "creater", active: true },
        { text: "Assignees Members", value: "assignees", active: true },
        { text: "Comment", value: "total_comments", active: true },
        { text: "Attachments", value: "attachments", active: true },
        { text: "Action", value: "action", active: true }
      ],
      isShowPopupAttachment: false,
      requestForProductionId: 0
    };
  },
  computed: {
    ...mapGetters("ht_store/clients/documentRequest", [
      "dataDocument",
      "isLoadingGetDocument",
      "totals",
      "totalsPageComment",
      "isShowPaginationComment",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/clients/clientsCommon", ["members"])
  },
  methods: {
    ...mapActions("ht_store/clients/documentRequest", [
      "updateDocumentRequest",
      "removeDocumentRequest",
      "getDocumentRequest",
    ]),
    ...mapMutations("ht_store/clients/documentRequest", ["getDataAttachments"]),
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    async paginationDocument({ page, setLoading }) {
      setLoading(true);
      const payload = {
        pk: this.clientId,
        searchObject: {
          page
        }
      };
      await this.getDocumentRequest(payload);
      setLoading(false);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateDocument(pk, name, value) {
      const data = {
        idParams: {
          pk,
          clientId: this.clientId
        },
        body: {
          [name]: value
        }
      };
      this.updateDocumentRequest(data);
    },
    async removeDocument(pk, close) {
      const data = {
        clientId: this.clientId,
        pk
      };
      try {
        await this.removeDocumentRequest(data);
        close();
      } catch (error) {
        close();
      }
    }
  }
};
</script>
