<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    class="custom"
    :options="dropzoneOptions"
    @vdropzone-file-added="onAddFile"
    @vdropzone-error="onErrorUploadFile"
    @vdropzone-removed-file="onRemoveFile"
  />
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    maxFilesize: {
      type: Number,
      default: () => 10,
    },
  },
  computed: {
    dropzoneOptions() {
      return {
        url: "https://httpbin.org/post",
        maxFilesize: this.maxFilesize,
        autoProcessQueue: false,
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i aria-hidden='true' class='v-icon material-icons theme--light' style='font-size: 60px' >cloud_upload</i><div>UPLOAD FILE</div>"
      }
    }
  },
  methods: {
    removeAllFiles() {
      this.$refs.myVueDropzone.removeAllFiles();
    },
    onRemoveFile(file) {
      this.$emit("onRemoveFile", file);
    },
    onAddFile(file) {
      const data = { file, remove: this.removeAllFiles };
      this.$emit("onAddFile", data);
    },
    onErrorUploadFile(file, message) {
      this.$refs.myVueDropzone.removeFile(file);
      alert(message);
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
.custom /deep/ .dz-progress {
  display: none !important;
}
</style>
