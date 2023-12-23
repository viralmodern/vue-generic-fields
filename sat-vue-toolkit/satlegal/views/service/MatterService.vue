<template>
  <v-row no-gutters fill-height>
    <v-row no-gutters fill-height>
      <div>
        <ServiceLeftMenu />
      </div>
      <v-col class="pl-2">
        <div class="list-timeline pa-2">
          <v-row no-gutters class="justify-end">
            <ServiceGroup />
            <ConfigColunmService />
          </v-row>
          <v-row class="pa-2">
            <router-view></router-view>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import ServiceLeftMenu from "../../ht_components/left-menus/ServiceLeftMenu";
import ServiceGroup from "../../ht_components/cards/ServiceGroup";
import ConfigColunmService from "../../ht_components/menus/ConfigColunmService";
import { mapActions } from "vuex";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    ServiceLeftMenu,
    ServiceGroup,
    ConfigColunmService
  },
  methods: {
    ...mapActions("ht_store/matter/service", ["getDataServiceRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/service/attachment", ["getDataAttachmentRequest"])
  },
  mounted() {
    const { projectId } = this.$route.params;
    // this.getDataServiceRequest({ matterId: projectId, page: 1 });
    this.getDataMembersRequest({ matterId: projectId });
    this.getDataAttachmentRequest();
  }
};
</script>
