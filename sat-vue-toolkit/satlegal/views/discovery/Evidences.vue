<template>
  <v-row no-gutters>
      <v-col cols="12" class="mt-2">
        <DiscoveryType />
      </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import DiscoveryType from "../../ht_components/links/discovery/DiscoveryType";
export default {
  components: {
    DiscoveryType
  },
  mounted() {
    this.redirectRoute();
  },
  methods: {
    redirectRoute() {
      if (!this.$route.params.groupType) {
        const groupType = this.$route.params.groupType || "evidences-grid";
        this.$router.push({
          name: "evidences",
          params: {
            ...this.$route.params,
            groupType
          }
        });
      }
    }
  },
  watch: {
    $route() {
      this.redirectRoute();
    }
  }
};
</script>
