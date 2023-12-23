<template>
  <span class="caption text--secondary" color="black">{{resource.sum}} / {{resource.total}}h</span>
</template>

<script>
export default {
  props: {
    resource: Object
  }
};
</script>