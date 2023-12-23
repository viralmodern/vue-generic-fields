<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>
      + Add New
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" @submit.prevent id="check-login-form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="2" class="pa-0 pr-2">
            <v-text-field
              v-model="entry_name"
              autofocus
              class="custom ma-0 pa-0"
              placeholder="Entry Name"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2 mt-2">
            <v-btn
              type="submit"
              form="check-login-form"
              small
              class="primary mx-1"
              @click="add"
              :loading="isLoadingAdd"
              >Add</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon
  },
  props: {
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valid: false,
      entry_name: "",
      confidentiality: "",
      privilege_justification: [],
      responsive: "",
      document_labels: [],
      issues: [],
      reviewers: [],
      review_status: "",
      tags: [],
      redaction: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            entry_name: this.entry_name,
            confidentiality: this.confidentiality,
            privilege_justification: this.privilege_justification,
            responsive: this.responsive,
            document_labels: this.document_labels,
            issues: this.issues,
            reviewers: this.reviewers,
            review_status: this.review_status,
            tags: this.tags,
            redaction: this.redaction,
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addPrivilegeRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.entry_name = "";
      this.confidentiality = "";
      this.privilege_justification = [];
      this.responsive = "";
      this.document_labels = [];
      this.issues = [];
      this.reviewers = [];
      this.review_status = "";
      this.tags = [];
      this.redaction ="";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/privilege", ["addPrivilegeRequest"])
  },
  watch: {
    groupBy(val, oldVal) {
      if (val.field !== oldVal.field) {
        this.isShowAdd = false;
      }
    },
    isShowAdd(open) {
      if (open) {
        if (this.groupBy.field !== "all") {
          if (Array.isArray(this[this.groupBy.field])) {
            this[this.groupBy.field] = [this.groupBy.value];
          } else {
            this[this.groupBy.field] = this.groupBy.value;
          }
        }
      } else {
        this.clearForm();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.custom {
  /deep/ .v-text-field__slot {
    font-size: 13px;
    width: 100px;
  }
}
</style>
