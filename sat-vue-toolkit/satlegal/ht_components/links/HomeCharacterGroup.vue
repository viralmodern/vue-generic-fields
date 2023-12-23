<template>
  <v-row no-gutters>
    <CharacterList :items="character"/>
  </v-row>
</template>
<script>
import CharacterList from "../list/CharacterList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    CharacterList
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataCharacterGroup"]),
    ...mapGetters("ht_store/matter/character", ["character"])
  }
};
</script>
