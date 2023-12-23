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
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="2" class="pa-0 pr-2">
                <v-text-field
                  v-model="name"
                  autofocus
                  class="custom ma-0 pa-0"
                  placeholder="Risk Name"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="pa-0 pr-2">
                <v-textarea
                  v-model="desc"
                  class="custom ma-0 pa-0"
                  placeholder="Risk Description"
                  auto-grow
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col cols="4" class="pa-0 pr-2 mt-2">
                <div class="d-flex ml-2">
                  <Issue
                    icon="mdi-format-list-bulleted"
                    class="d-flex mx-1"
                    :value="legal_issues"
                    @update="legal_issues = $event"
                  />
                  <DatePicker
                    title="Choose date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :valid="validate"
                    :date="date"
                    :textTooltip="
                      [date].some(x => !!x)
                        ? `${$options.filters.formatShortDate(date)}`
                        : 'Add date'
                    "
                    :colorButton="`${[date].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="(date = $event.date);"
                    :isClear="true"
                />
                  <DatePicker
                    title="Risk Expiration Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :valid="validate"
                    :date="date2"
                    :textTooltip="
                      [date2].some(x => !!x)
                        ? `${$options.filters.formatShortDate(date2)}`
                        : 'Add Risk Expiration Date'
                    "
                    :colorButton="`${[date2].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="
                      date2 = $event.date;
                    "
                    :isClear="true"
                  />
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="pa-0 pr-2 mt-2">
            <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";

import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";

export default {
  components: {
    Issue,
    DatePicker,
    AddIcon,
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
      validate: false,
      name: "",
      desc: "",
      legal_issues: [],
      date: null,
      date2: null,
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    onChangeInputNullAble(key, value) {
      const findObjectNullAble = this[key].find(x => x.id === 0);
      if (findObjectNullAble) {
        this[key] = value;
        this[key] = [findObjectNullAble, ...value];
        return;
      }
      return (this[key] = value);
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            name: this.name,
            desc: this.desc,
            legal_issues: this.legal_issues,
            trigger_date: this.date,
            expiration_date: this.date2,
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
          await this.addRiskRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.desc = "";
      this.date = null;
      this.date2 = null;
      this.legal_issues = [];
      this.validate = false;
      this.$refs.form.resetValidation();
    },
    onInputLocation(value) {
      value.extra
        ? (this.location = value)
        : (this.location = { extra: value });
    },
    ...mapActions("ht_store/matter/risk/register", ["addRiskRequest"])
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
    },
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
