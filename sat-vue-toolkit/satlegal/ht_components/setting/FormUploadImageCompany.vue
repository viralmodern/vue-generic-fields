<template>
  <v-row no-gutters class="align-center">
    <v-btn
      outlined
      color="primary"
      class="white--text mb-2"
      @change="uploadFile"
    >
      <label>
        Upload image
        <input type="file" style="display: none;" />
      </label>
      <v-icon size="20" right dark>mdi-cloud_upload</v-icon>
    </v-btn>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      nameFile: ""
    };
  },
  methods: {
    uploadFile(e) {
      this.nameFile = e.target.files[0].name;
    }
  }
};
</script>
