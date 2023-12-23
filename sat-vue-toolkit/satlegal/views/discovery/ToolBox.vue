<template>
  <v-col cols="12">
    <v-row no-gutters class="ma-2 d-flex justify-space-between">
      <h1>Toolbox</h1>
      <FilterToolBox />
    </v-row>
    <v-col cols="12">
      <v-row no-gutters class="list-timeline py-1 px-2">
        <v-col cols="12" sm4 v-for="item in dataToolbox" :key="item.id" class="pa-1">
          <CardToolbox
            :item="item"
            :members="members"
            :types="toolboxType"
            :to="toolBoxDetail(item.id)"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="text-xs-center" v-if="showShowMore">
      <v-btn color="primary" @click="showMore">
        <v-progress-circular v-if="isShowLoading" indeterminate color="white"></v-progress-circular>
        <span v-else>LOAD MORE</span>
      </v-btn>
    </v-col>
    <v-btn fab dark color="primary add" @click="isShowCreate = true">
      <v-icon dark>mdi-add</v-icon>
    </v-btn>
    <FormCreateToolbox
      :isShowPopup="isShowCreate"
      :dataMembers="members"
      :tags="tag"
      header="Add new toolbox"
      @closeModal="isShowCreate = false"
      @submit="addToolbox"
    />
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { toolboxType } from "../../config";
import CardToolbox from "../../ht_components/cards/CardSumary";
import FormCreateToolbox from "../../ht_components/dialogs/FormCreateToolbox";
import FilterToolBox from "../../ht_components/filter/FilterToolBox";
export default {
  components: {
    CardToolbox,
    FormCreateToolbox,
    FilterToolBox
  },
  data() {
    return {
      page: 1,
      isShowLoading: false,
      isShowCreate: false,
      toolboxType
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/toolbox", ["dataToolbox", "showShowMore"]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    toolBoxDetail(id) {
      return {
        name: "detailToolbox",
        params: {
          toolBoxId: id
        }
      };
    },
    async showMore() {
      this.page += 1;
      this.isShowLoading = true;
      await this.getDataToolboxRequest({
        page: this.page,
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isShowLoading = false;
    },
    addToolbox(data) {
      this.addDataToolboxRequest({
        ...data,
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/discovery/toolbox", [
      "getDataToolboxRequest",
      "addDataToolboxRequest"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getDataToolboxRequest({ page: 1, matterId });
    this.getDataTagsRequest({ matterId, type: "tag" });
    this.getDataMembersRequest({ matterId });
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
