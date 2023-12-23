<template>
  <v-btn
    v-on="on"
    class="ma-0 btn-custom"
    :class="colorButton"
    @click="$emit('onClickIcon')"
    icon
    small
    :disabled="isReadonly"
  >
    <v-icon :color="colorIcon">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    on: Object,
    colorButton: String,
    icon: {
      type: String,
      default: () => "mdi-plus"
    },
    colorIcon: String,
    isReadonly: {
      type: Boolean,
      default: () => false
    }
  }
};
</script>

<style lang="stylus" scoped>
.btn-custom {
  border: 1px dashed #c1c2c3;

  &:hover {
    background: rgba(17,205,239,.5);

    /deep/ .v-icon {
      color: white;
    }
  }

  &:before {
    content: unset;
  }

  /deep/ .v-icon {
    font-size: 16px;
    color: rgb(210, 213, 226);
    caret-color: rgb(210, 213, 226);
  }

  /deep/ .v-ripple__container {
    display: none;
  }
}
</style>
