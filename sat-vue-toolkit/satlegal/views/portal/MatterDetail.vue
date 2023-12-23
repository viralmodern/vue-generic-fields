<template>
  <div>
    <v-tabs grow>
      <v-tab key="Discussion">Discussion</v-tab>
      <v-tab key="Time">Time</v-tab>
      <v-tab key="Billing">Billing</v-tab>
      <v-tab key="Case">Case Brief</v-tab>
      <v-tab key="Docket">Docket</v-tab>
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
    </v-tabs>
  </div>
</template>
<script>
import Billing from "../../ht_components/portal-matter/Billing";
import CaseBrief from "../../ht_components/portal-matter/CaseBrief";
import Discussion from "../../ht_components/portal-matter/Discussion";
import Time from "../../ht_components/portal-matter/Time";
import Docket from "../../ht_components/portal-matter/Docket";
export default {
  components: {
    Billing,
    CaseBrief,
    Discussion,
    Time,
    Docket
  },
  props: {
    isShow: Boolean
  }
};
</script>
