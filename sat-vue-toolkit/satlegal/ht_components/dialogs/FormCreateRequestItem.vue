<template>
  <v-dialog
    :value="isShowPopup"
    @input="closeDialog"
    scrollable
    persistent
    width="650"
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
          <v-row class="px-1 align-center" no-gutters>
            <v-col cols="12" class="px-2">
              <v-select
                v-if="isShowFieldRequestSet"
                :items="dataCAFDiscovery"
                v-model="request_set"
                label="Request set"
                item-text="name"
                item-value="pk"
                :rules="[v => !!v || 'This field is required']"
              ></v-select>
            </v-col>
            <v-col cols="12" class="px-2">
              <v-text-field
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="px-2" v-if="stageAdd.field !== 'members'">
              <SelectMultipleUser
                label="Members"
                :user="members"
                :users="dataMembers.filter(x => x.id !== currentUser.pk)"
                @change="members = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <SelectChip
                :items="appConfigs.requestType"
                label="Request type"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="request_type"
                @change="request_type = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <DateMonthPicker
                label="Deadline"
                :min="new Date().toISOString()"
                :value="deadline"
                @change="deadline = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <SelectChip
                :items="appConfigs.listPriority"
                label="Priority"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="priority"
                @change="priority = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <SelectChip
                :items="appConfigs.responseStatus"
                label="Response status"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="response_status"
                @change="response_status = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <SelectChip
                :items="appConfigs.requestStatus"
                label="Response status"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="request_status"
                @change="request_status = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="6" class="px-2">
              <SelectChip
                :items="appConfigs.responseContentType"
                label="Response content type"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="response_content"
                @change="response_content = $event"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-col>
            <v-col cols="6" class="pa-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Under Oath</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="under_oath"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="6" class="pa-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Dispute</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="dispute"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12" class="pa-2">
              <div class="text--secondary subheading">Response</div>
              <NotebookEditor
                ref="response"
                placeholder="Type your response..."
                @change="response = $event"
              />
            </v-col>
            <v-col cols="12" class="pa-2">
              <div class="text--secondary subheading">Objection</div>
              <NotebookEditor
                ref="objection"
                placeholder="Type your objection..."
                @change="objection = $event"
              />
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
import { mapActions, mapGetters } from "vuex";
import NotebookEditor from "../editor/NotebookEditor";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import SelectChip from "../inputs/SelectChip";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  components: {
    NotebookEditor,
    SelectMultipleUser,
    SelectChip,
    DateMonthPicker
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    isShowFieldRequestSet: Boolean
  },
  data() {
    return {
      valid: false,
      request_set: "",
      name: "",
      deadline: null,
      members: [],
      request_type: "",
      priority: "",
      request_status: "",
      response_status: "",
      response_content: "",
      under_oath: false,
      dispute: false,
      response: "",
      objection: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets", ["dataCAFDiscovery"]),
    ...mapGetters("ht_store/user", ["currentUser"]),
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          request_set: this.request_set,
          name: this.name,
          request_type: this.request_type,
          priority: this.priority,
          request_status: this.request_status,
          response_status: this.response_status,
          response_content: this.response_content,
          under_oath: this.under_oath,
          dispute: this.dispute,
          response: this.response,
          objection: this.objection
        };
        if (this.members.length) data.members = this.members;
        if (this.deadline) data.deadline = this.deadline;
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
        document.getElementById("content").scrollTo(0, 0);
      }
    },
    clear() {
      this.request_set = "";
      this.name = "";
      this.deadline = "";
      this.members = [];
      this.request_type = "";
      this.priority = "";
      this.request_status = "";
      this.response_status = "";
      this.response_content = "";
      this.under_oath = false;
      this.dispute = false;
      this.response = "";
      this.objection = "";
      this.$refs.response.clearContent();
      this.$refs.objection.clearContent();
    },
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
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
