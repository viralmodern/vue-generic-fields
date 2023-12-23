<template>
  <div style="height:100%;background: white;">
    <v-app-bar :class="isFixed ? 'fixed' : ''">
      <v-spacer></v-spacer>
      <v-btn @click="isShowDelete = true" v-if="listIdInbox.length > 0" icon>
        <v-icon>mdi-delete_sweep</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-keyboard_arrow_right</v-icon>
      </v-btn>
    </v-app-bar>
    <ListInbox
      :list="dataInbox"
      @check="check"
      @update="updateDataInboxRequest"
      style="margin-bottom:30px"
    />
    <v-btn fab dark color="primary add" @click="isShowAdd = true">
      <v-icon dark>mdi-add</v-icon>
    </v-btn>
    <FormAddNewInbox
      header="Create new inbox"
      :isShow="isShowAdd"
      @close="isShowAdd = false"
      @submit="add"
    />
    <ConfirmItem
      :isShowPopup="isShowDelete"
      @remove="deleteAllInbox"
      @cancel="isShowDelete = false"
      messageConfirm="Are you sure want to delete item?"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ListInbox from "../../ht_components/portal-inbox/ListInbox";
import FormAddNewInbox from "../../ht_components/dialogs/FormAddNewInbox";
import ConfirmItem from "../../ht_components/dialogs/ConfirmItem";

export default {
  components: {
    ListInbox,
    FormAddNewInbox,
    ConfirmItem
  },
  data() {
    return {
      isShowAdd: false,
      isShowDelete: false,
      isFixed: false,
      listIdInbox: []
    };
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/inbox", ["dataInbox"])
  },
  methods: {
    add(data) {
      this.addDataInboxRequest(data);
      this.isShowAdd = false;
    },
    check(id) {
      if (this.listIdInbox.includes(id)) {
        this.listIdInbox = this.listIdInbox.filter(x => x !== id);
      } else {
        this.listIdInbox = [...this.listIdInbox, id];
      }
    },
    deleteAllInbox() {
      this.deleteDataInboxRequest(this.listIdInbox);
      this.listIdInbox = [];
      this.isShowDelete = false;
    },
    handleScroll() {
      if (window.scrollY >= 328) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    ...mapActions("ht_store/clientPortal/inbox", [
      "addDataInboxRequest",
      "updateDataInboxRequest",
      "deleteDataInboxRequest"
    ])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
.fixed {
  position: fixed;
  top: 64px;
  z-index: 1000;
}
</style>
