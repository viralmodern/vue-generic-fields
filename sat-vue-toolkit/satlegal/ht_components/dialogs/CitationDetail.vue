<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <CitationsTitle
              :title="dataCitationDetail.name"
              :date="dataCitationDetail.creataAt"
              :characters="dataCitationDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Citation">Citation</v-tab>
              <v-tab key="CaseBrief">Case Brief</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="WorkLog">WorkLog</v-tab>

              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab-item class="pa-3" key="Citation">
                <GeneralCitation :items="dataCitationDetail" />
              </v-tab-item>
              <v-tab-item class="pa-3" key="CaseBrief">
                <BriefCase />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment />
              </v-tab-item>
              <v-tab-item class="pa-3" key="WorkLog">
                <WorkLog :worklog="dataCitationDetail.worklog" />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Checklist">
                <CheckList />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Notes">
                <Notes />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <CitationsRight :items="dataCitationDetail" />
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import CitationsTitle from "../citations-detail/CitationsTitle";
import CitationsRight from "../citations-detail/CitationsRight";
import GeneralCitation from "../citations-detail/GeneralCitation";
import WorkLog from "../citations-detail/WorkLog";
import CheckList from "../citations-detail/CheckList";
import Notes from "../citations-detail/Notes";
import Comment from "../citations-detail/Comment";
import BriefCase from "../citations-detail/BriefCase";
export default {
  components: {
    CitationsTitle,
    CitationsRight,
    WorkLog,
    CheckList,
    Notes,
    Comment,
    GeneralCitation,
    BriefCase
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/detail", ["dataCitationDetail"])
  }
};
</script>
