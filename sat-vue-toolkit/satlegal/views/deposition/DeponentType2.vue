<template>
  <v-tabs>
    <v-tab class="text-body-2 padding-tab" key="Background">Background</v-tab>
    <v-tab class="text-body-2 padding-tab" key="Document_Discovery">Document Discovery</v-tab>
    <v-tab class="text-body-2 padding-tab" key="Daubert_Test">Daubert Test</v-tab>
    <v-tab-item key="Background">
      <Background/>
    </v-tab-item>
    <v-tab-item key="Document_Discovery">
      <DocumentDiscovery />
    </v-tab-item>
    <v-tab-item key="Daubert_Test">
      <DaubertTest />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import DocumentDiscovery from "./DocumentDiscovery";
import Background from "./Background";
import DaubertTest from "./DaubertTest";

export default {
  components: {
    DocumentDiscovery,
    Background,
    DaubertTest
  }
};
</script>


<style lang="scss">
  .padding-tab {
    padding: 0px 12px;
  }
</style>
