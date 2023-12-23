<template>
  <v-dialog :value="isShow" @input="cancel" width="700">
    <v-form ref="form">
      <v-card>
        <v-card-title class="text-h5 lighten-2" primary-title
          >ADD REFERENCE</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-col cols="12">
            <v-combobox
              v-model="referenceDocument"
              label="Reference document"
              hint="Select document"
              :items="items"
              :rules="[v => !!v || 'Please select a document']"
            ></v-combobox>
          </v-col>

          <v-col cols="12" class="mt-1">
            <v-btn
              outlined
              color="primary"
              class="white--text mb-2"
              @change="uploadFile"
            >
              <label>
                Upload supporting document
                <input type="file" style="display: none;" />
                <v-icon right dark>cloud_upload</v-icon>
              </label>
            </v-btn>
            <span>{{ nameFile }}</span>
          </v-col>

          <v-row no-gutters>
            <v-col cols="6">
              <v-text-field
                v-model="urlName"
                :rules="[v => !!v || 'Url name is required']"
                label="Url name"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="ml-2">
              <v-text-field
                v-model="url"
                :rules="rulesForUrl"
                label="Url"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShow: Boolean,
    dataDocument: Array
  },
  data() {
    return {
      urlName: "",
      url: "",
      referenceDocument: null,
      nameFile: "",
      rulesForUrl: [
        v => !!v || "Url is required",
        v => {
          // eslint-disable-next-line
          const r = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
          if (!r.test(v)) {
            return "Url is invalid";
          }
          return true;
        }
      ]
    };
  },
  methods: {
    receiveChangeSelect(object) {
      return object;
    },
    add() {
      const data = {
        urlName: this.urlName,
        url: this.url,
        referenceDocument: this.referenceDocument,
        nameFile: this.nameFile
      };
      if (this.$refs.form.validate()) {
        this.$emit("emitAddReference", data);
        this.$emit("closeDialog");
        this.$refs.form.reset();
      }
    },
    cancel() {
      this.$emit("closeDialog");
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    uploadFile(e) {
      this.nameFile = e.target.files[0].name;
    }
  },
  computed: {
    items() {
      return this.dataDocument.map(v => v.urlName);
    }
  }
};
</script>
