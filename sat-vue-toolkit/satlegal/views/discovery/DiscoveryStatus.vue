<template>
  <v-row no-gutters>
    <v-col cols="12">
      <Layout :type="type" />
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import Layout from "../../ht_components/discovery-status/Layout";
export default {
  components: {
    Layout
  },
  computed: {
    type() {
      return this.$route.params.type === "request-set"
        ? 1
        : this.$route.params.type === "status-slickgrid"
        ? 2
        : this.$route.params.type === "request-status"
        ? 3
        : this.$route.params.type === "response-status"
        ? 4
        : this.$route.params.type === "priority"
        ? 5
        : this.$route.params.type === "request-task"
        ? 6
        : this.$route.params.type === "request-task-kanban"
        ? 7
        : 1;
    }
  },
  methods: {
    redirectRoute() {
      if (!this.$route.params.requestId && !this.$route.params.type) {
        this.$router.push({
          name: "discoveryStatus",
          params: {
            type: "request-set"
          }
        });
      }
    }
  },
  mounted() {
    this.redirectRoute();
  },
  watch: {
    $route() {
      this.redirectRoute();
    }
  }
};
</script>
