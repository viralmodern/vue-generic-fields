<template>
  <v-btn
    :loading="isLoading"
    @click="loadMore"
    color="primary"
    text
    style="text-transform: unset"
    >Load more
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      isLoading: false
    };
  },
  methods: {
    loadMore() {
      this.page += 1;
      this.$emit("onPageChanged", {
        page: this.page,
        setLoading: this.setLoading
      });
    },
    setLoading(status) {
      this.isLoading = status;
    }
  }
};
</script>
