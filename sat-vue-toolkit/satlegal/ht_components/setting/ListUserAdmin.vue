<template>
  <v-row>
    <v-col>
      <v-row justify="end" class="mr-2">
        <v-btn @click="isShowCreate = true" small color="primary"
          >Invite user</v-btn
        >
      </v-row>
      <v-col>
        <FormUser
          :roles="roles"
          @createUserAdmin="createUserAdmin"
          :isShow="isShowCreate"
          @closeModal="isShowCreate = false"
        />
      </v-col>
      <v-col>
        <AdminList
          :dataUsers="users"
          @editUser="editUser"
          @deleteUser="deleteUser"
          :loading="loading"
          @getData="getData"
        />
      </v-col>
      <v-col>
        <FormUser
          :roles="roles"
          @editUserAdmin="editUserAdmin"
          :item="item"
          :isShow="isShowEdit"
          @closeModal="
            item = {};
            isShowEdit = false;
          "
        />
      </v-col>
      <v-snackbar
        v-model="snackbarCreate"
        :timeout="3000"
        :right="true"
        :bottom="true"
        >Create success</v-snackbar
      >
      <v-snackbar
        v-model="snackbarEdit"
        :timeout="3000"
        :right="true"
        :bottom="true"
        >Edit success</v-snackbar
      >
    </v-col>
  </v-row>
</template>
<script>
import AdminList from "../admin-setting/List";
import FormUser from "../admin-setting/Form";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      isShowEdit: false,
      isShowCreate: false,
      item: {},
      snackbarCreate: false,
      snackbarEdit: false
    };
  },
  components: {
    AdminList,
    FormUser
  },
  methods: {
    ...mapActions("ht_store/adminSetting", [
      "getListusersRequest",
      "getListRoleRequest"
    ]),
    ...mapMutations("ht_store/adminSetting", [
      "deleteUser",
      "editItemAdmin",
      "addItemAdmin"
    ]),
    getData(pagination) {
      this.getListusersRequest(pagination);
    },
    editUser(item) {
      this.isShowEdit = true;
      this.item = item;
    },
    deleteUser(item) {
      this.deleteUser(item);
    },
    editUserAdmin(data) {
      this.editItemAdmin(data);
      this.snackbarEdit = true;
    },
    createUserAdmin(data) {
      this.addItemAdmin(data);
      this.snackbarCreate = true;
    }
  },
  computed: {
    ...mapGetters("ht_store/adminSetting", ["users", "loading", "roles"])
  },
  mounted() {
    this.getListusersRequest();
    this.getListRoleRequest();
  }
};
</script>
