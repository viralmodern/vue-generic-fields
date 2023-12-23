<template>
  <v-card :style="style" class="my-event">
    <v-card-text class="px-1 py-0">
      <v-btn
        absolute
        right
        class="ma-0 custom-btn"
        style="right:0px;top:0px"
        icon
      >
        <v-icon
          :color="isPinned ? 'primary' : 'grey'"
          @click="$emit('updatePin')"
          >mdi-star</v-icon
        >
      </v-btn>
      <div v-if="needShowTime" class="cut-line caption text--secondary">
        <strong>{{ timeToDisplay }}</strong>
      </div>
      <div class="cut-line">
        <strong>{{ title }}</strong>
      </div>
      <div v-if="needShowDescription" class="caption text--secondary">
        {{ descriptionTruncate }}
      </div>
      <div v-if="duration >= 180" class="caption text--secondary members">
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
    </v-card-text>
  </v-card>
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
    },
    timeToY: Function,
    minutesToPixels: Function
  },
  computed: {
    style() {
      return {
        top: this.timeToY(this.time) + "px",
        height: this.minutesToPixels(this.duration) - 1 + "px",
        width: (this.numberOfContinuouslyDays || 1) * 100 + "%"
      };
    },
    needShowTime() {
      return this.duration >= 60;
    },
    timeToDisplay() {
      if (!this.time) return "";
      let [hr, min] = this.time.split(":");
      hr = parseInt(hr);
      min = parseInt(min);
      const from = moment([1990, 1, 1, hr, min, 0]);
      const to = from.add(this.duration, "m");
      return `${from.format("h:mm a")} - ${to.format("h:mm a")}`;
    },
    needShowDescription() {
      return this.duration >= 120;
    },
    descriptionTruncate() {
      let length = this.duration >= 180 ? 40 : 20;
      length *= this.numberOfContinuouslyDays;
      if (this.description.length < length) return this.description;
      return this.description.slice(0, length - 3) + "...";
    }
  }
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  border-radius: 2px;
  width: 100%;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  margin-top: 1px;
  background: #d2d5fb;
}
.cut-line {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.members /deep/ .v-list__tile {
  padding: 0px;
}
.avatar-list {
  transform: scale(0.7);
  transform-origin: top left;
}
.custom-btn {
  height: 25px;
  width: 25px;
}
</style>
