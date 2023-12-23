<template>
  <div>
    <v-navigation-drawer
      :value="isShowPopup"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="45%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Evidence Detail</span>
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
                <label class="mb-3">Evidence Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="evidencesDetail.name || ''"
                    class="mx-2"
                    placeholder="Evidence Name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateEvidences',evidencesDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Evidence Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="evidencesDetail.desc || ''"
                    class="mx-2"
                    placeholder="Evidence Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateEvidences',evidencesDetail.pk,'name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Created by:</label>
                <v-row class="px-3">
                  <CreatedBy :members="members" :value="evidencesDetail" keyText="creator" />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Provided by:</label>
                <v-row class="px-3">
                  <CharacterSingles
                    textTooltip="select provided by"
                    :value="evidencesDetail.provided_by_character"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'provided_by_character', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Provided by Party:</label>
                <v-row class="px-3">
                  <SelectCheckBox
                    title="Provided By Party"
                    :value="evidencesDetail.provided_by"
                    :dataList="appConfigs.favorableEvidences"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'provided_by', $event.id)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Favorable:</label>
                <v-row class="px-3">
                  <SelectCheckBox
                    title="Favorable"
                    :value="evidencesDetail.favorable"
                    :dataList="appConfigs.favorableEvidences"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'favorable', $event.id)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Dispute?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="evidencesDetail.disputed"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'disputed', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Tags:</label>
                <v-row class="px-3">
                  <Tags
                    :value="evidencesDetail.tags"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'tags', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Legal Issue:</label>
                <v-row class="px-3">
                  <Issue
                    :value="evidencesDetail.legal_issues"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'legal_issues', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Relevance Index:</label>
                <v-row class="px-3">
                  <Range
                    :value="evidencesDetail.relevance"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'relevance', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Materiality:</label>
                <v-row class="px-3">
                  <Range
                    :value="evidencesDetail.materiality"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'materiality', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Admissibility:</label>
                <v-row class="px-3">
                  <Range
                    :value="evidencesDetail.admissibility"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'admissibility', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Important Level:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="evidencesDetail.important_level"
                    keyValue="value"
                    keyText="label"
                    :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                    @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Important Level',
                    name: 'important_level',
                    pk: evidencesDetail.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: evidencesDetail.important_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]],
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Relevant Level:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="evidencesDetail.relevance_level"
                    keyValue="value"
                    keyText="label"
                    :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                    @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Relevance Level',
                    name: 'relevance_level',
                    pk: evidencesDetail.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: evidencesDetail.relevance_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]],
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Materiality Level:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="evidencesDetail.materiality_level"
                    keyValue="value"
                    keyText="label"
                    :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                    @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Materiality Level',
                    name: 'materiality_level',
                    pk: evidencesDetail.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: evidencesDetail.materiality_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]],
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Material Level:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="evidencesDetail.materiality_level"
                    keyValue="value"
                    keyText="label"
                    :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                    @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Materiality Level',
                    name: 'materiality_level',
                    pk: evidencesDetail.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: evidencesDetail.materiality_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]],
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Admissible Level:</label>
                <v-row class="px-3">
                  <ChipJoinMenuSelectBox
                    :value="evidencesDetail.admissibility_level"
                    keyValue="value"
                    keyText="label"
                    :dataList="
                  appConfigChoices[appConfigConstants.COMMON_LEVEL]
                "
                    @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Admissibility Level',
                    name: 'admissibility_level',
                    pk: evidencesDetail.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: evidencesDetail.admissibility_level,
                    dataList: [appConfigChoices[appConfigConstants.NA], ...appConfigChoices[appConfigConstants.COMMON_LEVEL]],
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Characters:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No Characters)"
                    :value="
                        $_appConfigMixin_filterValueByContentType(
                          appConfigConstants.CHARACTER_RELATED,
                          evidencesDetail.relations_info
                        ).map(v => ({...v, name: v.first_name || v.name}))
                      "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                      $emit('updateCharacters',{
                        ...$event,
                        name: appConfigConstants.CHARACTER_RELATED,
                        pk: evidencesDetail.pk,
                        value: $_appConfigMixin_filterValueByContentType(
                          appConfigConstants.CHARACTER_RELATED,
                          evidencesDetail.relations_info
                        ),
                        detail: true
                      })
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Docket:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No docket)"
                    :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.DOCKET_RELATED,
                    evidencesDetail.relations_info
                  )
                "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="description"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                   $emit('updateDocket',{
                    ...$event,
                    name: appConfigConstants.DOCKET_RELATED,
                    pk: evidencesDetail.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DOCKET_RELATED,
                      evidencesDetail.relations_info
                    ),
                    detail: true
                  })
                "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Facts:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No fact)"
                    :value="
                    $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.FACT_RELATED,
                      evidencesDetail.relations_info
                    )
                  "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                    $emit('updateFacts',{
                      ...$event,
                      name: appConfigConstants.FACT_RELATED,
                      pk: evidencesDetail.pk,
                      value: $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.FACT_RELATED,
                        evidencesDetail.relations_info
                      ),
                      detail: true
                    })
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Deposition:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No deposition)"
                    :value="
                      $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.DEPOSITION_RELATED,
                        evidencesDetail.relations_info
                      )
                    "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                    $emit('updateDeposition',{
                      ...$event,
                      name: appConfigConstants.DEPOSITION_RELATED,
                      pk: evidencesDetail.pk,
                      value: $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.DEPOSITION_RELATED,
                        evidencesDetail.relations_info
                      ),
                      detail: true
                    })
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Request Set:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No Request Set)"
                    :value="
                      $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.REQUEST_SET_RELATED,
                        evidencesDetail.relations_info
                      )
                    "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                    $emit('updateRequestSet',{
                      ...$event,
                      name: appConfigConstants.REQUEST_SET_RELATED,
                      pk: evidencesDetail.pk,
                      value: $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.REQUEST_SET_RELATED,
                        evidencesDetail.relations_info
                      ),
                      detail: true
                    })
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Request Set Item:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No Request Set Item)"
                    :value="
                      $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.REQUEST_SET_ITEM_RELATED,
                        evidencesDetail.relations_info
                      )
                    "
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                    $emit('updateRequestSetItem',{
                      ...$event,
                      name: appConfigConstants.REQUEST_SET_ITEM_RELATED,
                      pk: evidencesDetail.pk,
                      value: $_appConfigMixin_filterValueByContentType(
                        appConfigConstants.REQUEST_SET_ITEM_RELATED,
                        evidencesDetail.relations_info
                      ),
                      detail: true
                    })
                  "
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Assigned Members:</label>
                <v-row class="px-3">
                  <Members
                    textTooltip="Assigned Members"
                    :value="evidencesDetail.members"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'members', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="evidencesDetail.total_comments"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :rowId="evidencesDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Included in Trial?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="evidencesDetail.included_trial"
                    @update="$emit('updateEvidences',evidencesDetail.pk, 'included_trial', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                  <BookmarkOrFlag
                    :valueBookmark="evidencesDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/evidences/${evidencesDetail.pk}`"
                    routerMutation="ht_store/matter/evidences/updateEvidences"
                    :pk="evidencesDetail.pk"
                    :valueFlag="evidencesDetail.reported_object && evidencesDetail.reported_object.pk"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/evidences/updateEvidencesDetail"
                  />
                  <Action
                    :item="evidencesDetail"
                    @remove="$emit('remove', evidencesDetail, $event)"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Tags from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Tags";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Range from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Range";
import Issue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Issue";
import Comments from "../Comments";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//Mixin
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [appConfigMixin],
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    affId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Comments,
    Action,
    CreatedBy,
    CharacterSingles,
    Disputed,
    Tags,
    Range,
    Members,
    Issue,
    SelectCheckBox,
    ChipInlineList,
    ChipJoinMenuSelectBox,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/evidences", ["evidencesDetail"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  watch: {
    isShowPopup: {
      handler(val) {
        if (val) {
          this.showExpenseDetail = val;
        }
      }
    },
    showExpenseDetail: {
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
