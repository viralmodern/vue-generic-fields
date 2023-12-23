<template>
  <div>
    <div>
      <div class="text-h5 px-0">{{getTitleProject}}</div>
    </div>
    <v-chip small class="mx-0 text-caption" color="primary" text-color="white">Filing Project</v-chip>
    <v-chip small color="green text-caption" text-color="white">
      <v-avatar>
        <v-icon>mdi-check_circle</v-icon>
      </v-avatar>
      Active
    </v-chip>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
  export default {
    name: "InfoThumbnailProject",
    computed: {
      ...mapGetters("ht_store/projectDetail", ["projectDetail"]),
      getTitleProject() {
        try {
          return this.projectDetail.name
        } catch (e) {
          return ""
        }
      }
    }
  }
</script>

<style scoped>

</style>
