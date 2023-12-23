<template>
  <div class="pa-2">
    <v-dialog v-model="dialog" width="650" persistent>
      <template v-slot:activator="{ on }">
        <v-btn fab color="primary" v-on="on" @click="isShowModelCreate = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create item index
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            label="Name"
            v-model="name"
            append-icon="person_outline"
          ></v-text-field>

          <div class="pa-1">
            <v-select
              :items="typeIndex"
              :rules="[v => !!v || 'This field is required']"
              label="Type"
              item-text="name"
              item-value="id"
              return-object
              @change="changeType"
            ></v-select>
          </div>

          <div>
            <span>Tags</span>
            <ProjectLabels
              :labels="newTags"
              :listLabels="tags"
              keyText="name"
              keyColor="color"
              title="List Tags"
              nameAdd="Add new Tag"
              @addLabel="addTags"
              @updateLabel="updateTagsRequest"
              @removeLabel="removeTagsRequest"
              @choseLabel="choseTags"
            />
          </div>

          <div class="mt-2">
            <span>Upload Files:</span>
            <UploadFileSingle
              :dataFileSingle="dataFileSingle"
              @addFilesAttachment="uploadFiles"
              @removeAttachment="deleteFile"
            />
          </div>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createItem">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UploadFileSingle from "../cards/UploadFileSingle";
import ProjectLabels from "../cards/ProjectLabels";
import { typeIndex } from "../../config";
import moment from "moment";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ProjectLabels,
    UploadFileSingle
  },
  data() {
    return {
      dialog: false,
      valid: false,
      name: "",
      newTags: [],
      providedBy: null,
      typeIndex,
      isShow: false,
      dataFileSingle: null
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index", ["createItemIndex"]),
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    changeType(value) {
      this.type = value.id;
    },
    createItem() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          creator: 1,
          providedBy: 1,
          authoredBy: [],
          addedDate: moment(new Date()).format("YYYY-MM-DD"),
          favorable: 1,
          tags: this.newTags.map(x => x.id),
          linkedRecord: [],
          type: this.type,
          attachment: [],
          files: this.dataFileSingle
        };
        this.dialog = false;
        this.createItemIndex(data);
        this.newTags = [];
        this.$refs.form.reset();
      }
    },
    choseTags(value) {
      var elementExists = this.newTags.some(x => x.id === value.id);
      if (elementExists) {
        this.newTags = this.newTags.filter(x => x.id !== value.id);
      } else {
        this.newTags = [...this.newTags, value];
      }
    },
    cancel() {
      this.isShowAddLabel = false;
    },
    uploadFiles(files) {
      const data = {
        id: Math.random(),
        coverPhoto: {
          imageUrl: files[0].dataURL
        },
        rate: false,
        name: files[0].name,
        createAt: new Date().toISOString()
      };
      this.dataFileSingle = data;
    },
    deleteFile(id) {
      return id;
    },
    addTags(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addTagsRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"])
  },
  mounted() {
    this.getDataTagsRequest();
  }
};
</script>
