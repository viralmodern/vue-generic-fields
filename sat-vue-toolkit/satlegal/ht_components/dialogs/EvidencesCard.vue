<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <EvidencesTitle
              :title="dataEvidencesDetail.name"
              :date="dataEvidencesDetail.creataAt"
              :characters="dataEvidencesDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Fact">{{typeCardEvidences}}</v-tab>
              <v-tab key="Linked">Linked</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="Worklog">Worklog</v-tab>
              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab key="Attachment">Attachment</v-tab>
              <v-tab-item class="pa-3" key="Hearsay">
                <GeneralEvidence :typeCheckTab="typeCardEvidences" :items="dataEvidencesDetail"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Worklog">
                <WorkLog :worklog="dataEvidencesDetail.worklog"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Checklist">
                <CheckList/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Notes">
                <Notes/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Attachment">
                <Attachment/>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <EvidencesRight :items="dataEvidencesDetail"/>
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import GeneralEvidence from "../evidences/detail/GeneralEvidence";
import EvidencesTitle from "../evidences/detail/EvidencesTitle";
import EvidencesRight from "../evidences/detail/EvidencesRight";
import WorkLog from "../evidences/detail/WorkLog";
import CheckList from "../evidences/detail/CheckList";
import Notes from "../evidences/detail/Notes";
import Comment from "../evidences/detail/Comment";
import Attachment from "../evidences/detail/Attachment";
export default {
  components: {
    EvidencesTitle,
    GeneralEvidence,
    EvidencesRight,
    WorkLog,
    CheckList,
    Notes,
    Comment,
    Attachment
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/evidences/detail", ["dataEvidencesDetail"]),
    typeCardEvidences() {
      var groupType = this.$route.params.groupType;
      return groupType === "evidences-grid"
        ? "Evidences"
        : groupType === "hearsay-grid"
        ? "Hearsay"
        : groupType === "testimony-grid"
        ? "Testimony"
        : "";
    }
  }
};
</script>
