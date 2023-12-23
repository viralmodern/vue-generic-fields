<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <MedWarTitle
              :title="dataNegligenceDetail.name"
              :date="dataNegligenceDetail.creataAt"
              :characters="dataNegligenceDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Negligence">Negligence</v-tab>
              <v-tab key="Linked">Linked</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="WorkLog">WorkLog</v-tab>
              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab-item class="pa-3" key="Negligence">
                <Negligence :item="dataNegligenceDetail"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Worklog">
                <WorkLog :worklog="dataNegligenceDetail.worklog"/>
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
          <NegligenceRight :items="dataNegligenceDetail"/>
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import MedWarTitle from "../cards/MedWarTitle"
import Comment from "../negligence-detail/Comment"
import WorkLog from "../negligence-detail/WorkLog"
import CheckList from "../negligence-detail/CheckList"
import Negligence from "../negligence-detail/Negligence"
import Notes from "../negligence-detail/Notes"
import NegligenceRight from "../negligence-detail/NegligenceRight"
export default {
  components: {
    MedWarTitle,
    Comment,
    WorkLog,
    CheckList,
    Notes,
    Negligence,
    NegligenceRight
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/negligence/detail", ["dataNegligenceDetail"]),

  }
};
</script>
