<template>
  <v-chip @input="close" @click="$emit('openUpdate')" close>{{ text }}</v-chip>
</template>
<script>
export default {
  props: {
    text: String
  },
  methods: {
    close() {
      this.$emit("deleteTag");
    }
  }
};
</script>

