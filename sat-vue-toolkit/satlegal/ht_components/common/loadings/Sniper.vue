<template>
  <div :class="`${isLoading ? 'd-flex' : ''} loading`">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  }
};
</script>

<style scoped>
.loading {
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 28px;
}
</style>
