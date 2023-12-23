<template>
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path :d="d"></path>
  </svg>
</template>

<script>
export default {
  props: {
    d: String
  }
};
</script>