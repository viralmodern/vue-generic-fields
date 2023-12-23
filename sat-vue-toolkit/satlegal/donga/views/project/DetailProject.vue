<template>
  <v-scroll-y-transition mode="out-in">
    <router-view></router-view>
  </v-scroll-y-transition>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex';
  import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
  export default {
    name: "DetailProject",
    metaInfo: {
      title: "Project Overview"
    },
    data() {
      return {
        projectId: this.$route.params.matter || this.$route.params.projectId
      }
    },
    created() {
      //todo: fetch project
      this.$http.get('/api/projects/' + this.projectId + '/').then((rs) => {
        let data = rs.data;
        this.setInfoProject(data);
        this.setWorkFlowId(data['workflow']['pk']);
        this.setWorkFlowProject(data['workflow']);
        this.fetchStagesWorkFlow();
      })
    },
    methods: {
      ...mapMutations("ht_store/projectDetail", ["setInfoProject", "setWorkFlowId", "setWorkFlowProject"]),
      ...mapActions("ht_store/projectDetail", ["fetchStagesWorkFlow"]),
    }
  }
</script>

<style scoped>

</style>
