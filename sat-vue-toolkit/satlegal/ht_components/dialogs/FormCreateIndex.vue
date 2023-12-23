<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="550"
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
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="page"
                label="Page"
                mask="####"
                :rules="[v => !!v || 'This field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <v-textarea
                label="Comment"
                auto-grow
                v-model="comment"
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <div class="text--secondary subheading">Issues :</div>
              <div>
                <MenuListTags
                  :tag="issues"
                  :tags="dataIssues"
                  keyText="name"
                  keyColor="color"
                  title="List issues"
                  nameAdd="Add new issues"
                  @add="
                    addIssuesRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @update="
                    updateIssuesRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      ...$event
                    })
                  "
                  @remove="
                    removeIssuesRequest({
                      matterId:$route.params.matter || $route.params.projectId,
                      id: $event
                    })
                  "
                  @chose="issues = $event"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="line"
                label="Line"
                mask="####"
                :rules="[v => !!v || 'This field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <v-textarea
                label="Testimony"
                auto-grow
                v-model="testimony"
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="pl-1">
              <div class="text--secondary subheading">Subjects :</div>
              <div>
                <MenuListTags
                  :tag="subject"
                  :tags="dataSubjects"
                  keyText="name"
                  keyColor="color"
                  title="List subject"
                  nameAdd="Add new subject"
                  @add="addSubjectsRequest"
                  @update="updateSubjectsRequest"
                  @remove="removeSubjectsRequest"
                  @chose="subject = $event"
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
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      comment: "",
      line: "",
      page: "",
      subject: [],
      testimony: "",
      issues: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"]),
    ...mapGetters("ht_store/matter/issues", ["dataIssues"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    ...mapActions("ht_store/matter/subjects", [
      "addSubjectsRequest",
      "updateSubjectsRequest",
      "removeSubjectsRequest"
    ]),
    ...mapActions("ht_store/matter/issues", [
      "addIssuesRequest",
      "updateIssuesRequest",
      "removeIssuesRequest"
    ]),
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          page: this.page,
          comment: this.comment,
          subject: this.subject,
          testimony: this.testimony,
          line: this.line,
          issues: this.issues
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.label = [];
      (this.comment = ""),
        (this.subject = []),
        (this.testimony = ""),
        (this.issues = []);
    }
  }
};
</script>
