<template>
  <v-row class="align-center" no-gutters>
    <v-col cols="3" class="px-1">
      <v-text-field
        :value="workplace"
        :rules="[v => !!v || 'Workplace is required']"
        @input="onChange('workplace', $event)"
        label="Jobs"
      ></v-text-field>
    </v-col>
    <v-col cols="4" class="px-1">
      <v-menu
        ref="menuStartDate"
        :close-on-content-click="false"
        v-model="menuStartDate"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            :value="startDate"
            :rules="[v => !!v || 'startDate is required']"
            label="Start Date"
            persistent-hint
            prepend-icon="mdi-calendar"
          ></v-text-field>
        </template>
        <v-date-picker
          :max="new Date().toISOString().substr(0, 10)"
          :value="startDate"
          :rules="[v => !!v || 'Start date is required']"
          no-title
          @input="onChange('startDate', $event)"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="4" class="px-1">
      <v-menu
        :close-on-content-click="false"
        v-model="menuEndDate"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            :value="endDate"
            :rules="[v => !!v || 'End date is required']"
            label="End Date"
            persistent-hint
            prepend-icon="mdi-calendar"
          ></v-text-field>
        </template>
        <v-date-picker
          :min="startDate"
          :value="endDate"
          no-title
          @input="onChange('endDate', $event)"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="1" class="px-1">
      <v-btn icon @click="$emit('deleteRowJobs')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    workplace: String,
    startDate: String,
    endDate: String
  },
  data() {
    return {
      valid: false,
      dataForm: {},
      menuStartDate: false,
      menuEndDate: false
    };
  },
  methods: {
    onChange(name, value) {
      if (name === "startDate") {
        this.menuStartDate = false;
      }
      if (name === "endDate") {
        this.menuEndDate = false;
      }
      this.dataForm = { ...this.dataForm, [name]: value };
      this.$emit("changeInput", this.dataForm);
    }
  },

  watch: {
    startDate() {
      let startDate = this.startDate.replace(/-/g, "");
      let endDate = this.endDate.replace(/-/g, "");
      if (startDate >= endDate) {
        this.dataForm = { ...this.dataForm, endDate: this.startDate };
        this.$emit("changeInput", this.dataForm);
      }
    }
  }
};
</script>
