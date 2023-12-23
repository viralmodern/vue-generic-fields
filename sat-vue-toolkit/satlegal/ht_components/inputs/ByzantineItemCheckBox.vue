<template>
  <v-checkbox hide-details class="ma-0 py-2 custom-checkbox" @change="change" v-model="checkbox"></v-checkbox>
</template>

<script>
export default {
  props: {
    status: Boolean,
  },
  data() {
    return {
      checkbox: false
    };
  },
  methods: {
    change() {
      this.$emit("checkbox", this.checkbox);
    }
  },
  mounted() {
    this.checkbox = this.status;
  },
  watch: {
    status(val) {
      this.checkbox = val;
    }
  }
};
</script>

<style scoped>
.custom-checkbox {
  flex: unset;
}
</style>
