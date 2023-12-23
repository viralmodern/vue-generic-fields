<template>
  <v-dialog :value="isShow" scrollable @input="close" persistent width="500">
    <v-card>
      <div class="pa-3">
        <span class="title">{{ header }}</span>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content">
        <v-form ref="form" v-model="valid">
          <v-row no-gutters>
            <v-col cols="12">
              <SelectMultipleUser
                :rules="[v => !!v.length || 'This field is required']"
                label="To"
                :user="client"
                :users="dataClient"
                @change="client = $event"
                item-value="id"
                itemText="user.name"
                itemImg="user.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="matter"
                :items="dataMatter"
                :rules="[v => !!v.length || 'This field is required']"
                label="List Matter"
                item-text="title"
                multiple
                item-value="id"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <div>
                <v-combobox
                  v-model="tags"
                  :items="listTags"
                  :search-input.sync="search"
                  hide-selected
                  label="Tags"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          No results matching "
                          <strong>{{ search }}</strong
                          >". Press <kbd>enter</kbd> to create a new one
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </div>
            </v-col>
            <v-col>
              <v-text-field
                v-model="subject"
                label="Subject"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="12">
              <NotebookEditor
                placeholder="Type your question..."
                @change="content = $event"
                ref="editor"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import SelectMultipleUser from "../inputs/SelectMultipleUser";

export default {
  components: {
    NotebookEditor,
    SelectMultipleUser
  },
  props: {
    isShow: Boolean,
    header: String
  },
  data() {
    return {
      valid: false,
      matter: [],
      content: "",
      tags: [],
      listTags: [],
      client: "",
      subject: "",
      search: null
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    ...mapGetters("ht_store/matter", ["dataMatter"])
  },
  methods: {
    ...mapActions("ht_store/matter", ["getDataMatterRequest"]),
    close() {
      this.$emit("close");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          matter: this.matter,
          content: this.content,
          tags: this.tags,
          client: this.client,
          title: this.subject
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.$refs.editor.clearContent();
      this.matter = "";
      this.content = "";
      this.tags = "";
      this.client = "";
      this.subject = "";
    }
  },
  mounted() {
    this.getDataMatterRequest();
  }
};
</script>
