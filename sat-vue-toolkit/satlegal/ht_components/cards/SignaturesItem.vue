<template>
  <div>
    <v-row class="align-center" no-gutters>
      <v-col cols="6">
        <UserSignatureInfo
          :imageUrl="avatar.imageUrl"
          :name="name"
          :role="role"
        />
      </v-col>
      <v-col cols="6" class="py-2">
        <v-row justify-end>
          <div class="thumnbnail">
            <UploadFileOnly
              class="custom"
              @complete="$emit('getFileUpload', $event)"
            />
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import UserSignatureInfo from "./UserSignatureInfo";
import UploadFileOnly from "../inputs/UploadFileOnly";

export default {
  components: {
    UserSignatureInfo,
    UploadFileOnly
  },
  props: {
    name: String,
    role: String,
    signatures: {
      imageUrl: String
    },
    avatar: {
      imageUrl: String
    }
  }
};
</script>

<style scoped>
.thumnbnail {
  width: 150px;
  height: 80px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.custom {
  border: unset !important;
  border-radius: unset !important;
  min-height: unset !important;
  padding: unset !important;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom /deep/ .dz-default {
  margin: unset !important;
}
.custom /deep/ .dz-preview {
  width: 100%;
  height: 100%;
  margin: 0px;
  min-height: unset !important;
}
.custom /deep/ .dz-image {
  width: 100%;
  height: 100%;
}

.custom /deep/ .dz-image img {
  width: 100%;
  height: 100%;
}
.custom /deep/ .dz-details .dz-size {
  display: none;
}
.custom /deep/ .dz-details .dz-filename {
  display: none;
}
.custom /deep/ .dz-preview .dz-success-mark {
  top: 20%;
}
</style>
