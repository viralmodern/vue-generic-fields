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
          <span>Prior Experience Detail</span>
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
                <label class="mb-3">Employer name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorExperienceDetail.employer_name || ''"
                    class="mx-2"
                    placeholder="Employer name"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updatePriorExperience('employer_name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Title:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorExperienceDetail.title || ''"
                    class="mx-2"
                    placeholder="Title"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updatePriorExperience('title', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">From:</label>
                <v-row class="px-3">
                  <YearSelect
                    width="50px"
                    :max="dataPriorExperienceDetail.to_year"
                    border-unset
                    hide-details
                    :value="dataPriorExperienceDetail.from_year"
                    @update="updatePriorExperience('from_year',$event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">To:</label>
                <v-row class="px-3">
                  <YearSelect
                    width="50px"
                    border-unset
                    hide-details
                    :min="dataPriorExperienceDetail.from_year"
                    :value="dataPriorExperienceDetail.to_year"
                    @update="updatePriorExperience('to_year',$event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Description:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorExperienceDetail.desc || ''"
                    class="mx-2"
                    placeholder="Description"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updatePriorExperience('desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Address:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataPriorExperienceDetail.address || ''"
                    class="mx-2"
                    placeholder="Address"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updatePriorExperience('address', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Attachment:</label>
                <v-row class="px-3">
                  {{ dataPriorExperienceDetail.attachments && dataPriorExperienceDetail.attachments.length }}
                  <AddIcon
                    @onClickIcon="$emit('onShowPopupAttachment', dataPriorExperienceDetail.pk, dataPriorExperienceDetail.attachments)"
                    icon="mdi-attachment"
                    class="ml-1"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataPriorExperienceDetail.note_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataPriorExperienceDetail.deposition"
                    :priorExperienceId="dataPriorExperienceDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comment:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataPriorExperienceDetail.comment_count"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataPriorExperienceDetail.deposition"
                    :id="dataPriorExperienceDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3">
                  <Action
                    :item="dataPriorExperienceDetail"
                    @remove="$emit('remove', dataPriorExperienceDetail.pk, $event)"
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
import { mapGetters, mapActions } from "vuex";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Comments from "../../../../components/prior-experience/Comments";
import Notes from "../../../../components/prior-experience/Notes";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    priorId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Action,
    YearSelect,
    AddIcon,
    Comments,
    Notes
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/deposition/priorExperience", [
      "updatePriorExperienceRequest"
    ]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    updateMakeBy(value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          affId: this.affId
        },
        body: {
          make_by: value
        },
        detail: true
      };
      this.updateMakeByRequest(data);
    },
    updatePriorExperience(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          priorExperienceId: this.priorId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updatePriorExperienceRequest(data);
    },
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/priorExperience", [
      "dataPriorExperienceDetail"
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
