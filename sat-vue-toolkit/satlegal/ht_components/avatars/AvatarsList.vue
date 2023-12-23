<template>
  <v-list-item class="grow avatars-list">
    <user-avatar
      v-for="(member, index) in members.slice(0, limit)"
      :key="member.id"
      :imageUrl="showImage(member)"
      :name="member.name"
      :backgroundColor="colorsListForAvatars[index]"
      :index="members.length - index"
      :isInList="isInList"
      width="24px"
      class="d-block"
    />
    <MoreCount v-if="showMore" :name="moreCount" class="d-block" />
  </v-list-item>
</template>

<script>
import UserAvatar from "./UserAvatar";
import MoreCount from "./MoreCount";
import { colorsListForAvatars } from "../../config";
export default {
  data: () => ({
    colorsListForAvatars
  }),
  components: {
    UserAvatar,
    MoreCount
  },
  props: {
    members: Array,
    isInList: Boolean,
    limit: Number,
    showMoreCount: Boolean,
    totals: Number
  },
  methods: {
    showImage(image) {
      return image.avatar ? image.avatar.imageUrl : image.imageUrl;
    }
  },
  computed: {
    showMore() {
      if (this.showMoreCount && this.totals > this.limit) {
        return true;
      }
      return false;
    },
    moreCount() {
      if (this.totals > 102) {
        return `99+`;
      } else {
        return `+${this.totals - this.limit}`;
      }
    }
  }
};
</script>

<style scoped>
.avatars-list .img-avatar:first {
  margin-left: 0px;
}
</style>
