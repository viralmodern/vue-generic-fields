<template>
  <div>
    <div style="width: 200px">
      <ImageResponsive
        v-if="dataFileSingle !== null"
        style="border-radius: 5px;"
        :imageUrl="dataFileSingle.coverPhoto.imageUrl"
        minHeight="140"
        aspectRatio="2.75"
      />
      <v-row
        v-if="dataFileSingle !== null && !dataFileSingle.coverPhoto.imageUrl"
        style="height:140px;background:grey;border-radius: 5px;"
        class="justify-center align-center"
        no-gutters
      >
        <span class="title text--secondary">{{ dataFileSingle.name }}</span>
      </v-row>
    </div>

    <div>
      <v-btn color="primary" @click="isShow = true">Upload Files</v-btn>
    </div>
    <UploadFile
      :isShow="isShow"
      @closeModal="isShow = false"
      @addFiles="$emit('addFilesAttachment', $event)"
    />
  </div>
</template>

<script>
import ImageResponsive from "../images/ImageResponsive";
import UploadFile from "../dialogs/UploadFile";

export default {
  components: {
    UploadFile,
    ImageResponsive
  },
  props: {
    dataFileSingle: Object
  },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    checkLastDot() {
      const name = this.dataFileSingle.name
        .split(".")
        .pop()
        .toLowerCase();
      if (name === "jpeg" || name === "jpg" || name === "png") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
