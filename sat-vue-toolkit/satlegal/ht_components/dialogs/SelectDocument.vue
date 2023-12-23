<template>
  <div class="pa-2">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="primary" v-on="on">Import</v-btn>
      </template>
      <v-card>
        <!-- <v-card-title class="text-h5 lighten-2" primary-title>Select document for import</v-card-title>
        <v-divider></v-divider>-->
        <v-stepper v-model="step">
          <v-stepper-header style="box-shadow: none;">
            <v-stepper-step :complete="step > 1" step="1"
              >Select document for import</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"
              >Infomation</v-stepper-step
            >
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row no-gutters class="pa-3 mt-2" v-if="dataDocument">
                <v-col v-for="item in dataDocument" :key="item.id" cols="6">
                  <DocumentCard
                    :imageUrl="item.coverPhoto && item.coverPhoto.imageUrl"
                    :name="item.name"
                    :createAt="item.createAt"
                    :rate="item.rate"
                    :link="item.link"
                    :item="item"
                    @removeAttachment="$emit('removeAttachment', item.id)"
                    @updateRateAttachment="
                      $emit('updateRateAttachment', item.id)
                    "
                    @changeStatusDocument="changeStatusDocument(item, $event)"
                    @selectMultiple="select"
                  />
                </v-col>
              </v-row>
              <v-card-actions>
                <span class="error--text">{{ errMess }}</span>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="continueStep">Continue</v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form ref="form">
                <div>
                  <v-text-field
                    :rules="[v => !!v || 'This field is required']"
                    label="Name"
                    v-model="name"
                  ></v-text-field>
                </div>
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
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="step = 1">Back</v-btn>
                <v-btn class="primary" @click="importData">Import</v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <!-- <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false" >Done</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DocumentCard from "../cards/DocumentCard";
import ProjectLabels from "../cards/ProjectLabels";

export default {
  components: {
    DocumentCard,
    ProjectLabels
  },
  data() {
    return {
      dialog: false,
      isShowPopup: false,
      step: 0,
      listDocument: [],
      errMess: "",
      newTags: [],
      name: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/document", ["dataDocument"]),
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"])
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/matter/document", ["getDataDocument", "selectMultiple"]),
    importData() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          document: this.listDocument,
          tags: this.newTags
        };
        this.dialog = false;
        this.$refs.form.reset();
        return data;
      }
    },
    changeStatusDocument(item, value) {
      const data = {
        item: item,
        value: value
      };
      if (value == "approve") {
        this.message = "Are you sure you want to approve this document?";
        this.titleConfirm = "Confirm approve";
      } else {
        this.message = "Are you sure you want to reject this document?";
        this.titleConfirm = "Confirm reject";
      }
      this.item = data;
      this.isShowPopup = true;
    },
    select(data) {
      const check = this.listDocument.some(x => x.id === data.id);
      if (check) {
        this.listDocument = this.listDocument.filter(x => x.id !== data.id);
      } else {
        this.listDocument = [...this.listDocument, data];
      }
      this.selectMultiple(data);
    },
    continueStep() {
      if (this.listDocument.length > 0) {
        this.step = 2;
        this.errMess = "";
      } else {
        this.errMess = "You have not selected any items !";
      }
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
      var elementExists = this.newTags.some(x => x.id === value.id);
      if (elementExists) {
        this.newTags = this.newTags.filter(x => x.id !== value.id);
      } else {
        this.newTags = [...this.newTags, value];
      }
    }
  },
  mounted() {
    this.getDataDocument();
    this.getDataTagsRequest();
  }
};
</script>
