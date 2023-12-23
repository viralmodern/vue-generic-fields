<template>
  <v-card>
    <v-row no-gutters class="pa-2">
      <v-col cols="12" class="pa-2">
        <v-row no-gutters>
          <v-col sm="3">
            <v-select
              :value="taskDetail.statusWork"
              :items="itemsWorks"
              label="Status Work"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              @change="changeStatusWork"
            ></v-select>
          </v-col>
          <v-col sm="3">
            <v-select
              :value="taskDetail.compelete"
              :items="itemsCompelete"
              label="Completion schedule"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              @change="changeCompelete"
            ></v-select>
          </v-col>
          <v-col sm="3">
            <v-select
              :value="taskDetail.feature"
              :items="itemsFeature"
              label="Feature"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              @change="changeFeature"
            ></v-select>
          </v-col>
          <v-col sm="3">
            <v-text-field
              ref="inputField"
              mask="####"
              :value="taskDetail.estimate"
              class="pa-1"
              label="Estimate"
              @input="changeEtimate"
            >
              <template slot="append">hr(s)</template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-2">
        <v-row no-gutters v-if="Object.keys(taskDetail).length">
          <div class="mr-2">
            <ProjectAvatar
              :sizeImage="50"
              :imageUrl="taskDetail.projectDetail.avatar"
            />
          </div>
          <v-col>
            <v-row no-gutters class="align-center">
              <router-link
                :to="`project/${taskDetail.projectDetail.id}`"
                class="caption"
                >{{ taskDetail.projectDetail.name }}</router-link
              >
              <span class="px-2">/</span>
              <router-link to class="caption">{{
                taskDetail.code
              }}</router-link>
            </v-row>
            <v-col cols="12">
              <v-text-field
                :value="taskDetail.title"
                :rules="[v => !!v || 'Title is required']"
                label="Title"
                required
                class="mr-1"
                @input="editTitle"
              ></v-text-field>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-2">
        <NotebookEditor
          placeholder="Type your note here..."
          :item="taskDetail.description"
          @change="changeDescription"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ProjectAvatar from "../avatars/ProjectAvatar";
import NotebookEditor from "../editor/NotebookEditor";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    NotebookEditor,
    ProjectAvatar
  },
  methods: {
    editTitle(val) {
      this.editTitle(val);
    },
    changeDescription(val) {
      this.editDescription(val);
    },
    ...mapActions("ht_store/task/detail/description", [
      "getListsFeatureRequest",
      "getListCompeleteRequest",
      "getListsWorksRequest"
    ]),
    changeEtimate(e) {
      this.changeEstimate(e);
    },
    changeFeature(e) {
      this.changeFeature(e);
    },
    changeCompelete(e) {
      this.changeCompelete(e);
    },
    changeStatusWork(e) {
      this.changeStatusWork(e);
    },
    ...mapMutations("ht_store/task/detail/description", [
      "changeEstimate",
      "changeFeature",
      "changeCompelete",
      "changeStatusWork",
      "editTitle",
      "editDescription"
    ])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", [
      "taskDetail",
      "itemsCompelete",
      "itemsFeature",
      "itemsWorks"
    ])
  },
  mounted() {
    this.getListsFeatureRequest();
    this.getListCompeleteRequest();
    this.getListsWorksRequest();
  }
};
</script>
