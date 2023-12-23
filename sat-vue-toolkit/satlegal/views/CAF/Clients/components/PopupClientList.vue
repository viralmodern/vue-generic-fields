<template>
  <div>
    <v-dialog :value="isShowPopup" @input="$emit('closePopup')" :width="width">
      <v-card>
        <v-card-text class="pa-4">
          <h3>List {{name}}</h3>
        </v-card-text>
        <v-list>
          <v-list-item-group active-class="pink--text">
            <template v-for="(item, index) in data">
              <v-list-item :key="item.pk" :style="`background-color: #${item.color}`">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.desc"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider v-if="index + 1 < data.length" :key="`divider-${index}`"></v-divider>
            </template>
            <FormCreateMatter :detail="detail" v-if="name === 'matters'" :idClient="id" class="ml-3" />
            <FormCreateMeeting :detail="detail" v-if="name === 'meetings'" :idClient="id" class="ml-3" />
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FormCreateMatter from "./FormCreateMatter";
import FormCreateMeeting from "./FormCreateMeeting";
export default {
  components: {
    FormCreateMatter,
    FormCreateMeeting
  },
  data() {
    return {
      attachmentId: 0,
      isShowUpdateFile: false
    };
  },
  props: {
    width: {
      type: Number,
      default: () => 400
    },
    id: String,
    data: Array,
    totalsPageAttachment: Number,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
    isShowPopup: Boolean,
    name: {
      type: String,
      default: () => ""
    },
    detail: Boolean
  },
  methods: {
    addFilesAttachment(files) {
      this.$emit("addFiles", { files });
    },
    clearUploadFiles() {
      this.$refs.refProjectAttachment.clearUploadFiles();
    },
    cancelUpdate() {
      this.$refs.refUploadFile.cancel();
    }
  }
};
</script>
