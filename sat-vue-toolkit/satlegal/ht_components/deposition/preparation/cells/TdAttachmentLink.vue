<template>
  <td>
    <a style="white-space: nowrap;" :href="dataRow[column.name]" target="_blank">{{
      getNameAttachment
    }}</a>
    <InputFile
      class="my-1"
      :isShowActionRemove="!!dataRow[column.name]"
      :x-small="!!dataRow[column.name]"
      :small="!dataRow[column.name]"
      color="primary"
      :icon="dataRow[column.name] ? 'edit' : 'cloud_upload'"
      accept="file_extension|image/*"
      :text="dataRow[column.name] ? 'update' : 'upload'"
      @change="updateAttachment"
      @onRemove="removeAttachment"
      :isLoading="isLoading"
      :isLoadingRemove="isLoadingRemove"
    />
  </td>
</template>

<script>
import InputFile from "../../../inputs/InputFile";

export default {
  components: {
    InputFile
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isLoading: false,
      isLoadingRemove: false,
    };
  },
  computed: {
    getNameAttachment() {
      const array = (this.dataRow[this.column.name] || "").split("/");
      const name = array[array.length - 1];
      return name;
    }
  },
  methods: {
    updateAttachment(data) {
      this.$emit("updateAsync", {value: data.file, setLoading: this.setLoading});
    },
    removeAttachment() {
      this.$emit("updateAsync", {value: "", setLoading: this.setLoadingRemove});
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
