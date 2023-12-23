<template>
  <div fill-height>
    <v-row no-gutters class="mt-3 px-3 align-center">
      <h1>Profile partient</h1>
      <v-spacer></v-spacer>
      <FilterProfilePartient />
    </v-row>
    <v-col cols="12">
      <v-row no-gutters class="list-timeline py-1 px-2">
        <v-col cols="12" sm="4" v-for="item in dataPartientProfile" :key="item.id" class="pa-1">
          <CardToolbox
            :item="item"
            :members="members"
            :types="patientType"
            :to="toDetail(item.id)"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn color="primary" @click="showMore">
        <v-progress-circular v-if="isShowLoading" indeterminate color="white"></v-progress-circular>
        <span v-else>LOAD MORE</span>
      </v-btn>
    </v-col>
    <v-btn fab dark color="primary add" @click="isShowCreate = true">
      <v-icon dark>mdi-add</v-icon>
    </v-btn>
    <FormCreateProfilePartient
      :isShowPopup="isShowCreate"
      :tags="tags"
      header="Add new partient"
      @closeModal="isShowCreate = false"
      @submit="addProfilePartient"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { patientType } from "../../config";
import CardToolbox from "../../ht_components/cards/CardSumary";
import FormCreateProfilePartient from "../../ht_components/dialogs/FormCreateProfilePartient";
import FilterProfilePartient from "../../ht_components/filter/FilterProfilePartient";
export default {
  components: {
    CardToolbox,
    FormCreateProfilePartient,
    FilterProfilePartient
  },
  data() {
    return {
      page: 0,
      isShowLoading: false,
      isShowCreate: false,
      patientType
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile", ["dataPartientProfile"]),
    ...mapGetters("ht_store/matter/partient/profile/tag", ["tags"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    toDetail(id) {
      return {
        name: "ProfilePartientDetail",
        params: {
          id
        }
      };
    },
    async showMore() {
      this.page += 1;
      this.isShowLoading = true;
      await this.getDataPartientProfileRequest(this.page);
      this.isShowLoading = false;
    },
    addProfilePartient(data) {
      this.addDataPartientProfileRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/partient/profile", [
      "getDataPartientProfileRequest",
      "addDataPartientProfileRequest"
    ]),
    ...mapActions("ht_store/matter/partient/profile/tag", ["getDataTagsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    this.getDataPartientProfileRequest();
    this.getDataTagsRequest();
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
