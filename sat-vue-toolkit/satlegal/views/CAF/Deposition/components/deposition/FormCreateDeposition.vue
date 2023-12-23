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
      + Add new
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
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="3" class="pa-0 pr-2">
                <v-text-field
                  v-model="name"
                  autofocus
                  class="custom ma-0 pa-0"
                  placeholder="Name"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="pa-0 pr-2">
                <SelectChip
                  placeholder="Select type"
                  :items="appConfigs.deponentType"
                  label="Type"
                  item-text="name"
                  item-value="value"
                  item-color="color"
                  :value="deponent_type"
                  @change="deponent_type = $event"
                  :rules="[v => (!!v && !!v !== 0) || 'This field is required']"
                />
              </v-col>
              <v-col cols="3" class="pa-0 pr-2">
                <v-btn
                  small
                  class="primary mx-1 mt-2"
                  @click="add"
                  :loading="isLoadingAdd"
                  >Add</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="ma-0" style="margin-left:-5px !important;">
              <div class="d-flex align-center">
                <Members
                  class="mr-2"
                  :value="members"
                  @update="onChangeInputNullAble('members', $event)"
                />
                <Issue
                  class="mr-2"
                  :value="legal_issues"
                  :valid="errorsForm.legal_issues.valid"
                  @update="legal_issues = $event; validForm()"
                />
                <Label
                  class="mr-2"
                  :value="labels"
                  :valid="errorsForm.labels.valid"
                  @update="labels = $event; validForm()"
                />
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";

import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon,
    Members,
    Issue,
    SelectChip,
    Label
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
      name: "",
      members: [],
      method: "",
      priority: "",
      deponent: {},
      legal_issues: [],
      labels: [],
      deponent_type: "",
      errorsForm: {
        legal_issues: {
          messages: "",
          valid: false
        },
        labels: {
          messages: "",
          valid: false
        }
      },
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    validForm() {
      const errors = {
        legal_issues: {
          messages: "",
          valid: false
        },
        labels: {
          messages: "",
          valid: false
        }
      };
      if (!this.legal_issues.length) {
        errors.legal_issues.messages = "required";
        errors.legal_issues.valid = true;
      }
      if (!this.labels.length) {
        errors.labels.messages = "required";
        errors.labels.valid = true;
      }
      const valid = !Object.keys(errors).some(key => errors[key].valid === true);
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    onChangeInputNullAble(key, value) {
      const findObjectNullAble = this[key].find(x => x.id === 0);
      if (findObjectNullAble) {
        this[key] = [findObjectNullAble, ...value];
        return;
      }
      return (this[key] = value);
    },
    async add() {
      if (this.validForm()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            name: this.name,
            members: this.members,
            legal_issues: this.legal_issues,
            labels: this.labels,
            deponent_type: this.deponent_type,
            method: this.method,
            priority: this.priority,
            deponent: this.deponent,
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addDepositionRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.members = [];
      this.legal_issues = [];
      this.labels = [];
      this.deponent_type = "";
      this.method = "";
      this.priority = "";
      this.deponent = {};
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/deposition", ["addDepositionRequest"])
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
