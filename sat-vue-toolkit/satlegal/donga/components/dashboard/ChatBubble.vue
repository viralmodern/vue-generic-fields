<template>
  <div>
    <v-btn
      fixed
      bottom
      color="primary"
      right
      fab
    >
      <v-icon>forum</v-icon>
      <span class="badge_mss">20</span>
      <span></span>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "ChatBubble"
  }
</script>

<style scoped>
  .badge_mss {
    position: absolute;
    display: block;
    transform: translate(30%, -80%);
    background: red;
    padding: 5px 10px;
    border-radius: 50%;
    font-weight: bold;
  }
</style>
