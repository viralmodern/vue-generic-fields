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
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="my-2" v-if="stageAdd.field !== 'author'">
              <div class="text--secondary subheading">Author</div>
              <div>
                <MenuListSource
                  :tag="author"
                  :tags="dataSource"
                  keyText="name"
                  title="List author"
                  nameAdd="Add new author"
                  @chose="author = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Year"
                v-model="year"
                :items="listYears"
                menu-props="auto"
                :rules="[v => !!v || 'This field is required']"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="bibilography"
                label="Bibilography"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
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
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import MenuListSource from "../menus/MenuListSource";

export default {
  components: {
    MenuListSource
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    appConfigs: Object,
    dataSource: Array
  },
  data() {
    return {
      valid: false,
      name: "",
      author: [],
      year: new Date().getFullYear(),
      listYears: [],
      bibilography: "",
      description: ""
    };
  },
  created() {
    let year = 1920;
    [...new Array(200)].forEach(() => this.listYears.push(year++));
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          author: this.author,
          year: this.year,
          bibilography: this.bibilography,
          description: this.description
        };
        this.$emit("submit", data);
        this.clear();
      }
    },
    clear() {
      this.name = "";
      this.author = [];
      this.year = "";
      this.bibilography = "";
      this.description = "";
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
