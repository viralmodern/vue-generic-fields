<template>
  <v-row no-gutters>
      <MatterLeftMenu />
    <v-col>
      <v-row no-gutters>
        <v-col cols="12" class="px-2">
          <v-card class="mt-2">
            <DetailOverviewForm :item="overview" @changeDetail="changeDetail" />
          </v-card>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-row no-gutters>
            <v-col cols="12" class="my-3 subheading font-weight-bold">Complaints</v-col>
            <v-col cols="12">
              <ConplaintTable />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="px-2">
          <v-row no-gutters>
            <v-col cols="12" sm3 class="my-3 subheading font-weight-bold">Claim</v-col>
            <v-col cols="12">
              <ClaimTable />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import MatterLeftMenu from "../../ht_components/left-menus/MatterLeftMenu";
import DetailOverviewForm from "../../ht_components/overview/DetailOverviewForm";
import ConplaintTable from "./ComplaintTable";
import ClaimTable from "./ClaimTable";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    MatterLeftMenu,
    DetailOverviewForm,
    ConplaintTable,
    ClaimTable
  },
  methods: {
    ...mapActions("ht_store/project/overview", ["getDataOverviewRequest"]),
    ...mapMutations("ht_store/project/overview", [
      "createTagItem",
      "changeOverviewDetail"
    ]),
    changeDetail(data) {
      this.changeOverviewDetail(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/project/overview", ["overview"])
  },
  mounted() {
    this.getDataOverviewRequest();
  }
};
</script>
