<template>
  <v-card dark>
    <v-row no-gutters class="header-background pa-4">
      <v-row no-gutters class="pa-3 pt-0">
        <div>You dont have any anouncement today! Let enjoy the day.</div>
      </v-row>
      <v-row no-gutters class="pa-3">
        <v-col cols="12">
          <div class="text-h2">{{ welcomeMessage }}, Mark!</div>
          <div class="text-h4">Welcome back to your dashboard.</div>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-3">
        <div>
          Click to see what happend in matter 901 right now.
          <v-btn icon>
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    latestInvoices: [
      {
        name: "invoice #123",
        subName: 19182
      },
      {
        name: "invoice #324",
        subName: 19182
      }
    ]
  }),
  computed: {
    welcomeMessage() {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Good morning";
      }
      if (hour < 18) {
        return "Good afternoon";
      }
      return "Good evening";
    }
  }
};
</script>
<style scoped>
.header-background {
  background-image: linear-gradient(
    to bottom,
    #6d42c7,
    #7c52d5,
    #8c62e3,
    #9b72f1,
    #aa82ff
  );
  width: 100%;
}
.invoices-container {
  max-width: 300px;
  min-width: 250px;
  border: 1px solid white;
  border-color: white !important;
  border-radius: 4px;
}
</style>
