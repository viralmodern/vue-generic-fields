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
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat :disabled="isLoadingGetDetail" class="phong">
        <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="px-3">
              <v-col cols="6">
                <p>Character:</p>
                <RelatedCharacter
                  class="mx-1"
                  style="flex:unset"
                  :value="factDetail.characters"
                  :isLoadingGet="isLoadingGetCharacter"
                  :isEmitOpenMenu="true"
                  @update="updateFactDetail('characters', $event)"
                  @onOpenMenu="getDataCharacter"
                />
              </v-col>
              <v-col cols="6">
                <p>Action:</p>
                <div class="d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="factDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/facts/${factDetail.pk}`"
                    routerMutation="ht_store/matter/facts/updateDataFacts"
                    :pk="factDetail.pk"
                    :valueFlag="factDetail.reported_object && factDetail.reported_object.pk"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/facts/updateFactDetail"
                  />
                  <Action :item="factDetail" @remove="removeFactDetail" />
                </div>
              </v-col>
              <v-col cols="6">
                <v-row class="px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <v-text-field
                    :value="factDetail.name"
                    label="Name"
                    placeholder="Name"
                    @change="updateFactDetail('name', $event)"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                  label="Relevant Level"
                  item-text="label"
                  icon="equalizer"
                  item-value="value"
                  item-color="color"
                  :value="factDetail.relevant_level"
                  @change="updateFactDetail('relevant_level', $event)"
                />
              </v-col>

              <!-- <v-col cols="6">
                <SelectChip
                  :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                  label="Impotant"
                  item-text="label"
                  item-value="value"
                  icon="equalizer"
                  item-color="color"
                  :value="factDetail.important"
                  @change="updateFactDetail('important', $event)"
                />
              </v-col>-->
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.factBolean"
                  label="Disputed"
                  item-text="name"
                  icon="toggle_on"
                  item-value="id"
                  item-color="color"
                  :value="factDetail.dispute"
                  @change="updateFactDetail('dispute', $event)"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="
                    appConfigChoices[
                      appConfigConstants.FAVORABLE_AND_PROVIDEDBY
                    ]
                  "
                  label="Favorable"
                  item-text="label"
                  item-value="value"
                  icon="mdi-format-indent-increase"
                  item-color="color"
                  :value="factDetail.favorable"
                  @change="updateFactDetail('favorable', $event)"
                />
              </v-col>

              <v-col cols="6">
                <SelectChip
                  :items="appConfigChoices[appConfigConstants.FACT_TYPE]"
                  label="Fact Type"
                  item-text="label"
                  icon="filter_none"
                  item-value="value"
                  item-color="color"
                  :value="factDetail.type"
                  @change="updateFactDetail('type', $event)"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
                  label="Value Level"
                  item-text="label"
                  icon="format_list_numbered"
                  item-value="value"
                  item-color="color"
                  :value="factDetail.value_level"
                  @change="updateFactDetail('value_level', $event)"
                />
              </v-col>

              <v-col cols="6">
                <p>Value Important Index:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  :value="factDetail.important"
                  @change="updateFactDetail('important', $event)"
                  :thumb-size="20"
                  thumb-label="always"
                ></v-slider>
              </v-col>
              <v-col cols="6">
                <p>Relevant Index:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  :value="factDetail.relevant"
                  @change="updateFactDetail('relevant', $event)"
                  :thumb-size="20"
                  thumb-label="always"
                ></v-slider>
              </v-col>
              <v-col cols="6">
                <p>Subject Matter:</p>
                <Subject
                  :value="factDetail.subjects"
                  :isLoadingGet="isLoadingGetSubject"
                  @update="updateFactDetail('subjects', $event)"
                  :isEmitOpenMenu="true"
                  @onOpenMenu="getDataSubjects"
                />
              </v-col>
              <!-- <v-col cols="6">
                <p>Character:</p>
                <RelatedCharacter
                  class="mx-1"
                  style="flex:unset"
                  :value="factDetail.characters"
                  :isLoadingGet="isLoadingGetCharacter"
                  :isEmitOpenMenu="true"
                  @update="updateFactDetail('characters', $event)"
                  @onOpenMenu="getDataCharacter"
                />
              </v-col>-->
              <v-col cols="6">
                <p>Legal Issue:</p>
                <Issue
                  :value="factDetail.legal_issues"
                  :isLoadingGet="isLoadingGetIssue"
                  :isEmitOpenMenu="true"
                  @update="updateFactDetail('legal_issues', $event)"
                  @onOpenMenu="getDataIssues"
                />
              </v-col>
              <v-col cols="6">
                <p>Fact Source:</p>
                <Source
                  :value="factDetail.sources"
                  :isLoadingGet="isLoadingGetSource"
                  @update="updateFactDetail('sources', $event)"
                  :isEmitOpenMenu="true"
                  @onOpenMenu="getDataCharacter"
                />
              </v-col>
              <!-- <v-col cols="6">
                <p>Tags:</p>
                <Tags
                  :value="factDetail.tags"
                  :isLoadingGet="isLoadingGetTag"
                  @update="updateFactDetail('tags', $event)"
                  :isEmitOpenMenu="true"
                  @onOpenMenu="getDataTags"
                />
              </v-col>-->
              <v-col cols="6">
                <p>Time:</p>
                <ChooseDateTimePicker
                  :isActions="true"
                  :isShowButtonClear="false"
                  sizeText="text-body-2"
                  :title="factDetail.time ? 'Update time' : 'Add time'"
                  :date="factDetail.time"
                  :nameButtonSubmit="factDetail.time ? 'Update' : 'Add'"
                  @update="updateFactDetail('time', $event)"
                />
              </v-col>
              <v-col cols="12">
                <p>Location:</p>
                <MenuLocation
                  :value="factDetail.location || {}"
                  @update="updateFactDetail('location', $event)"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="mdi-comment"
                  name="input-7-1"
                  rows="2"
                  label="Fact Interpretation"
                  :value="factDetail.interpretation"
                  @change="updateFactDetail('interpretation', $event)"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="mdi-comment"
                  name="input-7-1"
                  label="Cause of Action"
                  rows="2"
                  :value="factDetail.cause_of_actions"
                  @change="updateFactDetail('cause_of_actions', $event)"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="description"
                  rows="2"
                  name="input-7-1"
                  label="Fact Description"
                  :value="factDetail.desc"
                  @change="updateFactDetail('desc', $event)"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="description"
                  rows="2"
                  name="input-7-1"
                  label="Relief Sought"
                  :value="factDetail.relief_sought"
                  @change="updateFactDetail('relief_sought', $event)"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/inputs/SelectChip";
import Subject from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Subject";
import RelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/RelatedCharacter";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Source from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Source";
// import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import MenuLocation from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MenuLocation";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShow: Boolean,
    title: String,
    isLoadingGetDetail: Boolean
  },
  components: {
    SelectChip,
    Subject,
    RelatedCharacter,
    Issue,
    Source,
    // Tags,
    ChooseDateTimePicker,
    MenuLocation,
    Flag,
    Action,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showFactDetail: false,
      isCallApiIssue: false,
      isLoadingGetIssue: false,
      isCallApiSubject: false,
      isLoadingGetSubject: false,
      isCallApiCharacter: false,
      isLoadingGetCharacter: false,
      isCallApiSource: false,
      isLoadingGetSource: false,
      isCallApiTag: false,
      isLoadingGetTag: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/facts", [
      "updateFactDetailRequest",
      "removeFactDetailRequest",
      "updateFlagRequest"
    ]),
    updateFactDetail(name, value) {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            factsId: this.factDetail.pk
          },
          body: {
            [name]: value
          }
        };
        this.updateFactDetailRequest(data);
      }
    },
    async updateReports(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          rowId: this.factDetail.pk
        },
        body: value,
        detail: true
      };
      await this.updateFlagRequest(data);
    },
    async removeFactDetail(close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        factsId: this.factDetail.pk
      };
      data.isFieldArray = true;
      await this.removeFactDetailRequest(data);
      close();
      this.$emit("closeMenuRight", false);
    },
    async getDataIssues() {
      if (!this.isCallApiIssue) {
        this.isCallApiIssue = true;
        this.isLoadingGetIssue = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataIssuesRequest({ matterId });
        this.isLoadingGetIssue = false;
      }
    },
    async getDataSubjects() {
      if (!this.isCallApiSubject) {
        this.isCallApiSubject = true;
        this.isLoadingGetSubject = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataSubjectsRequest({ matterId });
        this.isLoadingGetSubject = false;
      }
    },
    async getDataCharacter() {
      if (!this.isCallApiCharacter) {
        this.isCallApiCharacter = true;
        this.isLoadingGetCharacter = true;
        await this.getAllDataCharacterRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId
        });
        this.isLoadingGetCharacter = false;
      }
    },
    async getDataSource() {
      if (!this.isCallApiSource) {
        this.isCallApiSource = true;
        this.isLoadingGetSource = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataSourceRequest({ matterId });
        this.isLoadingGetSource = false;
      }
    },
    async getDataTags() {
      if (!this.isCallApiTag) {
        this.isCallApiTag = true;
        this.isLoadingGetTag = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataTagRequest({ matterId });
        this.isLoadingGetTag = false;
      }
    },
    ...mapActions("ht_store/matter/facts", ["updateFactDetailRequest"]),
    ...mapActions("ht_store/matter/issues", ["getDataIssuesRequest"]),
    ...mapActions("ht_store/matter/subjects", ["getDataSubjectsRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"]),
    ...mapActions("ht_store/matter/source", ["getDataSourceRequest"]),
    ...mapActions("ht_store/matter/tag", ["getDataTagRequest"])
  },
  computed: {
    ...mapGetters("ht_store/matter/facts", ["factDetail"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  watch: {
    isShow: {
      handler(val) {
        if (val) {
          this.showFactDetail = val;
        } else {
          this.isCallApiIssue = false;
          this.isCallApiSubject = false;
          this.isCallApiCharacter = false;
          this.isCallApiSource = false;
          this.isCallApiTag = false;
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
