<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    class="custom"
    :options="dropzoneOptions"
    @vdropzone-complete="complete"
  />
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  data() {
    return {
      dropzoneOptions: {
        acceptedFiles: ".jpg,.jpeg,.png",
        url: "https://httpbin.org/post",
        maxFiles: 1,
        maxfilesexceeded: function(file) {
          this.removeAllFiles();
          this.addFile(file);
        },
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i aria-hidden='true' class='v-icon material-icons theme--light' style='font-size: 60px' >cloud_upload</i><div>UPLOAD FILE</div>"
      }
    };
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  methods: {
    complete(file) {
      const data = { file, remove: this.removeFile };
      this.$emit("complete", data);
    },
    removeFile() {
      this.$refs.myVueDropzone.removeAllFiles();
    }
  }
};
</script>

<style scoped>
.vue-dropzone {
  text-align: center;
}
.custom /deep/ .dz-image {
  width: 100%;
  height: 100%;
}
</style>
