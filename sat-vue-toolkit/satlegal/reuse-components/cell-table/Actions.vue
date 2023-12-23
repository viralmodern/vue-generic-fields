<template>
  <div class="d-flex justify-center">
    <a
      v-if="isShowActionFlag"
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="$emit('onClickFlag')"
    >
      <v-icon small :color="valueFlag === true ? 'red' : 'grey'"
        >mdi-flag</v-icon
      >
    </a>
    <a
      v-if="isShowActionBookmark"
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="$emit('onClickBookmark')"
    >
      <v-icon small :color="valueBookmark === true ? 'success' : 'grey'"
        >mdi-bookmark</v-icon
      >
    </a>
    <a
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="$emit('onClickView')"
      v-if="isShowActionView"
    >
      <v-icon small color="grey">mdi-eye</v-icon>
    </a>
    <a
      v-if="isShowActionDelete"
      @click="$emit('onClickDelete')"
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
    >
      <v-icon size="18" color="red">mdi-delete</v-icon>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    valueFlag: Boolean,
    valueBookmark: Boolean,
    isShowActionView: {
      type: Boolean,
      default: true
    },
    isShowActionBookmark: {
      type: Boolean,
      default: true
    },
    isShowActionFlag: {
      type: Boolean,
      default: true
    },
    isShowActionDelete: {
      type: Boolean,
      default: true
    }
  }
};
</script>
