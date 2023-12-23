<template>
  <div>
    <a :style="!isStyle ? 'white-space: nowrap;' : ''" :href="value" target="_blank">
      {{
      getNameAttachment
      }}
    </a>
    <InputFile
      class="my-1"
      :isShowActionRemove="!!value"
      :x-small="!!value"
      :small="!value"
      color="primary"
      :icon="value ? 'edit' : 'cloud_upload'"
      accept="file_extension|image/*"
      :text="value ? 'update' : 'upload'"
      @change="updateAttachment"
      @onRemove="removeAttachment"
      :isLoading="isLoading"
      :isLoadingRemove="isLoadingRemove"
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
    value: String,
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
      const array = (this.value || "").split("/");
      const name = array[array.length - 1];
      return name;
    }
  },
  methods: {
    updateAttachment(data) {
      this.$emit("updateAsync", {
        value: data.file,
        setLoading: this.setLoading
      });
    },
    removeAttachment() {
      this.$emit("updateAsync", {
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
