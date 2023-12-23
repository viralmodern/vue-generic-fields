<template>
  <v-row
    no-gutters
    :style="{
      height,
      position: 'relative',
      opacity: isStrike === true ? 0.3 : 1
    }"
  >
    <div
      class="v-progress-linear__background"
      :style="{ height, opacity: 0.3, background: '#bdbdbdc9', width: '100%' }"
    ></div>
    <div
      v-for="item in list"
      :key="item.id"
      :style="{
        height,
        width: `${item[keyProgress]}%`,
        background: item[keyColor]
      }"
    ></div>
  </v-row>
</template>

<script>
export default {
  props: {
    isStrike: Boolean,
    height: {
      type: String,
      default: "8px"
    },
    fontSize: {
      type: String,
      default: "8px"
    },
    list: Array,
    keyProgress: String,
    keyColor: String
  }
};
</script>

<style scoped>
.progress {
  display: flex;
  justify-content: center;
  color: white;
}
</style>
