<template>
  <div class="list" style="position:relative">
    <v-btn absolute class="ma-0" style="right:0px; top:0px" icon>
      <v-icon class="text--secondary">mdi-more_horiz</v-icon>
    </v-btn>
    <div class="caption text--secondary">
      <strong>{{timeToDisplay}}</strong>
    </div>
    <div>
      <strong>{{title}}</strong>
    </div>
    <div class="caption text--secondary">{{description}}</div>
    <div class="caption text--secondary members">
      <AvatarsList
        class="avatar-list"
        v-if="members && Object.keys(members).length"
        :members="members.representatives"
        :totals="members.totals"
        :isInList="true"
        :limit="3"
        show-more-count
      />
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import moment from "moment";
import AvatarsList from "../avatars/AvatarsList";

export default {
  components: {
    AvatarsList
  },
  props: {
    duration: Number,
    numberOfContinuouslyDays: Number,
    time: String,
    title: String,
    description: String,
    isPinned: Boolean,
    members: {
      representatives: Array,
      totals: Number
    }
  },
  computed: {
    style() {
      return {
        top: this.timeToY(this.time) + "px",
        height: this.minutesToPixels(this.duration) - 1 + "px",
        width: (this.numberOfContinuouslyDays || 1) * 100 + "%"
      };
    },
    timeToDisplay() {
      if (!this.time) return "";
      let [hr, min] = this.time.split(":");
      hr = parseInt(hr);
      min = parseInt(min);
      const from = moment([1990, 1, 1, hr, min, 0]);
      const to = from.add(this.duration, "m");
      return `${from.format("h:mm a")} - ${to.format("h:mm a")}`;
    }
  }
};
</script>

<style scoped>
.members /deep/ .v-list__tile {
  padding: 0px;
}
.avatar-list {
  transform: scale(0.7);
  transform-origin: top left;
}
</style>
