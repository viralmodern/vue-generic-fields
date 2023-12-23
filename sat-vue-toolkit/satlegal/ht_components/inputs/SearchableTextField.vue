<template>
  <v-text-field
    label="Prepend"
    prepend-icon="search"
    @keyup="change"
    v-model="text"
    :loading="loading"
  >
    <template slot="label">
      <strong>Type</strong>&nbsp;to search&nbsp;
      <strong>people</strong>
    </template>
  </v-text-field>
</template>

<script>
export default {
  interval: null,
  data: () => ({
    text: ""
  }),
  props: {
    loading: Boolean
  },
  methods: {
    change() {
      if (this.interval) {
        clearTimeout(this.interval);
      }
      this.interval = setTimeout(() => {
        this.$emit("onSearch", this.text);
        this.interval = null;
      }, 500);
    }
  }
};
</script>
