<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="1">
          <ProjectAvatar :sizeImage="50" :imageUrl="projectDetail.avatar" />
        </v-col>
        <v-col cols="8">
          <v-row align-center>
            <router-link :to="`project/${projectDetail.id}`" class="caption">{{
              projectDetail.name
            }}</router-link>
            <span class="px-2">/</span>
            <router-link to class="caption">{{ codeTask }}</router-link>
          </v-row>
          <v-row no-gutters class="align-center justify-space-between">
            <v-text-field
              :value="taskTitle"
              :rules="[v => !!v || 'Title is required']"
              label="Title"
              required
              @input="editTitle"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="3">
          <UserInfo
            v-for="item in peoples"
            :mini="true"
            :item="item"
            :name="item.user.fullName"
            :avatar="item.user"
            :key="item.id"
            :jobTitle="item.mission"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-2">
        <NotebookEditor
          placeholder="Type your note here..."
          :item="changeDescriptionTask"
          @change="changeDescription"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ProjectAvatar from "../avatars/ProjectAvatar";
import NotebookEditor from "../editor/NotebookEditor";
import UserInfo from "./UserInfo";
export default {
  props: {
    taskTitle: String,
    codeTask: String,
    descriptionTitle: String,
    projectDetail: Object,
    peoples: Array
  },
  components: {
    ProjectAvatar,
    NotebookEditor,
    UserInfo
  },
  computed: {
    changeDescriptionTask() {
      let rep = this.descriptionTitle;
      const names = this.descriptionTitle.match(/([@])\w+/g);
      if (names) {
        names.forEach(n => (rep = rep.replace(n, `<a>${n}</a>`)));
      }
      return rep.replace(/\n/g, "<br/>");
    }
  },
  methods: {
    editTitle(e) {
      this.$emit("editTitle", e);
    },
    changeDescription(e) {
      this.$emit("editDescription", e);
    }
  }
};
</script>
