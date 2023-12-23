<template>
  <div>
    <v-chip
      :color="color"
      label
      class="white--text custom-chip1"
      :style="{ width }"
      small
      @click="$emit('choseLabel')"
    >
      <v-row class="align-center">
        <v-col cols="10">
          <span>{{ text }}</span>
        </v-col>
        <v-col cols="2" v-if="check">
          <v-icon v-if="check" small>mdi-check</v-icon>
        </v-col>
      </v-row>
    </v-chip>
  </div>
</template>
<script>
export default {
  props: {
    color: String,
    text: String,
    check: Boolean,
    width: String
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
.custom-chip1 /deep/ .v-chip__content span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
