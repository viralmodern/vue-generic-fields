<template>
  <v-chip class="mr-2">
    <v-icon size="20">mdi-av_timer</v-icon>
    <span class="ml-1">{{ formatDateProjectDeadline }}</span>
  </v-chip>
</template>
<script>
import moment from "moment";
export default {
  props: {
    deadline: String
  },
  computed: {
    formatDateProjectDeadline() {
      return moment(this.deadline).fromNow();
    }
  }
};
</script>


