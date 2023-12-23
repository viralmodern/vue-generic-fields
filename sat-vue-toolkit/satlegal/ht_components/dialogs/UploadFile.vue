<template>
  <v-dialog persistent :value="isShow" @input="cancel" width="350">
    <v-card>
      <div class="primary">
        <v-row no-gutters class="justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">Add an attachment</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="cancel">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text class="pa-2">
        <div class="content pa-2">
          <v-card class="pa-2 mt-2">
            <UploadFile @onAddFile="onAddFile" @onRemoveFile="onRemoveFile" />
          </v-card>
          <div v-if="validateFile" class="pt-2 error--text">Please choose file!</div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">CLOSE</v-btn>
        <v-btn class="v-btn theme--light primary" @click="upload" :loading="isLoadingAdd">UPLOAD</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadFile from "../inputs/UploadFile";

export default {
  data() {
    return {
      files: [],
      removeAllFiles: "",
      validateFile: false
    };
  },
  props: {
    isShow: Boolean,
    isLoadingAdd: Boolean
  },
  components: {
    UploadFile
  },
  methods: {
    cancel() {
      if (this.removeAllFiles) {
        this.removeAllFiles();
      }
      this.files = [];
      this.validateFile = false;
      this.$emit("closeModal");
    },
    upload() {
      if (this.files.length) {
        this.validateFile = false;
        this.$emit("addFiles", this.files);
      } else {
        this.validateFile = true;
      }
    },
    onAddFile(data) {
      const { file, remove } = data;
      this.files = [...this.files, file];
      this.removeAllFiles = remove;
      this.validateFile = false;
    },
    onRemoveFile(file) {
      this.files = this.files.filter(x => x.name !== file.name);
    }
  }
};
</script>

<style scoped>
div /deep/ #dropzone {
  border: 1px solid silver;
  border-radius: 10px;
}
</style>
