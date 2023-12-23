<template>
  <div style="height: 160px; width: 160px; position: relative;"
       class="mb-5 overflow-hidden">
    <!--<input type="file"
           class="filepond"
           id="filePondInput"
           name="filepond"
           accept="image/png, image/jpeg, image/gif"/>-->
    <!--<v-avatar v-if="value" size="100" class="img_uploaded">
      <img :src="value" alt=""/>
    </v-avatar>-->
    <file-pond
      name="test"
      ref="pond"
      class-name="my-pond"
      :labelIdle="labelIdle"
      :allow-multiple="allowMultiple"
      :accepted-file-types="acceptedFileTypes"
      :imagePreviewHeight="100"
      imageCropAspectRatio="1:1"
      :imageResizeTargetWidth="200"
      :imageResizeTargetHeight="200"
      stylePanelLayout="compact circle"
      styleLoadIndicatorPosition="center bottom"
      styleButtonRemoveItemPosition="center bottom"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:addfile="onAddFile"/>
  </div>
</template>

<script>
  import vueFilePond from "vue-filepond"
  import FilePondPluginFileEncode from "filepond-plugin-file-encode"
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
  import FilePondPluginImageCrop from "filepond-plugin-image-crop"
  import FilePondPluginImageResize from "filepond-plugin-image-resize"
  import FilePondPluginImageTransform from "filepond-plugin-image-transform"
  import FilePondPluginImagePreview from "filepond-plugin-image-preview"

  import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
  import "filepond/dist/filepond.min.css"

  const FilePond = vueFilePond(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImagePreview
  )

  export default {
    name: "FilePondUpload",
    comments: { FilePond },
    props: {
      value: {}
    },
    data () {
      return {
        myFiles: [],
        acceptedFileTypes1: "image/jpeg, image/png",
        acceptedFileTypes2: "*",
        acceptedFileTypes: "image/png, image/jpeg, application/vnd.ms-excel",
        allowMultiple: false
        // labelIdle: `<p class="caption ma-0">Drag & Drop your picture or <span class="filepond--label-action">Browse</span></p>`,
      }
    },
    created () {

    },
    mounted () {
    },
    computed: {
      labelIdle () {
        let val = this.value
        let pic = val ? `<img src="${val}" class="img_uploaded"/>` : ``
        let cls = val ? `caption_label has_uploaded` : `caption_label`
        return (
          `<div class="${cls}">
            ${pic}
            <p class="caption_uploaded caption ma-0">Drag & Drop your picture or <span class="filepond--label-action">Browse</span></p>
          </div>`
        )
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          if (!v) {
            try {
              this.$refs.pond.removeFiles()
            } catch (e) {

            }
          }
        }
      }
    },
    methods: {
      handleFilePondInit: function () {
        console.log("FilePond has initialized", this.$refs.pond)
        // example of instance method call on pond reference
        let src = "https://thegioidienanh.vn/stores/news_dataimages/hoangtuan/072017/03/23/0151_Canh_Lac_-_Chung_Han_Dong.jpg"
        // let f = new File(['foo', 'bar'], src)
        var file = new File(["foo", "bar"], src, {
          type: "image/jpeg"
        })
        // this.$refs.pond.addFile(file)
        this.$refs.pond.getFiles()
      },
      onAddFile (error, file) {
        console.log("onAddFile", file.file)
        this.$emit("input", file.file)
      }
    },
    async beforeDestroy () {
      try {
        console.log(this.$refs.pond)
        await this.$refs.pond.removeFiles()
        await this.$refs.pond.destroy()
      } catch (e) {
        console.log("pond_destroy", e.message)
      }
    }
  }
</script>

<style lang="scss">
  .caption_label {
    &.has_uploaded {
      .img_uploaded {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        z-index: -1;
        width: 100%;
        height: 100%;
      }
      .caption_uploaded {
        background: #f1f0ef;
        position: absolute;
        width: 100%;
        height: 60%;
        z-index: 1;
        bottom: -110%;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0px 10px;
      }
      &:hover {
        .caption_uploaded {
          transition: all 0.25s linear;
          bottom: 0%;
        }
      }
    }
  }


  .my-pond {
    .filepond--panel-root {

    }
  }

</style>
