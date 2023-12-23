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
      New fact
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" v-model="valid" @submit.prevent id="check-login-form">
        <v-row class="ma-0">
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="2" class="pa-0 pr-2">
                <v-text-field
                  v-model="name"
                  autofocus
                  class="custom ma-0 pa-0"
                  placeholder="Name"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="pa-0 pr-2">
                <v-textarea
                  v-model="desc"
                  class="custom ma-0 pa-0"
                  placeholder="Description"
                  auto-grow
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col cols="3" class="pa-0 pr-2">
                <v-textarea
                  v-model="cause_of_actions"
                  class="custom ma-0 pa-0"
                  placeholder="Cause of action"
                  auto-grow
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col cols="2" class="pa-0 pr-2">
                <Location
                  :value="location.extra"
                  placeholder="Location"
                  @input="onInputLocation"
                  class="custom"
                />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col cols="2" class="pa-0 pr-2">
                <SelectChip
                  placeholder="Select type"
                  :items="appConfigChoices[appConfigConstants.FACT_TYPE]"
                  label="Type"
                  item-text="label"
                  item-value="value"
                  item-color="color"
                  :value="type"
                  @change="type = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <div class="d-flex mt-2">
                <RelatedCharacter
                  style="flex:unset"
                  class="mr-1"
                  :value="related_characters.filter(x => x.id !== 0)"
                  @update="
                    onChangeInputNullAble('related_characters', $event)
                  "
                />
                <Subject
                  icon="mdi-format-list-bulleted"
                  class="mx-1"
                  :value="subjects"
                  @update="subjects = $event"
                />
                <DateTimePicker
                  title="Choose date time"
                  :isActions="true"
                  :date="date"
                  :time="time"
                  :textTooltip="
                    [date, time].some(x => !!x)
                      ? `${$options.filters.formatShortDate(date)} ${time}`
                      : 'Add date time'
                  "
                  @updateDate="date = $event"
                  @updateTime="time = $event"
                  :colorButton="
                    `${[date, time].some(x => !!x) ? 'indigo' : ''}`
                  "
                  class="mx-2"
                  @clear="
                    date = '';
                    time = '';
                  "
                />
              </div>
            </v-row>
          </v-col>
          <v-col cols="1" class="pa-0 pr-2 mt-2">
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import Subject from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Subject";
import Location from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Location";
import DateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DateTimePicker";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";

import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

import { formatDateTime } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  mixins: [appConfigMixin],
  components: {
    RelatedCharacter,
    Location,
    Subject,
    DateTimePicker,
    AddIcon,
    SelectChip
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
      desc: "",
      related_characters: [],
      location: {},
      subjects: [],
      date: "",
      time: "",
      important_level: undefined,
      value_level: undefined,
      relevant_level: undefined,
      favorable: undefined,
      dispute: undefined,
      type: "",
      legal_issues: [],
      cause_of_actions: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
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
            subjects: this.subjects,
            location: {
              extra: this.location.extra,
              locality: this.location.locality,
              state: this.location.state,
              country: this.location.country
            },
            time: formatDateTime(this.date, this.time),
            characters: this.related_characters,
            cause_of_actions: this.cause_of_actions,
            important_level: this.important_level,
            value_level: this.value_level,
            relevant_level: this.relevant_level,
            favorable: this.favorable,
            dispute: this.dispute,
            type: this.type,
            legal_issues: this.legal_issues
          }
        };
        if (this.groupBy.field === "all") {
          data.listIdGroup = ["all"];
        } else if (Array.isArray(this[this.groupBy.field])) {
          if (this.groupBy.field === "related_characters") {
            data.listIdGroup = this.related_characters.map(x => x.id);
          } else {
            data.listIdGroup = this[this.groupBy.field];
          }
        } else {
          data.listIdGroup = [this[this.groupBy.field]];
        }
        try {
          this.isLoadingAdd = true;
          const fact = await this.addFactsRequest(data);
          const depositionRelation = await this.addRelatedFact(
            this.appConfigConstants.DEPOSITION_RELATED,
            fact.pk,
            this.dataDepositionDetail
          );
          const factRelation = {
            content_type_id: this.appConfigListContentType[this.appConfigConstants.FACT_RELATED].value,
            pk: fact.pk,
            name: fact.name
          }
          this.updateRelationsDepositionDetail(factRelation);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    addRelatedFact(type, factsId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          factsId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        }
      };
      return this.updateRelationFactsRequest(data);
    },
    clearForm() {
      this.name = "";
      this.desc = "";
      this.date = "";
      this.time = "";
      this.subjects = [];
      this.location = {};
      this.related_characters = [];
      this.cause_of_actions = "";
      this.important_level = undefined;
      this.value_level = undefined;
      this.relevant_level = undefined;
      this.favorable = undefined;
      this.dispute = undefined;
      this.type = "";
      this.legal_issues = [];
      this.$refs.form.resetValidation();
    },
    onInputLocation(value) {
      value.extra
        ? (this.location = value)
        : (this.location = { extra: value });
    },
    ...mapActions("ht_store/matter/facts", [
      "addFactsRequest",
      "updateRelationFactsRequest"
    ]),
    ...mapMutations("ht_store/matter/discovery/deposition/detail", ["updateRelationsDepositionDetail"]),
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
