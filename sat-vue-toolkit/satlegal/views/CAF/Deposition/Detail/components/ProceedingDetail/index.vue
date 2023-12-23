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
          <span>Proceeding Detail</span>
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
                <label class="mb-3">Question:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataProceedingDetail.question || ''"
                    class="mx-2"
                    placeholder="Question"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateProceeding('question', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Answer:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataProceedingDetail.answer || ''"
                    class="mx-2"
                    placeholder="Answer"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateProceeding('answer', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Follow up?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataProceedingDetail.follow_up"
                    @update="updateProceeding('follow_up', !dataProceedingDetail.follow_up)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Alert?:</label>
                <v-row class="px-3">
                  <v-btn
                    class="ma-0"
                    @click="updateProceeding('alert', !dataProceedingDetail.alert)"
                    icon
                    small
                  >
                    <v-icon small :color="dataProceedingDetail.alert ? 'red' : 'grey'">flag</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attorney Objection:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataProceedingDetail.objection"
                    @click="updateProceeding('objection', !dataProceedingDetail.objection)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Objection Reason:</label>
                <v-row class="px-3">
                  <ObjectionType
                    :value="dataProceedingDetail.objection_reasons"
                    :isEmitOpenMenu="true"
                    @update="updateProceeding('objection_reasons', $event)"
                    @onOpenMenu="$emit('getDataObjectionType')"
                    :isLoadingGet="isLoadingGetObjectionType"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Objection Context:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataProceedingDetail.objection_context || ''"
                    class="mx-2"
                    placeholder="Objection Context"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateProceeding('objection_context', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Deponent Emotion:</label>
                <v-row class="px-3">
                  <Emoji
                    :value="dataProceedingDetail.emoji"
                    @update="updateProceeding('emoji', $event)"
                    @openEmoji="openEmoji"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Related Exhibit:</label>
                <v-row class="px-3">
                  <ChipInlineList
                    textNoData="(No exhibit)"
                    :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                    dataProceedingDetail.relations_info
                  )
                "
                    :lengthDisplay="30"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="$emit('openExhibitModal', {
                    ...$event,
                    name: appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                    pk: dataProceedingDetail.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.DEPOSITION_EXHIBIT_RELATED,
                      dataProceedingDetail.relations_info
                    ),
                    detail: true
                  })"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Prior Statement:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataProceedingDetail.statement || ''"
                    class="mx-2"
                    placeholder="Prior Statement"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateProceeding('statement', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Prior Statement Made on:</label>
                <v-row class="px-3">
                  <div>{{dataProceedingDetail.make_on | formatShortDate}}</div>
                  <DatePicker
                    title="Date"
                    nameButtonSubmit="Save"
                    :isActions="true"
                    :date="dataProceedingDetail.make_on"
                    :textTooltip="
                  [dataProceedingDetail.make_on].some(x => !!x)
                    ? `${$options.filters.formatShortDate(dataProceedingDetail.make_on)}`
                    : 'Add date'
                "
                    :colorButton="`${[dataProceedingDetail.date].some(x => !!x) ? 'indigo' : ''}`"
                    class="mx-2"
                    @updateTime="updateProceeding('make_on', $event.date)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Prior Statement Source:</label>
                <v-row class="px-3">
                  <Source
                    :value="dataProceedingDetail.sources"
                    @update="updateProceeding('sources', $event)"
                    lengthDisplay="2"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3">
                  <div class="d-flex">
                    <BookmarkOrFlag
                      :valueBookmark="dataProceedingDetail.bookmarked_pk"
                      :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/proceedings/${dataProceedingDetail.pk}`"
                      routerMutation="ht_store/matter/deposition/proceeding/updateDataProceeding"
                      :pk="dataProceedingDetail.pk"
                      :detail="true"
                      routerMutationDetail="ht_store/matter/deposition/proceeding/updateDataDetail"
                      :isShowFlag="false"
                    />
                    <Action
                      :item="dataProceedingDetail"
                      @remove="$emit('remove', dataProceedingDetail.pk, $event)"
                    />
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <SelectEmoji
      @select="updateEmoji"
      :isShowPopup="isShowEmoji"
      @closeModal="isShowEmoji = false"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import ObjectionType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ObjectionType";
import Emoji from "../../../components/deposition/TdEmoji";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import Source from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SourceProceeding";
import SelectEmoji from "@/sat-vue-toolkit/satlegal/ht_components/common/dialog/SelectEmoji";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// mixins
import toggleMenuExhibitMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/exhibit/mixins/toggleMenuExhibitMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
export default {
  mixins: [appConfigMixin, toggleMenuExhibitMixin],
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    id: Number,
    isLoadingGetIssue: Boolean,
    isLoadingGetObjectionType: Boolean
  },
  components: {
    Disputed,
    DatePicker,
    Action,
    ObjectionType,
    Emoji,
    ChipInlineList,
    Source,
    SelectEmoji,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false,
      isShowEmoji: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/deposition/proceeding", [
      "updateProceedingRequest",
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    updateMakeBy(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          id: this.id
        },
        body: {
          make_by: value
        },
        detail: true
      };
      this.updateMakeByRequest(data);
    },
    updateProceeding(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          id: this.id
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateProceedingRequest(data);
    },
    openEmoji() {
      this.isShowEmoji = true;
    },
    updateEmoji(emoji) {
      const name = "emoji";
      const value = this.dataProceedingDetail.emoji + "" + emoji;
      this.updateProceeding(name, value);
      this.isShowEmoji = false;
    },
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/proceeding", [
      "dataProceedingDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
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
