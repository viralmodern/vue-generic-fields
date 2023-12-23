<template>
  <div>
    <v-row no-gutters class="justify-end">
      <v-btn fab dark color="primary addWorkFlow" @click="isShowModelCreate = true">
        <v-icon dark>mdi-add</v-icon>
      </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="ma-2" v-for="(item, index) in dataDocumentAll" :key="index">
        <v-card class="pa-2">
          <DocumentItem
            :item="item"
            @deleteDocument="deleteDocument"
            @changeDocument="changeDocument"
            @addDocumentItem="addDocumentItem"
            @showDetailDocument="showDetailDocument"
            @moveItemDocument="moveItemDocument"
          />
        </v-card>
      </v-col>
    </v-row>
    <FormDocumentRequestAll
      :isShowPopup="isShowModelCreate"
      @closeModal="isShowModelCreate = false"
      @addDocumentRequest="addDocumentRequest"
    />
    <FormDocumentRequestAll
      :isShowPopup="isShowModelCreateByItem"
      @closeModal="isShowModelCreateByItem = false"
      @addDocumentRequest="addDocumentRequest"
      :categoryClient="categoryClient"
    />
    <DetailDocumentRequest
      :id="itemDocumentDetail"
      :isShowPopup="isShowModelDetail"
      @closeModal="isShowModelDetail = false"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DocumentItem from "../../ht_components/cards/DocumentItem";
import FormDocumentRequestAll from "../../ht_components/dialogs/FormDocumentRequestAll";
import DetailDocumentRequest from "../../ht_components/dialogs/DetailDocumentRequest";
export default {
  data() {
    return {
      isShowModelCreate: false,
      isShowModelEdit: false,
      isShowModelCreateByItem: false,
      isShowModelDetail: false,
      itemEdit: {},
      categoryClient: null,
      itemDocumentDetail: null
    };
  },
  components: {
    DocumentItem,
    FormDocumentRequestAll,
    DetailDocumentRequest
  },
  methods: {
    ...mapActions("ht_store/document/all", ["getDocumentAllRequest"]),
    ...mapMutations("ht_store/document/all", [
      "deleteDocumentAllItem",
      "addDocumentRequestAll",
      "changeDataDocumentAll",
      "dropDrawItemDocument"
    ]),
    deleteDocument(data) {
      this.deleteDocumentAllItem(data);
    },
    addDocumentRequest(data) {
      this.addDocumentRequestAll(data);
      this.isShowModelCreate = false;
      this.isShowModelCreateByItem = false;
    },
    changeDocument(data) {
      this.changeDataDocumentAll(data);
    },
    addDocumentItem(item) {
      this.isShowModelCreateByItem = true;
      this.categoryClient = item.clientName;
    },
    showDetailDocument(id) {
      this.itemDocumentDetail = id;
      this.isShowModelDetail = true;
    },
    moveItemDocument(data) {
      this.dropDrawItemDocument(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/document/all", ["dataDocumentAll"])
  },
  mounted() {
    this.getDocumentAllRequest(1);
  }
};
</script>
<style scoped>
.addWorkFlow {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
