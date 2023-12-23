<template>
  <v-row no-gutters>
    <v-list>
      <v-col cols="12">
        <CharacterType />
      </v-col>
    </v-list>
    <router-view></router-view>
  </v-row>
</template>
<script>
import CharacterType from "../../../ht_components/links/character/CharacterType";
export default {
  components: {
    CharacterType
  },
  mounted() {
    this.redirectRoute();
  },
  methods: {
    redirectRoute() {
      if (!this.$route.params.listType || !this.$route.params.groupType) {
        const listType = this.$route.params.listType || "grid";
        const groupType = this.$route.params.groupType || "activities";
        this.$router.push({
          name: "activity",
          params: {
            ...this.$route.params,
            listType,
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
