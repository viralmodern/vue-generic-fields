<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Injuries :</span>
      <v-row no-gutters class="align-center">
        <Injury :injury="items.injury" />
      </v-row>
    </v-col>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Injuries label :</span>
      <v-row no-gutters class="align-center">
        <InjuryLabel :injuryLabel="items.injuryLabel" />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Injury from "./right/Injury";
import InjuryLabel from "./right/InjuryLabel";
export default {
  props: {
    items: Object
  },
  components: {
    Injury,
    InjuryLabel
  }
};
</script>
