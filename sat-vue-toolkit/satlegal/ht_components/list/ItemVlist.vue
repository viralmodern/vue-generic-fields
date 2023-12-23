<template>
  <v-list-item-title class="action custom-leftmenu-notebook" wrap>
    <v-row no-gutters v-if="!isEditing" align-center class="row-vlist">
      <v-col cols="10">
        <router-link
          v-if="to"
          :to="to"
          active-class="active"
          style="text-decoration: none; color: rgba(0,0,0,0.54);white-space: normal;"
          >{{ name }}</router-link
        >
        <h4 v-else class="text-uppercase" style="white-space: normal;">
          {{ name }}
        </h4>
      </v-col>
      <v-spacer></v-spacer>
      <div class="btn-rename-delete">
        <v-btn @click.prevent.stop="openEdit" small icon class="ma-0 pa-0">
          <v-icon small class="ma-0 text--secondary">mdi-create</v-icon>
        </v-btn>
        <v-btn
          @click.prevent.stop="isDelete = true"
          small
          icon
          class="ma-0 pa-0"
        >
          <v-icon small class="ma-0 text--secondary">delete</v-icon>
        </v-btn>
      </div>
    </v-row>
    <EditInline v-else :valueText="name" @add="add" @close="cancel" />
    <ConfirmItem
      :isShowPopup="isDelete"
      @remove="remove"
      @cancel="isDelete = false"
      messageConfirm="Are you sure you want to delete this item ?"
    />
  </v-list-item-title>
</template>

<script>
import EditInline from "../inputs/EditInline";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  components: {
    EditInline,
    ConfirmItem
  },
  props: {
    name: String,
    to: String
  },
  data() {
    return {
      isEditing: false,
      isDelete: false
    };
  },
  methods: {
    openEdit() {
      this.isEditing = true;
    },
    add(name) {
      this.isEditing = false;
      this.$emit("submit", name);
    },
    remove() {
      this.isDelete = false;
      this.$emit("remove");
    },
    cancel() {
      this.isEditing = false;
    }
  }
};
</script>
<style scoped>
.active {
  color: #6d42c7 !important;
}
.custom-leftmenu-notebook {
  height: unset;
  line-height: unset;
}
.btn-rename-delete {
  display: none;
}
.action:hover .btn-rename-delete {
  display: block;
}
.row-vlist {
  min-height: 30px;
  max-height: 100%;
}
</style>
