<template>
  <v-row>
    <v-col cols="12">
      <v-row no-gutters class="mt-3 px-3 d-flex justify-space-between" align-center>
        <h1>List matter</h1>
        <v-spacer></v-spacer>
        <FilterMatter />
      </v-row>
      <v-col cols="12">
        <v-row row wrap class="list-timeline py-1 px-2">
          <v-col cols="12" sm="4" v-for="item in dataMatter" :key="item.id" class="pa-1">
            <CardSumaryMatter
              :item="item"
              :members="members"
              :types="typeMaster"
              :to="projectDetail(item.id)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-btn fab dark color="primary add" :to="{ name: 'CreateProject' }">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-col>
    <!-- <div fill-height> -->

    <!-- </div> -->
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { typeMaster } from "../../../config";
import CardSumaryMatter from "../../cards/CardSumaryMatter";
import FilterMatter from "../../filter/FilterMatter";
export default {
  components: {
    CardSumaryMatter,
    FilterMatter
  },
  data() {
    return {
      typeMaster
    };
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    projectDetail(id) {
      return {
        name: "Detail",
        params: {
          projectId: id
        }
      };
    },
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
  }
};
</script>
<style scoped>
.add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
