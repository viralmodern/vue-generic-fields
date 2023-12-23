<template>
  <v-dialog :value="isShow" @input="cancel" width="350">
    <v-card>
      <v-card-text class="pa-2">
        <div class="content pa-2">
          <UserSignatureInfo
            :imageUrl="itemEdit.avatar"
            :name="itemEdit.user ? itemEdit.user : ''"
            :role="itemEdit.role"
          />
          <v-card class="pa-2 mt-2">
            <UploadFileOnly @complete="getFileUpload" />
          </v-card>
          <div v-if="validateFile" class="pt-2 error--text">
            Please choose signature image!
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">CLOSE</v-btn>
        <v-btn color="primary" @click="upload">UPLOAD</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserSignatureInfo from "../cards/UserSignatureInfo";
import UploadFileOnly from "../inputs/UploadFileOnly";

export default {
  data() {
    return {
      file: "",
      removeFunc: "",
      validateFile: false
    };
  },
  props: {
    isShow: Boolean,
    itemEdit: Object
  },
  components: {
    UserSignatureInfo,
    UploadFileOnly
  },
  methods: {
    cancel() {
      if (this.removeFunc) {
        this.removeFunc();
      }
      this.file = "";
      this.validateFile = false;
      this.$emit("closeModal");
    },
    upload() {
      if (this.file) {
        this.validateFile = false;
        this.cancel();
      } else {
        this.validateFile = true;
      }
    },
    getFileUpload(data) {
      const { file, remove } = data;
      this.file = file;
      this.removeFunc = remove;
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
