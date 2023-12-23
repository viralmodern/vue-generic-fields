<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <div>
        <IssueDetailHeader/>
      </div>
      <div>
        <v-tabs grow class="px-1">
          <v-tab key="Fact">Issue</v-tab>
          <v-tab key="Linked">Linked</v-tab>
          <v-tab key="Comment">Comment</v-tab>
          <v-tab key="Worklog">Worklog</v-tab>
          <v-tab key="Checklist">Checklist</v-tab>
          <v-tab key="Notes">Notes</v-tab>
          <v-tab key="Attachment">Attachment</v-tab>
          <v-tab-item class="pa-3" key="Hearsay">
            <CitationIssue/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
          <v-tab-item class="pa-3" key="Comment">
            <Comment/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Worklog">
            <WorkLog :worklog="dataIssueDetail.worklog"/>
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
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import CitationIssue from "../citations-issue/detail/CitationIssue";
import IssueDetailHeader from "../citations-issue/detail/IssueDetailHeader";
import WorkLog from "../citations-issue/detail/WorkLog";
import CheckList from "../citations-issue/detail/CheckList";
import Notes from "../citations-issue/detail/Notes";
import Comment from "../citations-issue/detail/Comment";
import Attachment from "../citations-issue/detail/Attachment";
export default {
  components: {
    IssueDetailHeader,
    CitationIssue,
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
    ...mapGetters("ht_store/matter/citations/citationsIssue/detail", ["dataIssueDetail"])
  }
};
</script>
