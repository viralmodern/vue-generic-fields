<template>
  <v-row no-gutters>
    <v-menu transition="slide-x-transition" bottom right offset-x>
      <template v-slot:activator="{ on }">
        <v-btn icon small v-on="on" @click.prevent>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="showPopupManagePeople">
          <v-list-item-title>Manage people</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showPopupDelete">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showPopupCreateCopy">
          <v-list-item-title>Create copy</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <CreateCopy :isShowPopup="dialogCreateCopy" @cancel="closePopup" />
    <DeleteConfirm
      :isShowPopup="dialogDelete"
      @cancel="closePopup"
      @deleteBoard="$emit('deleteBoard')"
    />
    <ManagePeople :isShowPopup="dialogManagePeople" @cancel="closePopup" />
  </v-row>
</template>
<script>
import CreateCopy from "../dialogs/CreateCopy";
import DeleteConfirm from "../dialogs/DeleteConfirm";
import ManagePeople from "../dialogs/ManagePeople";

export default {
  components: {
    CreateCopy,
    DeleteConfirm,
    ManagePeople
  },
  data() {
    return {
      items: [
        { title: "Manage people" },
        { title: "Delete" },
        { title: "Create copy" }
      ],
      dialogManagePeople: false,
      dialogDelete: false,
      dialogCreateCopy: false
    };
  },
  methods: {
    showPopupManagePeople() {
      this.dialogManagePeople = true;
    },
    showPopupDelete() {
      this.dialogDelete = true;
    },
    showPopupCreateCopy() {
      this.dialogCreateCopy = true;
    },
    closePopup() {
      this.dialogManagePeople = false;
      this.dialogDelete = false;
      this.dialogCreateCopy = false;
    }
  }
};
</script>
