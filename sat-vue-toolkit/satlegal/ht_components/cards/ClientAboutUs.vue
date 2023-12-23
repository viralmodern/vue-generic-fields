<template>
  <v-row no-gutters class=" d-flex align-center justify-space-around">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="default" v-on="on">
            <v-icon>mdi-call</v-icon>
          </v-btn>
        </template>
        <span>Call</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="default" v-on="on">
            <v-icon>mdi-mail_outline</v-icon>
          </v-btn>
        </template>
        <span>Email</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="default" :to="toMessage" v-on="on">
            <v-icon>mdi-message</v-icon>
          </v-btn>
        </template>
        <span>Chat</span>
      </v-tooltip>
  </v-row>
</template>
<script>
export default {
  computed: {
    toMessage() {
      return {
        id: this.$route.params.id,
        name: "MessageClient"
      };
    }
  }
};
</script>
