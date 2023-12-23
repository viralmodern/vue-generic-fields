<template>
  <v-row no-gutters>
    <v-col cols="12">
      <ProfileDetail />
    </v-col>
    <TabClientDetail />
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import ProfileDetail from "../../ht_components/client-detail/ProfileDetail";
import TabClientDetail from "../../ht_components/toolbars/TabClientDetail";
export default {
  components: {
    ProfileDetail,
    TabClientDetail
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail", ["getDataClientDetailRequest"]),
    ...mapActions("ht_store/matter", ["getDataMatterRequest"]),
    ...mapActions("ht_store/workspace/client/detail", ["getDataClientDetailRequest"]),
    ...mapActions("ht_store/workspace/client/detail/message", [
      "getDataMessageClientRequest"
    ]),
    ...mapActions("ht_store/workspace/client/detail/document", [
      "getDataDocumentClientRequest"
    ]),
    ...mapActions("ht_store/workspace/client/detail/note", ["getDataClientNoteRequest"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"])
  },
  mounted() {
    this.getDataClientDetailRequest();
    this.getDataMessageClientRequest();
    this.getDataMatterRequest();
    this.getDataMemberRequest();
    this.getDataDocumentClientRequest();
    this.getDataClientRequest();
    this.getDataClientNoteRequest();
  }
};
</script>
