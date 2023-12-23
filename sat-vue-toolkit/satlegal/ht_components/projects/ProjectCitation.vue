<template>
  <v-row no-gutters class="justify-center align-center">
    <v-col cols="12">
      <v-row no-gutters class="align-center">
        <v-icon class="pa-1">format_quote</v-icon>
        <span class="font-weight-bold">Citation</span>
        <v-btn icon @click="isShowAdd = true">
          <v-icon>mdi-add_circle_outline</v-icon>
        </v-btn>
        <CreateCitations
          @closeModel="isShowAdd = false"
          @submit="add"
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
          @submit="update"
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
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col>
          <CloseableChip
            class="text-caption"
            v-for="item in items"
            :key="item.id"
            :text="getText(item)"
            @openUpdate="openUpdate(item)"
            @deleteTag="$emit('remove', item.id)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import CreateCitations from "../dialogs/FormCitation";
import UpdateCitations from "../dialogs/FormCitation";
import CloseableChip from "../chips/CloseableChip";

export default {
  components: {
    CreateCitations,
    UpdateCitations,
    CloseableChip
  },
  props: {
    items: Array,
    isShowMessage: Boolean,
    message: String
  },
  data() {
    return {
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
    add(data) {
      this.$emit("add", {
        dataForm: data,
        closeModel: () => this.closeModel("isShowAdd")
      });
    },
    update(data) {
      this.$emit("update", {
        dataForm: {
          id: this.idEdit,
          ...data
        },
        closeModel: () => this.closeModel("isShowUpdate")
      });
    },
    closeModel(name) {
      this[name] = false;
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
    }
  }
};
</script>
