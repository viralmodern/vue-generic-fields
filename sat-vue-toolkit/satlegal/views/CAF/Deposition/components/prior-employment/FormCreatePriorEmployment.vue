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
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="title"
              class="custom ma-0 pa-0"
              placeholder="Title"
              autofocus
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="case_name"
              class="custom ma-0 pa-0"
              placeholder="Case name"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <YearSelect
              :isShowDelete="true"
              placeholder="Choose from"
              :value="from_year"
              @update="from_year = $event"
              @delete="from_year = ''"
              :max="to_year"
            />
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <YearSelect
              :isShowDelete="true"
              placeholder="Choose to"
              :value="to_year"
              @update="to_year = $event"
              @delete="to_year = ''"
              :min="from_year"
            />
          </v-col>
          <v-col cols="4" class="pa-0 pr-2 mt-2">
            <div class="d-flex ml-2">
              <v-btn
                small
                class="primary mx-1"
                @click="add"
                :loading="isLoadingAdd"
                >Add</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";

export default {
  components: {
    AddIcon,
    YearSelect
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
      title: "",
      case_name: "",
      from_year: "",
      to_year: "",
      who_win: "",
      testimony: "",
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
            depositionId: this.$route.params.depositionId
          },
          body: {
            title: this.title,
            case_name: this.case_name,
            from_year: this.from_year,
            to_year: this.to_year,
            who_win: this.who_win,
            testimony: this.testimony,
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
          await this.addPriorEmploymentRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.title = "";
      this.case_name = "";
      this.from_year = "";
      this.to_year = "";
      this.who_win = "";
      this.testimony = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/deposition/priorEmployment", [
      "addPriorEmploymentRequest"
    ])
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
