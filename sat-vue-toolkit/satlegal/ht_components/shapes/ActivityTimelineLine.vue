<template>
  <div class="line-container">
    <div class="line"></div>
    <v-card class="icon">
      <v-icon :color="icon.color">{{ icon.name }}</v-icon>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    icon: Object
  }
};
</script>

<style scoped>
.line-container {
  width: 20px;
  height: 100%;
}
.line {
  border-right: 1px dotted grey;
  width: 15px;
  height: 100%;
}
.icon {
  position: absolute;
  top: 23px;
  left: 2px;
}
</style>
