<template>
  <div class="pa-2">
    <v-row no-gutters class="list-timeline pa-2">
      <HeaderLogDetail :item="logDetail" @updateLogDetail="updateLogDetail" />
    </v-row>
    <div class="py-2">
      <TableLogListType
        :item="getListByType"
        :type="parseInt(this.$route.params.logId)"
        @changeData="changeData"
        @deleteLogType="deleteLogType"
        @addNewItem="addNewItem"
      />
    </div>
    <CreatePrivlege
      :isShow="isShowCreatePrivlege"
      @closeModal="isShowCreatePrivlege = false"
      @addLogType="addLogType"
    />
    <CreateLogChain
      :isShow="isShowCreateChain"
      @closeModal="isShowCreateChain = false"
      @addLogType="addLogType"
    />
    <CreateCommunication
      :isShow="isShowCommunication"
      @closeModal="isShowCommunication = false"
      @addLogType="addLogType"
    />
    <CreateExhibit
      :isShow="isShowExhibit"
      @closeModal="isShowExhibit = false"
      @addLogType="addLogType"
    />
  </div>
</template>
<script>
import HeaderLogDetail from "../../ht_components/cards/HeaderLogDetail";
import TableLogListType from "../../ht_components/tables/TableLogListType";
import CreatePrivlege from "../../ht_components/dialogs/CreatePrivlege";
import CreateLogChain from "../../ht_components/dialogs/CreateLogChain";
import CreateCommunication from "../../ht_components/dialogs/CreateCommunication";
import CreateExhibit from "../../ht_components/dialogs/CreateExhibit";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isShowCreatePrivlege: false,
      isShowCreateChain: false,
      isShowCommunication: false,
      isShowExhibit: false
    };
  },
  components: {
    HeaderLogDetail,
    TableLogListType,
    CreatePrivlege,
    CreateLogChain,
    CreateCommunication,
    CreateExhibit
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/log/detail", [
      "getDataLogDetailRequest",
      "changeDataInfomationLogRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/discovery/log/detail/type", [
      "getDataLogDetailListTypeRequest",
      "changeDataTypeRequest",
      "deleteLogTypeRequest",
      "addLogTypeRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/log/tag", ["getDataLogTagRequest"]),
    ...mapActions("ht_store/matter/discovery/log/attachment", [
      "getDataAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    updateLogDetail(data) {
      this.changeDataInfomationLogRequest(data);
    },
    changeData(data) {
      const newData = { ...data, type: this.$route.params.logId };
      this.changeDataTypeRequest(newData);
    },
    deleteLogType(id) {
      const newData = { id: id, type: this.$route.params.logId };
      this.deleteLogTypeRequest(newData);
    },
    addNewItem() {
      const logType = this.$route.params.logId;
      if (logType == 1) {
        this.isShowCreatePrivlege = true;
      }
      if (logType == 2) {
        this.isShowCreateChain = true;
      }
      if (logType == 3) {
        this.isShowCommunication = true;
      }
      if (logType == 4) {
        this.isShowExhibit = true;
      }
    },
    addLogType(value) {
      let data = {
        typeId: this.$route.params.logId,
        value: value
      };
      this.addLogTypeRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/detail", ["logDetail"]),
    ...mapGetters("ht_store/matter/discovery/log/detail/type", ["listType"]),
    getListByType() {
      const logType = this.$route.params.logId;
      if (logType == 1) {
        return this.listType.privilegeLog;
      }
      if (logType == 2) {
        return this.listType.chainOfCustody;
      }
      if (logType == 3) {
        return this.listType.communicationLog;
      }
      if (logType == 4) {
        return this.listType.exhibitLog;
      }
      return "";
    }
  },
  mounted() {
    this.getDataLogDetailRequest(1);
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getDataLogDetailListTypeRequest();
    this.getDataLogTagRequest();
    this.getDataCharacterRequest();
    this.getDataAttachmentRequest();
  }
};
</script>
