<template>
  <div>
    <v-row no-gutters class="justify-center align-center">
      <v-col cols="12" sm="3">
        <v-row no-gutters>
          <v-col cols="12" class="mx-1">
            <span class="subheading font-weight-bold">
              {{
              joinClient.name
              }}
            </span>
          </v-col>
          <v-col cols="12" class="mt-2 my-2">
            <v-icon size="15" class="mx-1">mdi-alarm</v-icon>
            <span class="text--secondary">Last activity {{ timespan }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <ProgressMultiColor :list="item.progressList" keyProgress="progress" keyColor="color" />
      </v-col>
      <v-col cols="12" sm="2" class="text-sm-right my-2">
        <span class="text--secondary">{{ item.items.length }} REQUESTS</span>
      </v-col>
    </v-row>
    <div class="mt-2">
      <TableItem
        :item="item"
        @deleteItemDocument="deleteItemDocument"
        @changeDocument="changeDocument"
        @addDocumentItem="addDocumentItem"
        @showDetailDocument="showDetailDocument"
        @moveItemDocument="moveItemDocument"
      />
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="deleteConfirm"
        @cancel="isShowPopup = false"
        messageConfirm="Are you sure you want to delete this request?"
      />
    </div>
  </div>
</template>
<script>
import ProgressMultiColor from "../progress-bars/ProgressMultiColor";
import ConfirmItem from "../dialogs/ConfirmItem";
import TableItem from "../document/TableItemReview";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      isShowPopup: false,
      document: {}
    };
  },
  components: {
    ProgressMultiColor,
    ConfirmItem,
    TableItem
  },
  methods: {
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    deleteConfirm() {
      this.$emit("deleteDocument", this.document);
      this.isShowPopup = false;
    },
    deleteItemDocument(data) {
      this.document = data;
      this.isShowPopup = true;
    },
    changeDocument(data) {
      this.$emit("changeDocument", data);
    },
    addDocumentItem() {
      this.$emit("addDocumentItem", this.item);
    },
    showDetailDocument(e) {
      this.$emit("showDetailDocument", e);
    },
    moveItemDocument(data) {
      this.$emit("moveItemDocument", data);
    }
  },
  computed: {
    timespan() {
      if (!this.item) return "";
      return moment(this.item.lastActivity).fromNow();
    },
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    joinClient() {
      return (
        (this.dataClient || []).find(x => x.id === this.item.clientName) || {}
      );
    }
  },
  mounted() {
    this.getDataClientRequest();
  }
};
</script>
