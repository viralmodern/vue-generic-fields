<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="400"
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
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <v-text-field
                label="Hightlight from this Agreement"
                :rules="[v => !!v || 'This field is required']"
                v-model="hightlight"
                append-icon="border_color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-text-field
                label="Implication"
                :rules="[v => !!v || 'This field is required']"
                v-model="implication"
                append-icon="folder_open"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="text--secondary subheading">Tags :</div>
              <div>
                <MenuListTags
                  :tag="tag"
                  :tags="tags"
                  keyText="name"
                  keyColor="color"
                  title="List Tags"
                  nameAdd="Add new"
                  @add="addTagsRequest"
                  @update="updateTagsRequest"
                  @remove="removeTagsRequest"
                  @chose="tag = $event"
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
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    isShowPopup: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      hightlight: "",
      implication: "",
      tag: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/tag", ["tags"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          hightlight: this.hightlight,
          implication: this.implication,
          tags: this.tag
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.hightlight = "";
      this.implication = "";
      this.tag = [];
    },
    ...mapActions("ht_store/matter/partient/profile/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
