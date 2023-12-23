<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <PracticeTitle
              :title="dataPracticeDetail.name"
              :date="dataPracticeDetail.creataAt"
              :characters="dataPracticeDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Practice">Practice</v-tab>
              <v-tab key="Linked">Linked</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="WorkLog">WorkLog</v-tab>
              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab-item class="pa-3" key="Negligence">
                <Practice :item="dataPracticeDetail"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Worklog">
                <WorkLog :worklog="dataPracticeDetail.worklog"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Checklist">
                <CheckList/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Notes">
                <Notes/>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <PracticeRight :items="dataPracticeDetail"/>
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import PracticeTitle from "../cards/PracticeTitle";
import Comment from "../practice-detail/Comment";
import WorkLog from "../practice-detail/WorkLog";
import CheckList from "../practice-detail/CheckList";
import Practice from "../practice-detail/Practice";
import Notes from "../practice-detail/Notes";
import PracticeRight from "../practice-detail/PracticeRight";
export default {
  components: {
    PracticeTitle,
    Comment,
    WorkLog,
    CheckList,
    Notes,
    Practice,
    PracticeRight
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/practice/detail", ["dataPracticeDetail"])
  }
};
</script>
