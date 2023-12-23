<template>
  <v-card class="pa-3 ma-2" max-width="290">
    <ProjectAvatar :imageUrl="item.project.imageUrl" />
    <v-row no-gutters class="mt-3">
      <h3>{{ item.project.name }}</h3>
    </v-row>
    <ProjectReferLink :link="item.description" />
    <v-row no-gutters class="mt-3">
      <span>{{ item.content }}</span>
    </v-row>
    <ProjectProgress :value="item.progress.value" />
    <v-row no-gutters class="mt-3">
      <v-row no-gutters>
        <ProjectDeadline :deadline="item.deadline" />
        <ProjectListTeam :items="item.team" />
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
import ProjectAvatar from "../avatars/ProjectAvatar";
import ProjectReferLink from "../links/ProjectReferLink";
import ProjectProgress from "../progress-bars/ProjectProgress";
import ProjectDeadline from "../chips/ProjectDeadline";
export default {
  props: {
    item: Object
  },
  components: {
    ProjectAvatar,
    ProjectReferLink,
    ProjectProgress,
    ProjectDeadline
  }
};
</script>
