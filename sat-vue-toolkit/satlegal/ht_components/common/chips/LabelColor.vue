<template>
  <v-chip
    :color="color"
    label
    :class="`custom-chip1 ${colorTextChip ? colorTextChip : 'white--text'}`"
    :style="{ width, maxWidth }"
    small
    @click="$emit('choseLabel')"
  >
    <div class="d-flex align-center w-100" style="overflow: hidden;">
      <div class="text">
        {{ text }}
      </div>
      <div class="check-icon" v-if="check">
        <v-icon v-if="check" small>mdi-check</v-icon>
      </div>
    </div>
  </v-chip>
</template>
<script>
export default {
  props: {
    color: String,
    text: String,
    check: Boolean,
    width: String,
    maxWidth: String,
    colorTextChip: String,
  }
};
</script>

<style scoped>
.custom-chip1 {
  margin: 2px 4px 2px 0px;
}
.custom-chip1 /deep/ .v-chip__content {
  width: 100%;
  cursor: pointer;
}
.custom-chip1 /deep/ .v-chip__content .text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  display: block;
}
.check-icon{
  min-width: 16px;
}
</style>
