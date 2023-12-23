<template>
  <div style="max-width: 250px;">
    <p v-if="showLabel" class="mb-2">{{ label }}</p>
    <div v-if="uploadLink" class="new-tag mb-2">
      <v-text-field
        v-model="searchText"
        ref="emailInvite"
        label="Paste a link"
        outlined
        required
        hide-details
        dense
        :error="errorInvite"
        :loading="addNewLoading"
        type="text"
      ></v-text-field>
    </div>
    <vue-dropzone
      class="dz-upload-file"
      @vdropzone-complete="vdropzoneSuccessMultiple"
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
    ></vue-dropzone>
  </div>
</template>

<script>
// import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'AttachmentFileUpload',
  data() {
    return {
      searchText: '',
      addNewLoading: false,
      errorInvite: false,
      list: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        // thumbnailWidth: 100,
        // thumbnailHeight: 100,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: { 'My-Awesome-Header': 'header value' },
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> Drag file here",
        acceptedFiles: this.acceptedFiles,
        maxFiles: this.maxFiles
      }
    }
  },
  components: {
    // vueDropzone: vue2Dropzone,
      vueDropzone: () =>
          process.client ? import('vue2-dropzone') : Promise.resolve({ render: (h) => h('div') }),
  },
  props: {
    value: {},
    showLabel: {
      type: Boolean,
      default: () => true
    },
    label: {
      type: String,
      default: () => 'Attachment'
    },
    uploadLink: {
      type: Boolean,
      default: () => true
    },
    acceptedFiles: {
      type: [String, Array],
      default: () => ''
    },
    maxFiles: {
      default: () => null
    }
  },
  computed: {},
  methods: {
    vdropzoneSuccessMultiple(file) {
      this.list.push(file)
    }
  },
  watch: {
    list: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.task-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .task-name {
    flex: auto;
  }

  .task-actions {
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.custom-control {
  .icon-wrapper {
    width: 40px;
    display: inline-block;
    text-align: center;
  }

  .high i {
    color: #f5365c;
  }

  .medium i {
    color: #ffbb33;
  }

  .low i {
    color: #5e72e4;
  }

  .none i {
    color: #37474f;
  }
}

.task-desc {
  p.add-link {
    font-size: 15px;
    text-decoration: underline;
    font-weight: 500;
    display: inline;
    cursor: pointer;
  }
}

// #tabs-icons-text-3 {
//   .card-body {
//     padding: 1.7rem;
//   }
// }
ul.tags-wrapper {
  padding-left: 0;

  li.tag-item.mark {
    cursor: pointer;
  }

  li.tag-item {
    .custom-control-label {
      vertical-align: baseline;
    }

    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 30px;
    position: relative;
    padding-left: 29px;
    cursor: default;

    &:hover {
      .color-option-icon {
        display: block;
      }
    }

    .color-option-icon {
      position: absolute;
      left: 0px;
      width: 15px;
      display: none;
      cursor: pointer;
      text-align: right;
    }

    .tag-icon {
      margin-right: 10px;
    }

    .tag-name {
      flex: 1;
      overflow: hidden;

      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 40px;
        white-space: nowrap;
        margin-right: 35px;
      }
    }

    .action {
      .custom-checkbox {
        padding: 0;
        margin: 0;

        .custom-control-label::before,
        .custom-control-label::after {
          top: -10px;
        }

        span {
          display: none;
        }
      }
    }
  }
}

.group-color-dialog {
  position: relative;
  padding: 5px;
  line-height: 0px;
  max-width: 200px;
  background: #ffffff;

  .group-color-item {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    transition: opacity 0.1s ease;
    margin: 3px;
  }
}

.dropdown-header-tags {
  color: #7a797e;
  font-size: 14px;
  text-transform: none;
  font-weight: 600;
}
</style>
<style scoped>
.dz-upload-file /deep/ .dz-details {
  display: block;
}

.dz-upload-file /deep/ .dz-remove {
  bottom: 10px !important;
  margin: 0;
  border: solid 2px #fff;
  color: #fff;
  width: 75%;
  left: 10px;
  text-transform: capitalize;
  padding: 5px !important;
}

.dz-upload-file /deep/ .dz-preview {
  margin: 5px !important;
  /*border: solid 1px red;*/
  border-bottom: solid 1px #cccccc;
  width: 100%;
  height: 0px;
  overflow: hidden;
}
</style>
