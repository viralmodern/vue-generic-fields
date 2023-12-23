<template>
  <div class="showDetail">
    <a class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small" @click="$emit('update')" icon small v-if="isShowFlag">
      <v-icon small :color="value === true ? 'red' : 'grey'">mdi-flag</v-icon>
    </a>
    <Bookmark
      @onClickBookmark="$emit('updateBookmark')"
      :color="valueBookmark === true ? 'success' : 'grey'"
      v-if="isShowBookmark"
    />
    <a
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="$emit('showDetail')"
      icon
      small
      v-if="isShowDetail"
    >
      <v-icon small color="grey">mdi-eye</v-icon>
    </a>
  </div>
</template>

<script>
import Bookmark from "./Bookmark";

export default {
  components: {
    Bookmark,
  },
  props: {
    value: Boolean,
    valueBookmark: Boolean,
    isShowDetail: Boolean,
    isShowBookmark: Boolean,
    isShowFlag: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>
<style scoped>
.showDetail {
  display: flex;
  justify-content: center;
  flex-wrap: inherit;
}
</style>
