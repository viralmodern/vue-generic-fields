<template>
  <v-row no-gutters>
    <v-row no-gutters class="pt-2">
      <v-col cols="12">
        <HomeGrid
          @updatePagination="paging => $emit('updatePagination', paging)"
          v-if="type === 2 && groupType"
        />
        <SlickGridVersion v-if="type === 6" />
      </v-col>
      <slot></slot>
    </v-row>
  </v-row>
</template>
<script>
import SlickGridVersion from "./SlickGridVersion";
import HomeGrid from "./HomeGrid";
// import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    SlickGridVersion,
    HomeGrid
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    groupType: String
  },
  methods: {
    // ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    // ...mapActions("ht_store/matter/location", ["getDataLocationRequest"]),
    // ...mapActions("ht_store/matter/note", ["getDataMatterNoteRequest"]),
    // ...mapActions("ht_store/matter/attachment", ["getDataAttachmentRequest"]),
    // ...mapActions("ht_store/matter/type", ["getDataMatterTypeRequest"]),
    // ...mapActions("ht_store/workspace/subject", ["getSubjectRequest"])
  },
  mounted() {
    // this.getDataCharacterRequest();
    // this.getDataLocationRequest();
    // this.getDataMatterNoteRequest();
    // this.getDataAttachmentRequest();
    // this.getSubjectRequest();
    // this.getDataMatterTypeRequest();
  }
};
</script>
