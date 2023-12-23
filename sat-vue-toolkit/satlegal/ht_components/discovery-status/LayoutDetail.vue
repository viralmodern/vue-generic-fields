<template>
  <div>
    <DetailRequestSet v-if="type === 'request-set'" />
  </div>
</template>
<script>
import DetailRequestSet from "./request-set/detail/HomeDetail";
export default {
  data() {
    return {
      type: ""
    };
  },
  components: {
    DetailRequestSet
  },
  mounted() {
    this.type = this.$route.params.type;
  }
};
</script>
