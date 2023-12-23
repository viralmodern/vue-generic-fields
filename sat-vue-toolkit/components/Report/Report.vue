<template>
  <div>
    <!--<a class="ma-0 v-btn v-btn&#45;&#45;flat v-btn&#45;&#45;icon v-btn&#45;&#45;round theme&#45;&#45;light v-size&#45;&#45;small"
       :title="totalReports | nFormatter"
       :disabled="!canReport"
       @click="doReport('s')">
      <v-icon small :color="reportedObject && reportedObject.pk ? 'red' : 'grey'">mdi-flag</v-icon>
    </a>-->
    <v-btn icon
           small
           :disabled="submitting$"
           :loading="submitting$"
           :title="totalReports | nFormatter" @click="doReport('s')">
      <v-icon small :color="reportedObject && reportedObject.pk ? 'red' : 'grey'">mdi-flag</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import {nFormatter} from "../../filters";

  export default {
    name: "Report",
    filters: {nFormatter},
    props: {
      endPoint: {
        type: String,
        required: true
      },
      totalReports: {
        type: Number,
        default: 0
      },
      reportedObject: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        totalReports$: this.totalReports,
        reportedObject$: {...this.reportedObject},
        submitting$: false
      }
    },
    computed: {
      canReport() {
        return this.submitting$ === false;
      },
    },
    methods: {
      async doReport(reason) {
        let method, url, data, reportedObject, totalReports = 0;
        if (this.reportedObject && this.reportedObject.pk) {
          url = `${this.endPoint}reports/${this.reportedObject.pk}/`;
          method = this.$api.delete;
        } else {
          // post
          url = `${this.endPoint}reports/`;
          method = this.$api.post;
          data = {reason}
        }
        this.submitting$ = true;
        try {
          if (data === undefined) {
            await method(url);
            reportedObject = null;
            totalReports -= 1;
          } else {
            let response = await method(url, data);
            reportedObject = response.data;
            totalReports += 1;
          }
          this.$emit('reported', {total_reports: totalReports, reported_object:  reportedObject})
        } catch (e) {
          console.error(e.toString());
        } finally {
          this.submitting$ = false;
          // total_reports, reported_object

        }
      }
    }
  }
</script>

