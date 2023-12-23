<template>
  <div>
    <div class="px-2 pb-3">
      <v-btn color="primary" small @click="isShow = true" :disabled="isDisabled">
        Upload attachment
        <v-icon>mdi-attachment</v-icon>
      </v-btn>
    </div>
    <v-row no-gutters>
      <v-col v-for="item in convertAttachment" :key="item.id" cols="3">
        <AttachmentRow
          :imageUrl="item.coverPhoto && item.coverPhoto.imageUrl"
          :name="item.name"
          :createAt="item.createAt"
          :rate="item.rate"
          :link="item.file"
          @removeAttachment="$emit('removeAttachment', item.id)"
          @updateAttachment="$emit('updateAttachment', item.id)"
          :isDisabled="isDisabled"
        />
      </v-col>
    </v-row>
    <div>
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        v-if="addLink"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="error" v-on="on">
            Add Link
            <v-icon class="ml-1">mdi-attachment</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-row no-gutters class="justify-center align-center">
              <v-col cols="10">
                <v-form ref="form">
                  <v-text-field
                    :rules="[v => !!v || 'This field is required']"
                    placeholder="link attachment"
                    class="pa-2"
                    v-model="url"
                    style="width: 100%"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="submitLink">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list>
        </v-card>
      </v-menu>
      <div class="px-2">
        <span v-if="!convertAttachment || !convertAttachment.length"
          >There is no item for display, click Add attachment button to start
          adding.</span
        >
      </div>
    </div>
    <UploadFile
      ref="refUploadFile"
      :isShow="isShow"
      :isLoadingAdd="isLoadingAdd"
      @closeModal="isShow = false"
      @addFiles="$emit('addFilesAttachment', $event)"
    />
  </div>
</template>

<script>
import AttachmentRow from "./AttachmentRow";
import UploadFile from "../dialogs/UploadFile";

export default {
  components: {
    AttachmentRow,
    UploadFile
  },
  props: {
    dataAttachment: Array,
    addLink: Boolean,
    isLoadingAdd: Boolean,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isShow: false,
      url: ""
    };
  },
  computed: {
    convertAttachment() {
      return (this.dataAttachment || []).map(x => {
        return {
          ...x,
          id: x.pk,
          name: x.attachment.split("/").pop(),
          createAt: x.created,
          rate: true,
          coverPhoto: {
            imageUrl: x.attachment
          }
        };
      });
    }
  },
  methods: {
    submitLink() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("link", this.url);
        this.$emit("submitLink", formData);
      }
    },
    clearUploadFiles() {
      this.$refs.refUploadFile.cancel();
    },
  }
};
</script>
