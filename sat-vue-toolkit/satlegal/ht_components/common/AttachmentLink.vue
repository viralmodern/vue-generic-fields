<template>
  <div>
    <a
      :style="!isStyle ? 'white-space: nowrap;' : ''"
      :href="attachment"
      target="_blank"
    >{{getNameAttachment}}</a>
    <p v-if="!getNameAttachment">(No Attachment)</p>
    <InputFile
      class="my-1"
      :isShowActionRemove="!!attachment"
      :x-small="!!attachment"
      :small="!attachment"
      color="primary"
      :icon="attachment ? 'edit' : 'cloud_upload'"
      accept="file_extension|image/*"
      :text="attachment ? 'update' : 'upload'"
      @change="updateAttachment"
      @onRemove="removeAttachment"
      :isLoading="isLoading"
      :isLoadingRemove="isLoadingRemove"
      v-if="!isReadOnly"
    />
  </div>
</template>

<script>
import InputFile from "../inputs/InputFile";

export default {
  components: {
    InputFile
  },
  props: {
    attachment: String,
    isReadOnly: Boolean,
    isStyle: Boolean
  },
  data() {
    return {
      isLoading: false,
      isLoadingRemove: false
    };
  },
  computed: {
    getNameAttachment() {
      const array = (this.attachment || "").split("/");
      const name = array[array.length - 1];
      return name;
    }
  },
  methods: {
    updateAttachment(data) {
      this.$emit("update", {
        value: data.file,
        setLoading: this.setLoading
      });
    },
    removeAttachment() {
      this.$emit("update", {
        value: "",
        setLoading: this.setLoadingRemove
      });
    },
    setLoading(status) {
      this.isLoading = status;
    },
    setLoadingRemove(status) {
      this.isLoadingRemove = status;
    }
  }
};
</script>
