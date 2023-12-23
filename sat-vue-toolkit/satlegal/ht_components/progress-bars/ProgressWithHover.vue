<template>
  <v-row
    no-gutters
    :style="{
      height,
      position: 'relative',
      opacity: isStrike === true ? 0.3 : 1,
      width: '180px'
    }"
  >
    <div
      class="linear__background"
      :style="{ opacity: 0.3, background: '#FFFFFF' }"
    ></div>
    <v-tooltip top v-for="item in list" :key="item.id">
      <template v-slot:activator="{ on }">
        <!-- <div
          class="v-progress-linear__background"
          :style="{ height, opacity: 0.3, background: '#bdbdbdc9', width: '100%' }"
        ></div> -->
        <div
          v-on="on"
          :style="{
            height,
            width: `${(item[keyProgress] * 100) / total}%`,
            background: item[keyColor]
          }"
        ></div>
      </template>
      <span>{{item[nameProgress]}} : {{ item[keyProgress] }}</span>
    </v-tooltip>
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
    total: Number,
    keyProgress: String,
    nameProgress: String,
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
