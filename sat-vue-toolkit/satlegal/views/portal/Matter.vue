<template>
  <div>
    <v-row class="align-center px-3" no-gutters>
      <h2>List matter</h2>
      <v-spacer></v-spacer>
      <FilterMatterPortal />
    </v-row>
    <v-col cols="12">
      <v-row no-gutters class="list-timeline py-1 px-2">
        <v-col
          cols="12"
          sm="4"
          v-for="item in dataMatter"
          :key="item.id"
          class="pa-1"
        >
          <CardSumaryMatter
            :item="item"
            :members="members"
            :types="typeMaster"
            :to="projectDetail(item.id)"
          />
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { typeMaster } from "../../config";
import CardSumaryMatter from "../../ht_components/cards/CardSumaryMatter";
import FilterMatterPortal from "../../ht_components/filter/FilterMatterPortal";
export default {
  components: {
    CardSumaryMatter,
    FilterMatterPortal
  },
  data() {
    return {
      typeMaster
    };
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/matter", ["dataMatter"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    projectDetail(id) {
      return {
        name: "MatterPortalDetail",
        params: {
          idMatter: id
        }
      };
    },
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/clientPortal/matter", ["getDataMatterRequest"])
  },
  mounted() {
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getDataMatterRequest();
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
