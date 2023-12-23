<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" persistent width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col v-if="!disabledFiledOne" cols="12">
            <v-text-field
              v-model="name"
              label="Term"
              :rules="[v => !!v || 'This field is required']"
              append-icon="create"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="definition"
              :label="labelFieldTwo"
              append-icon="sort"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="text--secondary subheading">
              {{ labelFieldThree }} :
            </div>
            <NotebookEditor
              ref="description"
              placeholder="Type your description..."
              @change="description = $event"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import NotebookEditor from "../editor/NotebookEditor";

export default {
  components: {
    NotebookEditor
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    disabledFiledOne: Boolean,
    labelFieldTwo: String,
    labelFieldThree: String
  },
  data() {
    return {
      valid: false,
      name: "",
      definition: "",
      description: ""
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          definition: this.definition,
          description: this.description
        };
        if (!this.disabledFiledOne) {
          data.name = this.name;
        }
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.name = "";
      this.definition = "";
      this.description = "";
      this.$refs.description.clearContent();
      this.$refs.form.resetValidation();
    }
  }
};
</script>
