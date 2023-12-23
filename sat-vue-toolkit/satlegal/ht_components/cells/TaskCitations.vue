<template>
  <td>
    <v-row no-gutters class="justify-center align-center">
      <v-row no-gutters>
        <CloseableChip
          class="caption"
          v-for="item in dataRow.dataCitation"
          :key="item.id"
          :text="getText(item)"
          @openUpdate="openUpdate(item)"
          @deleteTag="removeCitation(item.id)"
        />
        <v-btn icon @click="isShowAdd = true">
          <v-icon>mdi-add_circle_outline</v-icon>
        </v-btn>
        <CreateCitations
          @closeModel="isShowAdd = false"
          @submit="addCitation"
          nameAction="add"
          :isShowMessage="isShowMessage"
          :message="message"
          :isShow="isShowAdd"
          :citationGenaral="{}"
          :inPrint="{}"
          :online="{}"
          :onlineDatabase="{}"
        />
        <UpdateCitations
          @closeModel="isShowUpdate = false"
          @submit="updateCitation"
          nameAction="update"
          :isShowMessage="isShowMessage"
          :message="message"
          :isShow="isShowUpdate"
          :citationGenaral="itemCitationGenaral"
          :inPrint="itemInPrintEdit"
          :online="itemOnlineEdit"
          :onlineDatabase="itemOnlineDatabaseEdit"
        />
      </v-row>
    </v-row>
  </td>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import CloseableChip from "../chips/CloseableChip";
import CreateCitations from "../dialogs/FormCitation";
import UpdateCitations from "../dialogs/FormCitation";

export default {
  components: {
    CloseableChip,
    CreateCitations,
    UpdateCitations
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowMessage: false,
      message: "",
      isShowAdd: false,
      isShowUpdate: false,
      idEdit: "",
      itemCitationGenaral: {},
      itemInPrintEdit: {},
      itemOnlineEdit: {},
      itemOnlineDatabaseEdit: {}
    };
  },
  methods: {
    ...mapMutations("ht_store/task/list", ["updateTask"]),
    ...mapActions("ht_store/task/list/citation", [
      "addDataCitationRequest",
      "updateDataCitationRequest",
      "deleteDataCitationRequest"
    ]),
    ...mapActions("ht_store/task/list", ["updateTask"]),
    async addCitation(citation) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "addCitation",
          ...citation
        }
      };
      const result = await this.addDataCitationRequest(data);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        this.closeModel("isShowAdd");
      }, 500);
      if (result.status) {
        this.updateTask(data);
      }
    },
    async updateCitation(citation) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "updateCitation",
          id: this.idEdit,
          ...citation
        }
      };
      const result = await this.updateDataCitationRequest(data.dataForm);
      this.isShowMessage = true;
      this.message = result.message;
      setTimeout(() => {
        this.isShowMessage = false;
        this.closeModel("isShowUpdate");
      }, 500);
      if (result.status) {
        this.updateTask(data);
      }
    },
    async removeCitation(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "removeCitation",
          id
        }
      };
      const result = await this.deleteDataCitationRequest(data.dataForm);
      if (result.status) {
        this.updateTask(data);
      }
    },
    openUpdate(item) {
      this.idEdit = item.id;
      this.itemCitationGenaral = {
        caseName: item.caseName,
        court: item.court,
        datePublished: item.datePublished,
        slipOpinion: item.slipOpinion,
        electronicDatabase: item.electronicDatabase,
        annotation: item.annotation
      };
      this.itemInPrintEdit = {
        advancedInfo: item.advancedInfo,
        publicationInfo: item.publicationInfo,
        pages: item.pages
      };
      this.itemOnlineEdit = {
        websiteTitle: item.websiteTitle,
        publisher: item.publisher,
        url: item.url,
        electronicallyPublished: item.electronicallyPublished,
        dateAccessedOnline: item.dateAccessedOnline
      };
      this.itemOnlineDatabaseEdit = {
        location: item.location,
        database: item.database,
        dateAccessedOnlineDatabase: item.dateAccessedOnlineDatabase,
        searchType: item.searchType,
        searchTextOrUrl: item.searchTextOrUrl
      };
      this.isShowUpdate = true;
    },
    getText({ caseName, court, datePublished }) {
      let text = `${caseName}, ${court}`;
      let text2 = datePublished
        ? `(${new Date(datePublished).getFullYear()})`
        : "";
      return `${text} ${text2}`;
    },
    closeModel(name) {
      this[name] = false;
    }
  }
};
</script>
