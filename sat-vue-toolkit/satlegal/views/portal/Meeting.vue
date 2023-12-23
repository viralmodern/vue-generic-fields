<template>
  <v-list style="height:100%">
    <div class="px-3">
      <v-row no-gutters class="align-center justify-end">
        <v-btn :to="{ name: 'MeetingAgendaPortal' }" icon class="ma-0 mx-1">
          <v-icon size="27">mdi-view_agenda</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'MeetingWeeklyPortal' }" icon class="ma-0">
          <v-icon size="32">mdi-view_week</v-icon>
        </v-btn>
      </v-row>
    </div>
    <v-divider class="my-1"></v-divider>
    <router-view></router-view>
  </v-list>
</template>

<script>
export default {};
</script>
