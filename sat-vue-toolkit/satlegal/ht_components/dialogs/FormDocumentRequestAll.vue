<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" width="500" persistent>
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">
            Create document request
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              v-model="documentName"
              label="Document request name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="create"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              item-text="name"
              return-object
              v-model="showClient"
              :items="dataClient"
              label="Client name"
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-col cols="12">
              <v-select
                item-text="name"
                return-object
                v-model="approvalStatus"
                :items="dataApprovalStatus"
                label="Approval status"
                :rules="[v => !!v || 'This field is required']"
              ></v-select>
            </v-col>
            <v-select
              item-text="title"
              item-value="id"
              v-model="matter"
              :items="dataMatter"
              label="Matter name"
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-menu
              ref="isShowDueDate"
              v-model="isShowDueDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="dueDate"
                  label="Due date"
                  persistent-hint
                  v-on="on"
                  append-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dueDate"
                no-title
                @input="isShowDueDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-textarea
              name="input-7-1"
              label="Description"
              v-model="description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" v-if="!item" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { dataClientname, dataApprovalStatus } from "../../config.js";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  props: {
    isShowPopup: Boolean,
    item: Object,
    categoryClient: Number
  },
  data() {
    return {
      dataClientname,
      dataApprovalStatus,
      valid: false,
      documentName: "",
      clientName: "",
      requester: "",
      dueDate: "",
      matter: "",
      description: "",
      approvalStatus: "",
      isShowDueDate: false,
      showClient: {}
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          clientName: this.showClient.id,
          documentName: this.documentName,
          approvalStatus: this.approvalStatus,
          approvalDate: (this.approvalStatus || {}).id !== 1 ? "" : moment(),
          dueDate: this.dueDate,
          matter: this.matter,
          description: this.description
        };
        this.$emit("addDocumentRequest", data);
        (this.clientName = this.categoryClient ? this.showClient : ""),
          (this.documentName = "");
        this.approvalStatus = "";
        this.approvalDate = "";
        this.dueDate = "";
        this.matter = "";
        this.description = "";
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"])
  },
  watch: {
    categoryClient() {
      this.showClient = (this.dataClient || []).find(
        x => x.id === this.categoryClient
      );
    }
  }
};
</script>
