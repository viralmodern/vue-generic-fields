<template>
  <v-card>
    <v-row no-gutters wrap class="pa-3">
      <v-col class="px-2">
        <v-row no-gutters>
          <v-col>
            <MatterHearingSelect />
          </v-col>
          <v-col>
            <MatterHearingInfo :item="item" />
          </v-col>
          <v-col class="mt-1">
            <v-col cols="12">
              <v-tabs grow class="px-1">
                <v-tab key="Analysis">Analysis</v-tab>
                <v-tab key="Work Log">Work Log</v-tab>
                <v-tab key="Checklist">Checklist</v-tab>
                <v-tab key="Notes">Notes</v-tab>
                <v-tab key="Attachment">Attachments</v-tab>
                <v-tab-item key="Analysis" class="mt-1">
                  <MatterHearingAnalysis :item="this.item" />
                </v-tab-item>
                <v-tab-item key="Work Log" class="mt-1">
                  <MatterHearingWorkLog :item="this.item" />
                </v-tab-item>
                <v-tab-item key="Checklist" class="mt-1">
                  <MatterHearingChecklist :item="this.item" />
                </v-tab-item>
                <v-tab-item key="Notes" class="mt-1">
                  <MatterHearingNotes :item="item" />
                </v-tab-item>
                <v-tab-item key="Attachment">
                  <MatterHearingAttachment :item="item" />
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import MatterHearingSelect from "../matter/matter-hearing/MatterHearingSelect";
import MatterHearingAnalysis from "../matter/matter-hearing/MatterHearingAnalysis";
import MatterHearingWorkLog from "../matter/matter-hearing/MatterHearingWorkLog";
import MatterHearingInfo from "../matter/matter-hearing/MatterHearingInfo";
import MatterHearingChecklist from "../matter/matter-hearing/MatterHearingChecklist";
import MatterHearingNotes from "../matter/matter-hearing/MatterHearingNotes";
import MatterHearingAttachment from "../matter/matter-hearing/MatterHearingAttachment";

export default {
  props: {
    item: Object
  },
  components: {
    MatterHearingAnalysis,
    MatterHearingWorkLog,
    MatterHearingInfo,
    MatterHearingChecklist,
    MatterHearingNotes,
    MatterHearingAttachment,
    MatterHearingSelect
  }
};
</script>
