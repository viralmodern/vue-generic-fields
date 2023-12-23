<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.mdAndUp"
    fixed
    app
    right
    temporary
  >
    <div class="layout column fill-height justify-space-between">
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="drawer = false"></v-app-bar-nav-icon>
        <v-toolbar-title class="subheading"
          >{{ isEdit ? "Edit" : "Add" }} workflow</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-card class="flex">
        <v-card-text>
          <v-form @submit.prevent="handleSave" v-if="drawer">
            <v-text-field
              solo
              label="title"
              v-model="internalTitle"
              autofocus
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-spacer></v-spacer>
        <v-btn color="default" @click="drawer = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!internalTitle" @click="handleSave">{{
          isEdit ? "Update" : "Add"
        }}</v-btn>
      </v-card-actions>
    </div>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations } from "vuex";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  name: "WorkFlowAddEdit",
  props: {
    isEdit: Boolean,
    title: {
      type: String,
      required: false,
      default: ""
    },
    onSave: {
      type: Function,
      required: false
    },
    WF: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      drawer: false,
      internalTitle: this.title,
      projectId: ""
    };
  },
  created() {
    this.projectId = this.$route.params.matter || this.$route.params.projectId;
  },
  methods: {
    toggleModal() {
      this.drawer = !this.drawer;
    },
    handleSave() {
      if (!this.internalTitle) return false;
      if (this.isEdit) return this.handleUpdate();
      return this.handleAdd();
    },
    handleAdd() {
      // TODO: call API Add workflow
      this.$http
        .post(`/api/workflows/`, {
          name: this.internalTitle,
          project: this.projectId
        })
        .then(rs => {
          this.setWorkFlowProject(rs.data);
          this.onSave(rs.data);
        })
        .catch(() => {});
    },
    handleUpdate() {
      // TODO: call API Update workflow
      this.$http
        .put(`/api/workflows/${this.WF.pk}/`, { name: this.internalTitle })
        .then(rs => {
          this.setWorkFlowProject(rs.data);
          this.onSave(rs.data);
        })
        .catch(() => {});
    },
    ...mapMutations("ht_store/projectDetail", ["setWorkFlowProject"])
  },
  watch: {
    isEdit: function(newVal, oldVal) {
      // watch it
      if (newVal !== oldVal) {
        this.isEdit = newVal;
      }
    },
    title: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.internalTitle = newVal;
      }
    }
  }
};
</script>

<style scoped></style>
