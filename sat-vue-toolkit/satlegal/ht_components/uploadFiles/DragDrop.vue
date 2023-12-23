

<template>
  <v-row no-gutters>
    <div id="file-drag-drop" class="div-upload-files">
      <form ref="fileform" class="form-upload">
        <div class="div-container" :style="divDragDrop">
          <label class="file-select">
            <div class="select-button">
              <span>Select Documents To Upload</span>
            </div>
            <input type="file" @change="handleFileChange" :multiple="multiple" :accept="accept" />
          </label>
          <span class="mt-1 text-body-2 error--text">Or Drag the deposition transcript here.</span>
          <div>{{accept}}</div>
        </div>
      </form>

      <v-alert style="width: 98%" v-if="alert === true" :value="alert" type="error">
        <div v-html="notify"></div>
        <div>Supported file types are: {{accept}}</div>
      </v-alert>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    multiple: Boolean,
    accept: String,
    regExpFiles: RegExp
  },
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      notify: "",
      alert: false,
      divDragDrop: "border: 1px dashed #8f929e;"
    };
  },

  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if (this.dragAndDropCapable) {
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
      ].forEach(evt => {
        this.$refs.fileform.addEventListener(
          evt,
          e => {
            e.preventDefault();
            e.stopPropagation();
          },
          false
        );
      });
      this.$refs.fileform.addEventListener("drop", e => {
        if (e.dataTransfer.files.length > 1) {
          this.alert = true;
          this.notify = "Limit the number of upload files to 1 file";
        } else {
          if (this.regExpFiles.test(e.dataTransfer.files[0].name) === false) {
            this.notify =
              `.<b>${e.dataTransfer.files[0].name
                .split(".")
                .slice(-1)
                .pop()}</b>` + "  documents are not supported. ";
            this.alert = true;
          } else {
            this.submitFiles(e.dataTransfer.files[0]);
            this.alert = false;
          }
        }
        this.divDragDrop = "border: 1px dashed #8f929e;";
      });
      this.$refs.fileform.addEventListener("dragover", () => {
        this.divDragDrop = "border: 2px dashed red;";
      });
      this.$refs.fileform.addEventListener("dragleave", () => {
        this.divDragDrop = "border: 1px dashed #8f929e;";
      });
    }
  },

  methods: {
    handleFileChange(e) {
      this.submitFiles(e.target.files[0]);
      this.alert = false;
    },
    determineDragAndDropCapable() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },

    submitFiles(singleFiles) {
      let formData = new FormData();
      formData.append("transcript", singleFiles);
      this.$emit("uploadFiles", formData);
    }
  }
};
</script>
<style>
.div-upload-files {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.div-container {
  margin: 10px;
  text-align: center;
  padding: 36px 0 24px;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.form-upload {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.file-select > .select-button {
  padding: 0.8rem;
  cursor: pointer;
  color: white;
  background-color: #6d42c7 !important;
  border-color: #6d42c7 !important;
  border-radius: 0.3rem;
  text-align: center;
  font-weight: bold;
}

.name-file {
  justify-content: space-between;
  flex-direction: row;
  display: flex;
}

.file-select > input[type="file"] {
  display: none;
}

div.file-listing {
  width: 80%;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 50px;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

a.submit-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #ccc;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}

progress {
  width: 400px;
  margin: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
