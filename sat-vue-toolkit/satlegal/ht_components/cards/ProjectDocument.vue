<template>
  <div>
    <div class="px-2 pb-3">
      <v-btn color="primary" small @click="isShow = true">
        Upload document
        <v-icon>mdi-attachment</v-icon>
      </v-btn>
    </div>
      <!-- <v-col v-for="item in convertAttachment" :key="item.id" cols="3"> -->
        <!-- <AttachmentRow
          :imageUrl="item.coverPhoto && item.coverPhoto.imageUrl"
          :name="item.name"
          :createAt="item.createAt"
          :rate="item.rate"
          :link="item.file"
          @removeAttachment="$emit('removeAttachment', item.id)"
          @updateAttachment="$emit('updateAttachment', item.id)"
        /> -->
      <!-- </v-col> -->
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
      <TableGrid
        v-if="convertAttachment || convertAttachment.length != 0"
        hide-default-header
        hide-default-footer
        :fixedHeader="false"
        :headers="headersFilter"
        :desserts="convertAttachment"
        :loading="isLoadingGet"
      >
        <template v-slot:item.file_name="{ props: { item } }">
          <TextField
            :value="item.file_name"
            @update="updateDraftsPrepared(item.id, 'file_name', $event)"
          />
        </template>
        <template v-slot:item.description="{ props: { item } }">
          <TextArea
            :value="item.description"
            @update="updateDraftsPrepared(item.id, 'description', $event)"
          />
        </template>
        <template v-slot:item.document_type="{ props: { item } }">
          <SelectCheckBox
            title="Docket Document Type"
            :value="item.document_type"
            :dataList="appConfigs.docketDocument"
            @update="updateDocket(item.pk, 'document_type', $event.id)"
          />
        </template>
        <template v-slot:item.action="{ props: { item } }">
          <div class="d-flex">
            <Action @remove="removeDraftsPrepared(item.id, $event)" />
          </div>
        </template>
      </TableGrid>
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
import { mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import UploadFile from "../dialogs/UploadFile";

// cell
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";

export default {
  components: {
    TableGrid,
    UploadFile,
    SelectCheckBox,
    TextField,
    TextArea,
    Action
  },
  props: {
    dataDocuments: Array,
    addLink: Boolean,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      headers: [
        { text: "File Name", value: "file_name", active: true },
        { text: "File Upload", value: "file", active: true },
        { text: "Description", value: "description", active: true },
        { text: "Type", value: "document_type", active: true },
        { text: "Action", value: "action", active: true }
      ],
      isShow: false,
      url: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    convertAttachment() {
      return (this.dataDocuments || []).map(x => {
        return {
          ...x,
          id: x.pk,
          file_name: x.file_name,
          file: x.file.split("/").pop(),
          description: x.description,
          document_type: x.document_type,
          rate: true,
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
