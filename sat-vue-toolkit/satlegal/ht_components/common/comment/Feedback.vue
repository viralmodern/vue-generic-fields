<template>
  <v-row no-gutters class="align-center">
    <v-icon x-small class="loadmore-arrow-right"
      >{{icon}}</v-icon
    >
    <a
      class="loadmore-count-more mr-2"
      href="#"
      @click="$emit('onClickFeedback')"
      ><div>
        <span>{{ textFeedback }}</span>
      </div></a
    >
    <v-progress-circular
      v-if="isLoadingFeedback"
      class="pa-0 loadmore-loading"
      indeterminate
      width="1"
      size="13"
    ></v-progress-circular>
  </v-row>
</template>

<script>
export default {
  props: {
    textFeedback: String,
    isLoadingFeedback: Boolean,
    icon: String,
  }
};
</script>

<style lang="scss" scoped>
$color-blue: #385898;
.loadmore {
  &-count-more {
    font-size: 13px;
    color: $color-blue;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  &-arrow-right {
    color: $color-blue;
    margin-right: 5px;
  }

  &-loading {
    color: $color-blue;
  }
}
</style>
