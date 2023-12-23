<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" class="py-1">
        <v-row no-gutters class="align-center">
          <v-icon>mdi-attach_file</v-icon>
          <b>{{ name }} ( {{ status }} )</b>
        </v-row>
      </v-col>
      <v-col cols="12" class="pl-2 py-1">
        <h2 class="text-body-1">
          Uploaded by
          <b>{{ uploader }}</b> at <b>{{ at }}</b> on
          <b>{{ date | formatDMY }}</b> at
          <b>{{ date | formatTimeHHmm }}</b>
        </h2>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import { formatTimeHHmm } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
    filters: {
      formatTimeHHmm
    },
  props: {
    date: Date,
    uploader: String,
    at: String,
    name: String,
    status: String
  }
};
</script>
