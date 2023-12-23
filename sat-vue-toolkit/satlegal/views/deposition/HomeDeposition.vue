<template>
  <v-tabs>
    <v-tab key="transcript">Transcript</v-tab>
    <v-tab key="highlight">Highlight</v-tab>
    <v-tab key="index">Index</v-tab>
    <v-tab-item key="transcript">
      <DepositionPreview />
    </v-tab-item>
    <v-tab-item key="highlight">
      <Highlight />
    </v-tab-item>
    <v-tab-item key="index">
      <Index />
    </v-tab-item>
  </v-tabs>
</template>
<script>
import DepositionPreview from "../../ht_components/deposition/tabs/DepositionPreview";
import Highlight from "../../ht_components/deposition/tabs/Highlight";
import Index from "../../ht_components/deposition/tabs/Index";
export default {
  components: {
    DepositionPreview,
    Highlight,
    Index
  }
};
</script>
