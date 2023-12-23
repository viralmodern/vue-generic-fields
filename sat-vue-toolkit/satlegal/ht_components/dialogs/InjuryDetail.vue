<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <InjuryTitle
              :title="dataInjuryDetail.name"
              :date="dataInjuryDetail.creataAt"
              :characters="dataInjuryDetail.characters"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Injury">Injury</v-tab>
              <v-tab key="Linked">Linked</v-tab>
              <v-tab key="Comment">Comment</v-tab>
              <v-tab key="WorkLog">WorkLog</v-tab>
              <v-tab key="Checklist">Checklist</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab-item class="pa-3" key="Injury">
                <Injury :item="dataInjuryDetail"/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Linked">Linked</v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment/>
              </v-tab-item>
              <v-tab-item class="pa-3" key="Worklog">
                <WorkLog :worklog="dataInjuryDetail.worklog"/>
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
          <InjuryRight :items="dataInjuryDetail"/>
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import InjuryTitle from "../cards/InjuryTitle";
import Comment from "../injury-detail/Comment";
import WorkLog from "../injury-detail/WorkLog";
import CheckList from "../injury-detail/CheckList";
import Injury from "../injury-detail/Injury";
import Notes from "../injury-detail/Notes";
import InjuryRight from "../injury-detail/InjuryRight";
export default {
  components: {
    InjuryTitle,
    Comment,
    WorkLog,
    CheckList,
    Notes,
    Injury,
    InjuryRight
  },
  props: {
    isShow: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/injury/detail", ["dataInjuryDetail"])
  }
};
</script>
