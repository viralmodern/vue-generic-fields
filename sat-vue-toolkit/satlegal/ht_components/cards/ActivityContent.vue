<template>
  <div class="default">
    <span>{{action.text}}</span>&nbsp;
    <span>{{destinationObject.type}}</span>&nbsp;
    <router-link
      v-if="destinationObject.title"
      :to="destinationObject.link"
    >{{destinationObject.title}}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    action: Object,
    destinationObject: Object
  }
};
</script>

<style scoped>
</style>