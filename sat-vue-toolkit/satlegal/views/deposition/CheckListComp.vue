<template>
  <CheckList
    :dataCheckList="dataCheckList"
    :dataLabels="label"
    :totalPagination="totalPagination"
    @checkboxMultipeId="selectCheckbox"
    @updateCheckList="updateTask"
    @updateLabels="updateLabels"
    @pagingFilters="pagingFilters"
    @updateStar="updateStar"
  >
    <template slot="addCheckList">
      <div>
        <v-btn class="primary" block @click="isShow = true">Add Task</v-btn>
        <AddCheckList
          :dataLabels="label"
          :isShow="isShow"
          @closeModal="isShow = false"
        />
      </div>
    </template>
  </CheckList>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CheckList from "../../ht_components/deposition/checklist/Home";
import AddCheckList from "../../ht_components/dialogs/AddCheckList";

export default {
  components: {
    CheckList,
    AddCheckList
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/checklist", [
      "getDataCheckList",
      "updateCheckList",
      "updateLabels",
      "updateStar"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    selectCheckbox(arrId) {
      return arrId;
    },
    updateTask(evt, pk) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const depositionId = this.$route.params.depositionId;
      const data = {
        matterId,
        depositionId,
        [evt.name]: evt.$event,
        pk
      };
      this.updateCheckList(data);
    },
    pagingFilters(evt) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const depositionId = this.$route.params.depositionId;
      const body = {
        matterId,
        depositionId,
        [evt.name]: evt.req
      };
      this.getDataCheckList(body);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/checklist", [
      "dataCheckList",
      "totalPagination"
    ]),
    ...mapGetters("ht_store/matter/tags", ["label"])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const depositionId = this.$route.params.depositionId;
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getDataCheckList({ matterId, depositionId, page: 1 });
  }
};
</script>
