<template>
  <v-dialog :value="isShow" width="500" @input="resetForm" persistent>
    <v-card>
      <div class="primary">
        <v-row no-gutters class="justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">Add notes</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="resetForm">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12" class="py-1">
              <v-text-field
                :value="propTitle || ''"
                id="title"
                @input="onChangeInput('title', $event)"
                label="Title"
                :rules="[v => !!v || 'Title is required']"
              ></v-text-field>
            </v-col>
            <v-col class="py-1">
              <NotebookEditor
                id="editor"
                ref="description"
                placeholder="Type your note here..."
                :item="propDescription || ''"
                @change="onChangeInput('description', $event)"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="resetForm">Cancel</v-btn>
        <v-btn color="primary" @click="add" :loading="isLoadingAdd">{{ nameButton }}</v-btn>
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
    isShow: Boolean,
    propDescription: String,
    propTitle: String,
    nameButton: String,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: true,
      title: "",
      description: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          title: this.title || this.propTitle,
          description: this.description || this.propDescription
        };
        this.$emit("submit", data);
      }
    },
    resetForm() {
      this.$emit("closeModel");
      if (this.nameButton === "Add") {
        this.$refs.form.reset();
      }
    },
    changeSpaceComment(rep) {
      rep = rep.replace(/ /g, "&nbsp;");
      return rep.replace(/\n/g, "<br/>");
    },
    close() {
      this.$emit("closeModel");
      this.clear();
      this.$refs.form.resetValidation();
    },
    onChangeInput(name, value) {
      this[name] = value;
    },
    clear() {
      this.$refs.description.clearContent();
      this.$refs.form.reset();
    }
  }
};
</script>
