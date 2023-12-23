<template>
  <v-dialog :value="isDialog" @input="closeDialog" max-width="500px">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">Select task</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-container grid-list-md>
        <v-row no-gutters>
          <v-col cols="12">
            <v-form v-model="readonly" ref="form">
              <v-autocomplete
                v-model="nameProject"
                :rules="rulesProject"
                item-text="name"
                item-value="id"
                :items="dataProject"
                @change="changeItemProject"
                label="Choose a project"
                return-object
                required
              ></v-autocomplete>
              <v-autocomplete
                v-model="nameTask"
                :rules="rulesTask"
                item-text="name"
                item-value="id"
                :items="dataTaskProject"
                @change="changeItemTask"
                return-object
                label="Select Task"
                required
              ></v-autocomplete>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Close</v-btn>
        <v-btn class="v-btn theme--light primary" @click="showTimeTracking"
          >Track</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    isDialog: Boolean
  },
  data() {
    return {
      isTracking: false,
      nameProject: null,
      readonly: true,
      nameTask: null,
      rulesProject: [v => !!v || "Please select project"],
      rulesTask: [v => !!v || "Please select task"]
    };
  },
  methods: {
    showTimeTracking() {
      if (this.$refs.form.validate()) {
        this.readonly = true;
        this.closeDialog();
        this.isTracking = true;
        this.$emit("isTracking", this.isTracking);
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.$refs.form.reset();
    },
    changeItemProject(val) {
      this.getTasksByProjectId(val.id);
    },
    changeItemTask(val) {
      this.idTask = val.id;
    },
    ...mapActions("ht_store/task", ["getTasksByProjectId"]),
    ...mapActions("ht_store/project", ["getDataProjectRequest"])
  },
  mounted() {
    this.getDataProjectRequest();
  },
  computed: {
    ...mapGetters("ht_store/task", ["dataTaskProject"]),
    ...mapGetters("ht_store/project", ["dataProject"])
  }
};
</script>
