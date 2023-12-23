<template>
  <v-col cols="12">
    <v-row no-gutters class="d-flex justify-space-between mx-2">
      <h1>Deposition</h1>
      <FilterDeposition :types="appConfigs.deponentType.map(x => ({ id: x.value, ...x }))" :loadingFilter="loadingFilter"/>
    </v-row>
    <v-col cols="12">
      <v-row no-gutters class="list-timeline py-1 px-2">
        <v-col cols="12" sm="4" v-for="item in dataDeposition" :key="item.id" class="pa-1">
          <CardDeposition
            :item="item"
            :members="members"
            :types="appConfigs.deponentType.map(x => ({ id: x.value, ...x }))"
            :to="depositionDetail(item.id)"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="text-center" v-if="showShowMore">
      <v-btn color="primary" @click="showMore">
        <v-progress-circular v-if="isShowLoading" indeterminate color="white"></v-progress-circular>
        <span v-else>LOAD MORE</span>
      </v-btn>
    </v-col>
    <v-btn fab dark color="primary add" @click="isShowCreate = true">
      <v-icon dark>mdi-add</v-icon>
    </v-btn>
    <FormCreateDeposition
      ref="refFormCreateDeposition"
      :isShowPopup="isShowCreate"
      :dataMembers="dataMembersNotExitsCurrentUser"
      :types="appConfigs.deponentType"
      :isLoadingAdd="isLoadingAdd"
      header="Add new deposition"
      @closeModal="isShowCreate = false"
      @submit="addDeposition"
    />
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CardDeposition from "../../ht_components/cards/CardSumary";
import FormCreateDeposition from "../../ht_components/deposition/FormCreateDeposition";
import FilterDeposition from "../../ht_components/filter/FilterDeposition";
export default {
  components: {
    CardDeposition,
    FormCreateDeposition,
    FilterDeposition
  },
  data() {
    return {
      page: 1,
      isShowLoading: false,
      isShowCreate: false,
      isLoadingAdd: false,
      loadingFilter: false,
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition", [
      "dataDeposition",
      "showShowMore",
      "filterDeposition"
    ]),
    ...mapGetters("ht_store/project/members", ["dataMembersNotExitsCurrentUser","members"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    depositionDetail(id) {
      return {
        name: "detailDeposition",
        params: {
          depositionId: id
        }
      };
    },
    async showMore() {
      this.page += 1;
      this.isShowLoading = true;
      await this.getDataDepositionRequest({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        query: {
          page: this.page,
          ...this.filterDeposition,
        }
      });
      this.isShowLoading = false;
    },
    async addDeposition(dataForm) {
      try {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: dataForm
        };
        this.isLoadingAdd = true;
        await this.addDataDepositionRequest(data);
        this.$refs.refFormCreateDeposition.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    ...mapActions("ht_store/matter/discovery/deposition", [
      "getDataDepositionRequest",
      "addDataDepositionRequest",
      "filterDepositionRequest"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.filterDepositionRequest({ matterId, query: { page: 1, ...this.filterDeposition } });
    this.getDataMembersRequest({ matterId });
  },
  watch: {
    async filterDeposition(value) {
      try {
        this.loadingFilter = true;
        this.page = 1;
        await this.filterDepositionRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          query: {
            ...value,
            page: this.page,
          }
        });
        this.loadingFilter = false;
      } catch (error) {
        this.loadingFilter = false;
      }

    }
  },
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
