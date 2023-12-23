<template>
  <v-row>
    <v-col cols="12">
      <div class="px-3">
        <v-row no-gutters class="align-center justify-end">
          <v-btn :to="{ name: 'MeetingAgenda' }" icon class="ma-0 mx-1">
            <v-icon size="27">view_agenda</v-icon>
          </v-btn>
          <v-btn :to="{ name: 'MeetingWeekly' }" icon class="ma-0">
            <v-icon size="32">view_week</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider class="my-1"></v-divider>
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>
