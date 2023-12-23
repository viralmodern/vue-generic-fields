<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card class="pa-1 mt-1">
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-complete="getComplete"
        />
      </v-card>
    </v-col>
    <v-col v-for="item in files" :key="item.id" class="my-2">
      <v-card class="pa-1">
        <ProjectFileUpload @deleteFile="deleteFile" :item="item" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ProjectFileUpload from "../cards/ProjectFileUpload";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i aria-hidden='true' class='v-icon material-icons theme--light' style='font-size: 60px' >cloud_upload</i><div>UPLOAD FILE</div>"
      },
      file: []
    };
  },
  props: {
    files: Array
  },
  components: {
    ProjectFileUpload,
    vueDropzone: vue2Dropzone
  },
  methods: {
    deleteFile(id) {
      this.$emit("deleteFile", id);
    },
    getComplete(val) {
      this.$refs.myVueDropzone.removeFile(val);
      this.$emit("uploadFile", val);
    }
  }
};
</script>
<style scoped>
.vue-dropzone {
  text-align: center;
}
</style>
