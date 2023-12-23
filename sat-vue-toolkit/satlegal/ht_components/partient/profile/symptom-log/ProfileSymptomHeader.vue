<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar>
        <v-spacer />
        <v-btn rounded color="success" :outlined="true">
          Filter is {{ false ? "on" : "off" }}
          <v-icon right>filter_list</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{ name: 'ProfileSymptomLogTableView' }"
          active-class="primary--text"
        >
          <v-icon>view_quilt</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{ name: 'ProfileSymptomLogAbsenceLog' }"
          active-class="primary--text"
        >
          <v-icon>date_range</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{ name: 'ProfileSymptomLogGantt' }"
          active-class="primary--text"
        >
          <v-icon>show_chart</v-icon>
        </v-btn>
      </v-app-bar>
    </v-col>
  </v-row>
</template>
<script>
export default {};
</script>
