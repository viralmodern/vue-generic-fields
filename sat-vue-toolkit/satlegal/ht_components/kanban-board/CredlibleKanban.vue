<template>
  <v-row no-gutters class="pt-2">
    <v-col cols="12">
      <CredlibleMainBoard
        v-if="viewType == 0 || viewType == 1"
        :boardData="boardData"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CredlibleMainBoard from "./CredlibleMainBoard";
export default {
  components: {
    CredlibleMainBoard
  },
  data() {
    return {
      viewType: 0
    };
  },
  computed: {
    ...mapGetters({
      dataProject: "project/credlibleBoard/getDataProject"
    }),
    boardData() {
      return this.dataProject.board;
    }
  },
  methods: {
    ...mapActions({
      fetchDataProject: "project/credlibleBoard/getDataProject"
    })
  },
  created() {
    this.fetchDataProject();
  }
};
</script>
