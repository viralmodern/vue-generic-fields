<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="500"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row class="pa-2" no-gutters>
            <v-col cols="12">
              <DateMonthPicker
                label="Date"
                :value="date"
                @change="date = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Received item"
                auto-grow
                v-model="received_item"
                :rules="[v => !!v || 'This field is required']"
                rows="1"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description"
                auto-grow
                v-model="description"
                rows="1"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Labels :</div>
              <div>
                <MenuListTags
                  :tag="label"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List Labels"
                  nameAdd="Add new Labels"
                  @add="addLabelsRequest"
                  @update="updateLabelsRequest"
                  @remove="removeLabelsRequest"
                  @chose="label = $event"
                />
              </div>
            </v-col>
            <v-col cols="12" class="my-2">
              <div class="text--secondary text-subtitle-1">Upload Files</div>
              <div>
                <UploadFileSingle
                  type="thumbnail"
                  :isAvatarCenter="false"
                  :imageUrl="attachment.dataImg"
                  :name="attachment.name"
                  textButtonRemove="remove"
                  textButtonAdd="choose file"
                  @remove="attachment = {}"
                  @change="addAttachment"
                />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add" :loading="isLoadingAdd">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MenuListTags from "../menus/MenuListTags";
import DateMonthPicker from "../menus/DateMonthPicker";
import UploadFileSingle from "../inputs/UploadFileSingle";

export default {
  components: {
    DateMonthPicker,
    MenuListTags,
    UploadFileSingle
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    isLoadingAdd: Boolean,
    stageAdd: Object,
  },
  data() {
    return {
      valid: false,
      date: "",
      received_item: "",
      description: "",
      label: [],
      attachment: {}
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/labels", ["dataLabels"]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
  },
  methods: {
    addAttachment(file) {
      this.attachment = {
        dataImg: file.fileReader.result,
        name: file.file.name,
        file: file.file
      };
    },
    closeDialog() {
      this.$emit("closeModal");
    },
    ...mapActions("ht_store/matter/labels", [
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ]),
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          labels: this.label,
          date: this.date,
          description: this.description,
          received_item: this.received_item,
          attachments: this.attachment.file
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.label = [];
      this.date = "";
      this.description = "";
      this.received_item = "";
      this.attachment = {};
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    isShowPopup(isOpen) {
      if (this.stageAdd.field !== "all") {
        if (isOpen) {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [this.stageAdd.value];
          } else {
            this[this.stageAdd.field] = this.stageAdd.value;
          }
        } else {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [];
          } else {
            this[this.stageAdd.field] = "";
          }
          this.$refs.form.resetValidation();
        }
      }
    }
  }
};
</script>
