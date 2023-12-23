<template>
  <v-card class="delete-card">
    <v-card-title class="py-1">
      <v-row no-gutters class="ma-0 justify-space-between align-center">
        <router-link class="text-caption" to>#{{ code }}</router-link>
      </v-row>
      <ProjectTag x-small :items="tags" />
      <v-menu offset-y right>
        <v-btn class="ma-0 custom" v-slot:activator="{ on }" icon>
          <v-icon v-on="on" class="text--secondary">mdi-more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-eye_on</v-icon>
            </v-list-item-action>
            <v-list-item-title>View detail</v-list-item-title>
          </v-list-item>
          <v-list-item @click="isShowPopup = true">
            <v-list-item-action>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-action>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text class="py-1">
      <h3 class="title">{{ name }}</h3>
      <v-progress-linear
        :value="progress"
        height="5"
        color="primary"
      ></v-progress-linear>
      <span class="text-caption">{{ content }}</span>
    </v-card-text>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-card>
</template>
<script>
import ProjectTag from "../chips/ProjectTag";
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  props: {
    name: String,
    zoom: Boolean,
    code: Number,
    progress: Number,
    content: String,
    tags: Array
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  components: {
    ProjectTag,
    ConfirmItem
  },
  methods: {
    deleteConfirm() {
      this.$emit("deleteSubTask");
    }
  }
};
</script>
