<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      fixed
      class="fill-height"
      temporary
      width="45%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Fields</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn
            text
            icon
            color="white"
            @click="$emit('closeMenuRight', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="phong">
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="py-4 px-2">
              <v-col cols="6">
                <p>Subject:</p>
                <Subject
                  :value="detailFact.subjects"
                  @update="detailFact.subjects = $event"
                  @onOpenMenu="$emit('openMenuSubject')"
                />
              </v-col>
              <v-col cols="6">
                <p>Character:</p>
                <RelatedCharacter
                  class="mx-1"
                  style="flex:unset"
                  :value="detailFact.characters"
                  @update="detailFact.characters = $event"
                />
              </v-col>
              <v-col cols="6">
                <p>Issue:</p>
                <Issue
                  :value="detailFact.legal_issues"
                  @update="detailFact.legal_issues = $event"
                  @onOpenMenu="$emit('openMenuIssue')"
                />
              </v-col>
              <v-col cols="6">
                <p>Source:</p>
                <Source
                  :value="detailFact.sources"
                  @update="detailFact.sources = $event"
                  @onOpenMenu="$emit('openMenuSource')"
                />
              </v-col>
              <v-col cols="12">
                <p>Tags:</p>
                <Tags
                  :value="detailFact.tags"
                  @update="detailFact.tags = $event"
                  @onOpenMenu="$emit('openMenuTag')"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="detailFact.name"
                  label="Name"
                  placeholder="Name"
                  :rules="[v => !!v || 'This field is required']"
                >
                  <v-icon slot="prepend" color="red">mdi-create</v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigChoices[appConfigConstants.FACT_TYPE]"
                  label="Type"
                  item-text="label"
                  icon="filter_none"
                  item-value="value"
                  item-color="color"
                  :value="detailFact.type"
                  @change="detailFact.type = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Relevant Level"
                  item-text="name"
                  icon="equalizer"
                  item-value="id"
                  item-color="color"
                  :value="detailFact.relevant_level"
                  @change="detailFact.relevant_level = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>

              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Impotant"
                  item-text="name"
                  item-value="id"
                  icon="equalizer"
                  item-color="color"
                  :value="detailFact.important"
                  @change="detailFact.important = $event"
                  :rules="[
                    v =>
                      ![null, undefined].includes(v) || 'This field is required'
                  ]"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.factBolean"
                  label="Disputed"
                  item-text="name"
                  icon="toggle_on"
                  item-value="id"
                  item-color="color"
                  :value="detailFact.dispute"
                  @change="detailFact.dispute = $event"
                  :rules="[
                    v =>
                      ![null, undefined].includes(v) || 'This field is required'
                  ]"
                />
              </v-col>

              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.favorableFact"
                  label="Favorable"
                  item-text="name"
                  item-value="id"
                  icon="mdi-format-indent-increase"
                  item-color="color"
                  :value="detailFact.favorable"
                  @change="detailFact.favorable = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Value level"
                  item-text="name"
                  icon="format_list_numbered"
                  item-value="id"
                  item-color="color"
                  :value="detailFact.value_level"
                  @change="detailFact.value_level = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="6">
                <DateMonthPicker
                  hide-details
                  :value="dateFormat"
                  @change="detailFact.time = new Date($event).toISOString()"
                />
              </v-col>
              <v-col cols="12">
                <p>Relevant:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  v-model="detailFact.relevant"
                  :thumb-size="20"
                  thumb-label="always"
                  class="pt-3"
                ></v-slider>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="mdi-comment"
                  name="input-7-1"
                  rows="2"
                  label="Interpretation"
                  v-model="detailFact.interpretation"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="mdi-comment"
                  name="input-7-1"
                  label="Cause of action"
                  rows="2"
                  v-model="detailFact.cause_of_actions"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="description"
                  rows="2"
                  name="input-7-1"
                  label="Fact Description"
                  v-model="detailFact.desc"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </div>
      <div class="save_button">
        <v-btn
          @click="save"
          class="ma-2"
          :loading="laodingUpdate"
          tile
          color="indigo"
          dark
          >Save</v-btn
        >
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SelectChip from "../inputs/SelectChip";
import Subject from "../common/menus/Subject";
import RelatedCharacter from "../common/menus/RelatedCharacter";
import Issue from "../common/menus/Issue";
import Source from "../common/menus/Source";
import Tags from "../common/menus/Tags";
import DateMonthPicker from "../menus/DateMonthPicker";

export default {
  props: {
    isShow: Boolean,
    title: String
  },
  components: {
    SelectChip,
    Subject,
    RelatedCharacter,
    Issue,
    Source,
    DateMonthPicker,
    Tags
  },
  data() {
    return {
      valid: false,
      showFactDetail: false,
      detailFact: {
        name: "",
        type: null,
        desc: "",
        interpretation: "",
        important: null,
        dispute: null,
        time: "",
        favorable: null,
        creator: null,
        relevant: 0,
        value_level: null,
        relevant_level: null,
        cause_of_actions: "",
        subjects: [],
        characters: [],
        legal_issues: [],
        sources: [],
        tags: []
      },
      laodingUpdate: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/facts", ["updateFactDetailRequest"]),
    save() {
      if (this.$refs.form.validate()) {
        this.laodingUpdate = true;
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          item: this.detailFact,
          pk: this.factDetail.pk
        };
        this.updateFactDetailRequest(data)
          .then(() => {
            this.laodingUpdate = false;
          })
          .catch(() => {
            this.laodingUpdate = false;
          });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/facts", ["factDetail"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs", "appConfigChoices", "appConfigConstants"]),
    dateFormat() {
      if (!this.detailFact.time) return "";
      return this.$options.filters.formatYYYYMMDD(this.detailFact.time);
    }
  },
  watch: {
    factDetail: {
      handler(val) {
        if (val) {
          this.detailFact = {
            name: val.name,
            type: val.type,
            interpretation: val.interpretation,
            important: val.important,
            dispute: val.dispute,
            time: val.time,
            favorable: val.favorable,
            creator: val.creator,
            relevant: val.relevant,
            value_level: val.value_level,
            relevant_level: val.relevant_level,
            cause_of_actions: val.cause_of_actions,
            subjects: val.subjects,
            characters: val.characters,
            legal_issues: val.legal_issues,
            sources: val.sources,
            tags: val.tags,
            desc: val.desc
          };
        }
      }
    },
    isShow: {
      handler(val) {
        if (val) {
          this.showFactDetail = val;
        }
      }
    },
    showFactDetail: {
      handler(val) {
        if (!val) {
          this.$emit("closeMenuRight");
        }
      }
    }
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
