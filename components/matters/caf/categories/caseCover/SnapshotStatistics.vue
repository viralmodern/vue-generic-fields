<template>
  <v-row>
    <v-col sm="3">
      <v-card outlined>
        <v-card-text class="text-center">
          <p class="text-h2 primary--text">23</p>
          <p class="font-weight-black">Task Added</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card outlined>
        <v-card-text class="text-center">
          <p class="text-h2 warning--text">23</p>
          <p class="black--text font-weight-black">Task Completed</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card outlined>
        <v-card-text class="text-center">
          <p class="text-h2 info--text">23</p>
          <p class="black--text font-weight-black">Hour Time Logged</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card outlined>
        <v-card-text class="text-center">
          <p class="text-h2 success--text">1024</p>
          <p class="black--text font-weight-black">Invoice</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SnapshotStatistics',
}
</script>

<style scoped></style>
