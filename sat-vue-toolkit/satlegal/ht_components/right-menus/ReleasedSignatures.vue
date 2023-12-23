<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row no-gutters class="align-center">
        <v-col grow>
          <h2>Signatures</h2>
        </v-col>
        <v-btn icon class="ma-0">
          <v-icon @click="$emit('showRight')">mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <div class="pa-2" v-for="item in dataListReleasedSignatures" :key="item.id">
      <ReleasedSignatures
        v-if="item.signatures ? item.signatures.imageUrl : false"
        :name="item.name"
        :role="item.role"
        :signatures="item.signatures"
        :avatar="item.avatar"
      />
    </div>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ReleasedSignatures from "../cards/ReleasedSignatures";

export default {
  components: {
    ReleasedSignatures
  },
  computed: {
    ...mapGetters("ht_store/project/signature", [
      "dataListReleasedSignatures",
      "loadingDataReleasedSignatures"
    ])
  },
  methods: {
    ...mapActions("ht_store/project/signature", ["getDataReleasedSignaturesRequest"])
  },
  mounted() {
    this.getDataReleasedSignaturesRequest();
  }
};
</script>
