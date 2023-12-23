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
      <v-card-text id="content" class="pa-1">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <DateMonthPicker
                label="Date"
                :min="minDate"
                :value="date"
                @clear="date = ''"
                @change="date = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Description"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="question"
                label="Question"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="answer"
                label="Answer"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="my-2" v-if="stageAdd.field !== 'labels'">
              <div class="text--secondary text-subtitle-1">Labels</div>
              <div>
                <MenuListTags
                  :tag="labels"
                  :tags="dataLabels"
                  keyText="name"
                  keyColor="color"
                  title="List labels"
                  nameAdd="Add new label"
                  @add="
                    addLabelsRequest({
                      matterId: dataDepositionDetail.matter,
                      ...$event
                    })
                  "
                  @update="
                    updateLabelsRequest({
                      matterId: dataDepositionDetail.matter,
                      ...$event
                    })
                  "
                  @remove="
                    removeLabelsRequest({
                      matterId: dataDepositionDetail.matter,
                      id: $event
                    })
                  "
                  @chose="labels = $event"
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
import { mapActions, mapGetters } from "vuex";
import DateMonthPicker from "../menus/DateMonthPicker";
import MenuListTags from "../menus/MenuListTags";
import UploadFileSingle from "../inputs/UploadFileSingle";

export default {
  components: {
    DateMonthPicker,
    MenuListTags,
    UploadFileSingle,
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: false,
      name: "",
      date: "",
      description: "",
      question: "",
      answer: "",
      labels: [],
      attachment: {},
    };
  },
  computed: {
    minDate() {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toISOString();
    },
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [ // eslint-disable-line
      "dataDepositionDetail"
    ]),
    ...mapGetters("ht_store/matter/labels", [ // eslint-disable-line
      "dataLabels"
    ]),
  },
  methods: {
    addAttachment(file) {
      this.attachment = {
        dataImg: file.fileReader.result,
        name: file.file.name,
        file: file.file,
      }
    },
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          date: this.date,
          description: this.description,
          question: this.question,
          answer: this.answer,
          labels: this.labels,
          attachment: this.attachment.file,
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.name = "";
      this.date = "";
      this.description = "";
      this.question = "";
      this.answer = "";
      this.labels = [];
      this.attachment = {};
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/labels", [ // eslint-disable-line
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ])
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
