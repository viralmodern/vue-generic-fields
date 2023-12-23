<template>
  <v-row no-gutters class="pl-2 pb-2 align-center">
    <v-col cols="6">
      <span class="font-weight-medium subheading">{{ name }}</span>
    </v-col>
    <v-col cols="6">
      <DateOfAgreement
        :originial="creataAt"
        @update="$emit('change', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import DateOfAgreement from "../../../evidences/detail/EvidencesDetailOriginial";

export default {
  components: {
    DateOfAgreement
  },
  props: {
    creataAt: String,
    name: String
  }
};
</script>
