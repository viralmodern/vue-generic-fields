<template>
  <div>
    <TaskProjectDetailSelect
      v-if="taskDetail.selects"
      :favorables="taskDetail.selects.favorable"
      :limitations="taskDetail.selects.limitation"
      :treatments="taskDetail.selects.treatment"
      :vulnerabilities="taskDetail.selects.vulnerability"
      :dataSelect="dataSelect"
      @changeFavorables="changeFavorables"
      @changeVulnerability="changeVulnerability"
      @changeTreatment="changeTreatment"
      @changeLimitation="changeLimitation"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import TaskProjectDetailSelect from "../../project/TaskProjectDetailSelect";
export default {
  components: {
    TaskProjectDetailSelect
  },
  methods: {
    changeFavorables(val) {
      this.changeFavorable(val);
    },
    changeVulnerability(val) {
      this.changeVulnerability(val);
    },
    changeTreatment(val) {
      this.changeTreatment(val);
    },
    changeLimitation(val) {
      this.changeLimitation(val);
    },
    ...mapActions("ht_store/task/detail/description", ["getDataTaskDetailRequest"]),
    ...mapActions("ht_store/task/detail", ["getDataSelectRequest"]),
    ...mapMutations("ht_store/task/detail/description", [
      "changeFavorable",
      "changeVulnerability",
      "changeLimitation",
      "changeTreatment"
    ])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", ["taskDetail"]),
    ...mapGetters("ht_store/task/detail", ["dataSelect"])
  },
  mounted() {
    this.getDataTaskDetailRequest();
    this.getDataSelectRequest();
  }
};
</script>
