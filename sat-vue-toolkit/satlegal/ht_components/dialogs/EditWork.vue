<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="600" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="title font-weight-regular white--text">{{ title }}</div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-select
            :items="listOccupation"
            v-model="occupation"
            :rules="[v => !!v || 'Occupation is required']"
            label="Occupation"
          ></v-select>
          <v-autocomplete
            :items="listSkills"
            multiple
            v-model="skills"
            :rules="[v => !!v.length || 'Skills is required']"
            label="Skills"
          ></v-autocomplete>
          <v-card class="py-2 px-1">
            <div class="px-1">
              <h3 class="py-1">Workplaces</h3>
              <v-divider></v-divider>
            </div>
            <div v-if="!jobs.length" class="pa-1">
              Click Add Rows button to start adding Jobs
            </div>
            <WorkJobsRow
              v-for="item in jobs"
              :key="item.id"
              :workplace="item.workplace"
              :startDate="item.startDate"
              :endDate="item.endDate"
              @deleteRowJobs="deleteRowJobs(item.id)"
              @changeInput="changeInput(item.id, $event)"
            />
            <div class="pa-1">
              <v-divider></v-divider>
              <div class="py-2">
                <v-btn class="ma-0 primary" @click="addRowJobs">
                  <v-icon>mdi-plus</v-icon>Add Jobs
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="edit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import WorkJobsRow from "../cards/WorkJobsRow";
export default {
  components: {
    WorkJobsRow
  },
  props: {
    isShow: Boolean,
    title: String,
    itemEdit: Object
  },
  data() {
    return {
      valid: true,
      menu: false,
      listOccupation: ["Developer", "Hr", "Tester"],
      occupation: [],
      listSkills: [
        "C#",
        "PHP",
        "Javascript",
        "Angular",
        "Python",
        "HTML",
        "CSS"
      ],
      skills: [],
      jobs: []
    };
  },
  methods: {
    clearData() {
      this.occupation = [];
      this.skills = [];
      this.jobs = [];
    },
    cancel() {
      this.$emit("closeModal");
      this.clearData();
      this.$refs.form.resetValidation();
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          occupation: this.occupation,
          skills: this.skills,
          jobs: JSON.parse(JSON.stringify(this.jobs))
        };
        this.$emit("edit", data);
        this.cancel();
      }
    },
    addRowJobs() {
      this.jobs = [
        ...this.jobs,
        { id: Math.random(), workplace: "", startDate: "", endDate: "" }
      ];
    },
    deleteRowJobs(id) {
      this.jobs = this.jobs.filter(x => x.id !== id);
    },
    changeInput(id, data) {
      this.jobs = this.jobs.map(x => {
        if (x.id === id) {
          return { ...x, ...data };
        }
        return x;
      });
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        const { occupation, skills, jobs } = this.itemEdit;
        this.occupation = occupation;
        this.skills = skills;
        this.jobs = JSON.parse(JSON.stringify(jobs));
      }
    }
  }
};
</script>
