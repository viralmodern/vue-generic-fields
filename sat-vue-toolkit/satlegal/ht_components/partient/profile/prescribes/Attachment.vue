<template>
  <div style="width: 220px;">
    <img
      class="thumbnail"
      :src="attachment || 'http://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'"
    >
    <div class="my-1 center">
      <v-btn color="secondary" small @click="removeAttachment">
        <span>REMOVE ATTACHMENT</span>
      </v-btn>
    </div>
    <div>
      <InputFile
        class="center"
        small
        color="primary"
        text="UPLOAD ATTACHMENT"
        @change="$emit('update', $event.fileReader.result)"
      />
    </div>
  </div>
</template>

<script>
import InputFile from "../../../inputs/InputFile";

export default {
  components: {
    InputFile
  },
  props: {
    attachment: String
  },
  methods: {
    removeAttachment() {
      if (this.attachment) {
        this.$emit("update", null);
      }
    }
  }
};
</script>

<style scoped>
.thumbnail {
  width: 100%;
  border-radius: 10px;
  box-shadow: 3px 0px 10px -2px;
}
.center {
  text-align: center;
}
</style>

