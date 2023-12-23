<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 v-for="route in routes" :key="route.path">
        <v-card>
          <v-card-text>
            <router-link :to="route.path">{{
               route.path
              }}</router-link>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "UI",
    data() {
      return {
        routes: this.$router.options.routes.filter(
          route => route.component.name !== "UI"
        )
      };
    }
  };
</script>
