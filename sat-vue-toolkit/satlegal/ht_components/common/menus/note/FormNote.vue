<template>
  <div>
    <div class="text-subtitle-1 font-weight-bold">{{ title }}</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row no-gutters class="mb-2">
        <v-col cols="12" class="py-1">
          <v-text-field
            autofocus
            class="custom-text-field"
            v-model="dataForm.title"
            id="title"
            placeholder="Title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
        </v-col>
        <v-col class="py-1">
          <NotebookEditor
            id="editor"
            ref="content"
            placeholder="Type your note here..."
            :item="dataForm.content || ''"
            @change="dataForm.content = $event; validForm()"
          />
          <span class="caption error--text">{{this.errorsForm.content.messages}}</span>
        </v-col>
      </v-row>
      <div class="text-right">
        <v-btn small @click="back" class="mr-2">Back to List note</v-btn>
        <v-btn
          small
          color="primary"
          @click="submit"
          :loading="isLoadingAdd"
          >{{ textSubmit }}</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import NotebookEditor from "../../../editor/NotebookEditor";

export default {
  components: {
    NotebookEditor
  },
  props: {
    isLoadingAdd: Boolean,
    title: String,
    textSubmit: String,
    dataFormNote: {
      title: String,
      content: String
    }
  },
  data() {
    return {
      valid: false,
      dataForm: {
        title: "",
        content: ""
      },
      errorsForm: {
        content: {
          messages: "",
          valid: false
        },
      },
    };
  },
  methods: {
    validForm() {
      const errors = {
        content: {
          messages: "",
          valid: false
        },
      };
      if (!this.dataForm.content || this.dataForm.content === "<p></p>") {
        errors.content.messages = "This field is required";
        errors.content.valid = true;
      }
      const valid = !Object.keys(errors).some(key => errors[key].valid === true);
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    submit() {
      if (this.validForm()) {
        this.$emit('submit', this.dataForm)
      }
    },
    back() {
      // this.clear();
      this.$emit("close");
    },
    clear() {
      this.dataForm = {
        title: "",
        content: ""
      };
    }
  },
  mounted() {
    this.dataForm = {
      title: this.dataFormNote.title || "",
      content: this.dataFormNote.content || ""
    };
  },
  watch: {
    dataFormNote(val) {
      this.dataForm = {
        title: val.title,
        content: val.content
      };
    }
  }
};
</script>
