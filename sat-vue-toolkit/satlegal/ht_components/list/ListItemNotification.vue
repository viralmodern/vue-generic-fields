<template>
  <v-row  no-gutters>
    <v-list-item-content>
      <v-list-item-title v-html="title"></v-list-item-title>
      <v-list-item-subtitle>{{subTitle}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-switch v-model="statusActive" color="primary"></v-switch>
    </v-list-item-action>
  </v-row>
</template>
<script>
export default {
  props: {
    title: String,
    subTitle: String,
    active: Boolean
  },
  data() {
    return {
      statusActive: false
    };
  },
  mounted() {
    this.statusActive = this.active;
  },
  watch: {
    active(val) {
      this.statusActive = val;
    },
    statusActive(val) {
      this.$emit("changestatusActive", val);
    }
  }
};
</script>
