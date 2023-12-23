<template>
  <div class="pa-2">
    <v-dialog persistent v-model="dialog" width="650" @change="cancel">
      <template v-slot:activator="{ on }">
        <v-btn v-if="!!btnBlock" block color="primary" v-on="on">
          <v-icon class="mr-2">add</v-icon>
          <span>Add Clause Category</span>
        </v-btn>
        <v-btn v-else icon color="primary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create clause
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            label="Clause"
            v-model="clauseName"
            append-icon="event_note"
          ></v-text-field>

          <div class="pa-1">
            <v-select
              :items="dataCategory"
              :rules="[v => !!v || 'This field is required']"
              label="Select category"
              item-text="name"
              item-value="id"
              return-object
              @change="changeCategory"
            ></v-select>
          </div>

          <div>
            <v-row row justify-center align-center>
              <span class="text-body-1 mr-3">Status:</span>
              <v-switch
                color="primary"
                v-model="status"
                :label="status === true ? 'Public Use' : 'Private Use'"
              ></v-switch>
            </v-row>
          </div>

          <div>
            <span>Labels</span>
            <ProjectLabels
              :labels="newLabel"
              :listLabels="tags"
              keyText="name"
              keyColor="color"
              title="Label"
              nameAdd="Add new label"
              @addLabel="addTags"
              @updateLabel="updateTagsRequest"
              @removeLabel="removeTagsRequest"
              @choseLabel="choseTags"
            />
          </div>

          <v-textarea
            v-model="desc"
            label="Short description..."
            rows="3"
          ></v-textarea>

          <NotebookEditor
            placeholder="Type your note here..."
            :item="notes"
            @change="changeNotes"
          />
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="createCategory"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import ProjectLabels from "../cards/ProjectLabels";
export default {
  components: {
    NotebookEditor,
    ProjectLabels
  },
  props: {
    btnBlock: Boolean
  },
  data() {
    return {
      dialog: false,
      valid: false,
      clauseName: "",
      desc: "",
      status: false,
      notes: "",
      newLabel: [],
      category: null
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/category", ["dataCategory"]), // eslint-disable-line
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/member", ["members"]) // eslint-disable-line
  },
  methods: {
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]), // eslint-disable-line
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [ // eslint-disable-line
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    changeCategory(value) {
      this.category = value.id;
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    changeNotes(value) {
      this.notes = value;
    },
    addTags(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addTagsRequest(data);
    },
    choseTags(value) {
      var elementExists = this.newLabel.some(x => x.id === value.id);
      if (elementExists) {
        this.newLabel = this.newLabel.filter(x => x.id !== value.id);
      } else {
        this.newLabel = [...this.newLabel, value];
      }
    },
    createCategory() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          notes: this.notes,
          clauseName: this.clauseName,
          creator: this.members.find(x => x.id === 1),
          desc: this.desc,
          category: this.category,
          tags: this.newLabel.map(x => {
            return { ...x, text: x.name };
          }),
          status: this.status
        };
        this.$emit("createCategoryUser", data);
        this.dialog = false;
        this.$refs.form.reset();
      }
    }
  },
  mounted() {
    this.getDataMemberRequest();
  }
};
</script>
