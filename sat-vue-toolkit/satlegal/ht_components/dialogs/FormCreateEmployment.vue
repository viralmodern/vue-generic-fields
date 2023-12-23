<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="450"
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
                v-model="title"
                label="Title"
                append-icon="person_outline"
                :rules="[v => !!v || 'This field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="From"
                v-model="from_year"
                :items="listYears"
                menu-props="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="to"
                v-model="to_year"
                :items="listYears"
                menu-props="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="role"
                label="Role"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="case_name"
                label="Case name"
                auto-grow
                rows="1"
                append-icon="description"
                :rules="[v => !!v || 'This field is required']"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <SelectChip
                :items="appConfigs.factType"
                label="Testimony side"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="testimony"
                @change="testimony = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="12">
              <SelectChip
                :items="appConfigs.factType"
                label="Who win?"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="who_win"
                @change="who_win = $event"
                :rules="[v => !!v || 'This field is required']"
              />
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
import SelectChip from "../inputs/SelectChip";
import { mapGetters } from "vuex";
import UploadFileSingle from "../inputs/UploadFileSingle";

export default {
  props: {
    isShowPopup: Boolean,
    header: String,
    isLoadingAdd: Boolean,
  },
  components: {
    SelectChip,
    UploadFileSingle,
  },
  data() {
    return {
      valid: false,
      title: "",
      testimony: "",
      from_year: new Date().getFullYear(),
      to_year: new Date().getFullYear(),
      who_win: "",
      role: "",
      case_name: "",
      listYears: [],
      attachment: {},
    };
  },
  created() {
    let year = 1920;
    [...new Array(200)].forEach(() => this.listYears.push(year++));
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
          title: this.title,
          testimony: this.testimony,
          from_year: this.from_year,
          to_year: this.to_year,
          who_win: this.who_win,
          role: this.role,
          case_name: this.case_name,
          attachment: this.attachment.file,
        };
        console.log("data", data);
        this.$emit("submit", data);
      }
    },
    clear() {
      this.title = "";
      this.testimony = "";
      this.who_win = "";
      this.from_year = "";
      this.to_year = "";
      this.role = "";
      this.case_name = "";
      this.attachment = {};
      this.$refs.form.resetValidation();
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
};
</script>
