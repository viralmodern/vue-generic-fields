<template>
  <v-row no-gutters>
    <v-col cols="12" sm="6" md4>
      <v-menu
        ref="menu"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="dateProject"
            label="Working date"
            prepend-icon="mdi-calendar"
            readonly
            :rules="[v => !!v || 'Please choose working date']"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateProject"
          no-title
          scrollable
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="6" md4>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="startHours"
            label="Start hour"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please select start hour']"
          ></v-text-field>
        </template>
        <v-time-picker
          format="24hr"
          v-model="startHours"
          :max="endHours"
          color="blue darken-2"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="6" md4>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="endHours"
            label="End hour"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please select end hour ']"
          ></v-text-field>
        </template>
        <v-time-picker
          format="24hr"
          v-model="endHours"
          :min="startHours"
          color="blue darken-2"
        ></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dateProject: "",
      startHours: "",
      endHours: ""
    };
  }
};
</script>
