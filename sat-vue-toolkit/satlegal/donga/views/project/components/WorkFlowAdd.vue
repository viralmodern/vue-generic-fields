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
          <v-form @submit.prevent="title ? onSave(title) : false">
            <v-text-field
              solo
              label="title"
              append-icon="playlist_add_check"
              v-model="title"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-spacer></v-spacer>
        <v-btn color="default" @click="drawer = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!title" @click="onSave(title)">{{
          isEdit ? "Update" : "Add"
        }}</v-btn>
      </v-card-actions>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "WorkFlowAdd",
  props: {
    isEdit: Boolean,
    title: {
      type: String,
      required: false
    },
    onSave: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    toggleModal() {
      this.drawer = !this.drawer;
    }
  },
  watch: {
    isEdit: function(newVal, oldVal) {
      // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if (newVal !== oldVal) {
        this.isEdit = newVal;
        // this.text =
      }
    },
    title: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.title = newVal;
      }
    }
  }
};
</script>

<style scoped></style>
