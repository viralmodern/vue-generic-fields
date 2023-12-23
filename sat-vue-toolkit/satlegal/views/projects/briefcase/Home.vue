<template>
  <v-dialog
    :value="isShow"
    @input="$emit('closeDialogBriefcase')"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-app-bar dark color="primary">
        <v-toolbar-title>Briefcase</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="$emit('closeDialogBriefcase')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-divider></v-divider>
      <div>
        <v-tabs grow class="px-1">
          <v-tab key="Desk">Your Desk</v-tab>
          <v-tab key="Discussion">Discussion</v-tab>
          <v-tab key="Time">Time</v-tab>
          <v-tab key="Billing">Billing</v-tab>
          <v-tab key="Case">Case Brief</v-tab>
          <v-tab key="Docket">Docket</v-tab>
          <v-tab key="Meeting">Meeting</v-tab>
          <v-tab key="Document">Document</v-tab>
          <v-tab-item class="pa-3" key="Desk">
            <YourDesk/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Discussion">
            <Discussion/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Time">
            <Time/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Billing">
            <Billing/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Case">
            <CaseBrief/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Docket">
            <Docket/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Meeting">
            <Meeting/>
          </v-tab-item>
          <v-tab-item class="pa-3" key="Document">
            <Document/>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import YourDesk from "../../brief/YourDesk";
import Billing from "../../brief/Billing";
import Meeting from "../../brief/Meeting";
import CaseBrief from "../../brief/CaseBrief";
import Discussion from "../../brief/Discussion";
import Time from "../../brief/Time";
import Docket from "../../brief/Docket";
import Document from "../../brief/Document";
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  components: {
    YourDesk,
    Billing,
    Meeting,
    CaseBrief,
    Discussion,
    Time,
    Docket,
    Document
  },
  props: {
    isShow: Boolean
  }
};
</script>
