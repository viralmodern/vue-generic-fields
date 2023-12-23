<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" persistent width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-4 py-2">
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <SelectMultipleUser
              label="Members"
              :user="members"
              :users="dataMembers"
              @change="members = $event"
              item-value="id"
              itemText="avatar.name"
              itemImg="avatar.imageUrl"
              multiple
            />
          </v-col>
          <v-col cols="12">
            <SelectChip
              :items="types"
              label="Type"
              item-text="name"
              item-value="value"
              item-color="color"
              :value="type"
              @change="type = $event"
              :rules="[v => !!v || 'This field is required']"
            />
          </v-col>
          <v-col cols="12">
            <v-radio-group v-model="template" row>
              <v-radio label="General Template" :value="false"></v-radio>
              <v-radio label="Rule 30(b)(6) Template" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" class="my-2">
            <div class="text--secondary subheading">Description:</div>
            <NotebookEditor
              ref="description"
              placeholder="Type your description..."
              @change="description = $event"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="py-3">
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add" :loading="isLoadingAdd">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import NotebookEditor from "../editor/NotebookEditor";
import SelectChip from "../inputs/SelectChip";

export default {
  props: {
    isShowPopup: Boolean,
    dataMembers: Array,
    header: String,
    types: Array,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: false,
      name: "",
      members: [],
      description: "",
      template: false,
      type: ""
    };
  },
  components: {
    SelectMultipleUser,
    NotebookEditor,
    SelectChip
  },
  computed: {
    ...mapGetters("ht_store/user", ["currentUser"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          members: this.members,
          description: this.description,
          template: this.template,
          type: this.type,
          createdAt: new Date().toISOString(),
          creator: this.currentUser.pk
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.name = "";
      this.members = [];
      this.description = "";
      this.template = false;
      this.type = "";
      this.$refs.description.clearContent();
      this.$refs.form.resetValidation();
    }
  }
};
</script>
