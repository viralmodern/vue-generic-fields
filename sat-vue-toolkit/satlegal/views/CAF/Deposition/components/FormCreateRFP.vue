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
      Add new
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="3" class="pa-0 pr-2">
            <v-text-field
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Production Request"
              autofocus
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="step_to_locate"
              class="custom ma-0 pa-0"
              placeholder="Step to locate request documents"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="4" class="pa-0 pr-2 mt-2">
            <div class="d-flex ml-2">
              <SourceDesposition class="mr-2" :value="sources" @update="sources = $event" />
              <v-btn
                small
                class="primary mx-1"
                @click="add"
                :loading="isLoadingAdd"
                >Add</v-btn
              >
            </div>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <Issue
              icon="mdi-format-list-bulleted"
              class="d-flex mx-1"
              :value="legal_issues"
              @update="legal_issues = $event"
              :isLoadingGet="isLoadingGetIssue"
              @onOpenMenu="$emit('getDataIssues')"
            />
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import SourceDesposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SourceDesposition";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";

export default {
  components: {
    AddIcon,
    SourceDesposition,
    Issue,
  },
  props: {
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    },
    isLoadingGetIssue: Boolean
  },
  data() {
    return {
      valid: false,
      name: "",
      produced: true,
      step_to_locate: "",
      availability: undefined,
      docs_characters: [],
      sources: [],
      legal_issues: [],
      objection: true,
      objection_types: [],
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
          },
          body: {
            name: this.name,
            produced: this.produced,
            step_to_locate: this.step_to_locate,
            availability: this.availability,
            docs_characters: this.docs_characters,
            sources: this.sources,
            legal_issues: this.legal_issues,
            objection: this.objection,
            objection_types: this.objection_types,
          }
        };
        if (this.groupBy.field === "all") {
          data.listIdGroup = ["all"];
        } else if (Array.isArray(this[this.groupBy.field])) {
          data.listIdGroup = this[this.groupBy.field];
        } else {
          data.listIdGroup = [this[this.groupBy.field]];
        }
        try {
          this.isLoadingAdd = true;
          await this.addRFPRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.step_to_locate = "",
      this.legal_issues = [];
      this.sources = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/deposition/RFP", ["addRFPRequest"])
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
