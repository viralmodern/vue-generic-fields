<template>
  <div>
    <v-menu offset-x>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="openDialogConfirm(item)">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DeletePeopleGroup
      :dialogDelete="dialogDelete"
      @deleteCardGroup="deleteCardGroup"
      @closeDialogDelete="closeDialogDelete"
    />
  </div>
</template>
<script>
import DeletePeopleGroup from "../dialogs/DeletePeopleGroup";
export default {
  components: {
    DeletePeopleGroup
  },
  props: {
    item: Object
  },
  data() {
    return {
      dialogDelete: false,
      itemGroup: null
    };
  },
  methods: {
    closeDialogDelete() {
      this.dialogDelete = false;
    },
    openDialogConfirm(item) {
      this.dialogDelete = true;
      this.itemGroup = item;
    },
    deleteCardGroup() {
      this.$emit("deleteCardGroup", this.itemGroup);
      this.closeDialogDelete();
    }
  }
};
</script>
