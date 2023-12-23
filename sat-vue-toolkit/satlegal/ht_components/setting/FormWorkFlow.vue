<template>
  <v-dialog persistent :value="isShow" @input="closeDialog" width="400">
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">
            {{ item ? "Edit workflow" : "Create workflow" }}
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              label="Name"
              :rules="[v => !!v || 'This field is required']"
              v-model="name"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <span>Procedure Step</span>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="ml-2 custom" icon @click="addStep">
                <v-icon class="text--secondary">mdi-add_circle</v-icon>
              </v-btn>
            </template>
          </v-col>
        </v-row>
        <v-row class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              value="Initiate"
              label="Step 1"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          v-for="(item, index) in steps"
          :key="index"
          class="px-3 py-2"
        >
          <v-col cols="12">
            <v-row class="justify-center align-center">
              <v-col cols="10">
                <v-text-field
                  :label="'Step' + ' ' + (index + 2)"
                  :rules="[v => !!v || 'This field is required']"
                  :value="item.name || ''"
                  @input="changeDataStep(item.id, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pl-3">
                <v-btn icon @click="deleteStepAction(item.id)">
                  <v-icon>delete_outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              :label="'Step ' + (steps.length + 2)"
              value="Done"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" v-if="item" @click="edit"
          >Edit</v-btn
        >
        <v-btn class="v-btn theme--light primary" v-else @click="add"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShow: Boolean,
    item: Object
  },
  data() {
    return {
      valid: true,
      name: "",
      steps: [
        { id: 1, name: "" },
        { id: 2, name: "" },
        { id: 3, name: "" },
        { id: 4, name: "" },
        { id: 5, name: "" }
      ]
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    changeDataStep(id, name) {
      this.steps.find(x => x.id === id).name = name;
    },
    addStep() {
      this.steps.push({
        id: Math.random(),
        name: ""
      });
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          steps: this.steps
        };
        this.$emit("addWorkFlow", data);
        this.closeDialog();
        this.name = "";
        this.steps = this.steps.map(x => ({ ...x, name: "" }));
      }
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          id: this.item.id,
          name: this.name,
          steps: this.steps
        };
        this.$emit("editWorkFlow", data);
        this.closeDialog();
      }
    },
    deleteStepAction(e) {
      this.steps = this.steps.filter(x => x.id !== e);
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        if (this.item) {
          this.name = this.item.name;
          this.steps = JSON.parse(JSON.stringify(this.item.steps));
        }
      }
    }
  }
};
</script>
