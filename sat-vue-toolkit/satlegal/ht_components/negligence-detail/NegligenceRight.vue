<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Injuries :</span>
      <v-row class="align-center" no-gutters>
        <Injury :injury="items.injury" />
      </v-row>
    </v-col>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Injuries label :</span>
      <v-row class="align-center" no-gutters>
        <InjuryLabel :injuryLabel="items.injuryLabel" />
      </v-row>
    </v-col>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Damage :</span>
      <v-row class="align-center" no-gutters>
        <Damage :damage="items.damage" />
      </v-row>
    </v-col>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Damage label :</span>
      <v-row class="align-center" no-gutters>
        <DamageLabel :damageLabel="items.damageLabel" />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Injury from "./right/Injury";
import Damage from "./right/Damage";
import InjuryLabel from "./right/InjuryLabel";
import DamageLabel from "./right/DamageLabel";
export default {
  props: {
    items: Object
  },
  components: {
    Injury,
    Damage,
    InjuryLabel,
    DamageLabel
  }
};
</script>
