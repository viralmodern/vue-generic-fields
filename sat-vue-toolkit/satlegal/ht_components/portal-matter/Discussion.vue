<template>
  <div>
    <v-tabs class="px-1">
      <v-tab key="Document">Document</v-tab>
      <v-tab key="Message">Message</v-tab>
      <v-tab-item class="mt-1" key="Document">
        <Document/>
      </v-tab-item>
      <v-tab-item class="mt-1" key="Message">
        <Message/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Document from "./discussion/Document";
import Message from "./discussion/Message";

export default {
  components: {
    Document,
    Message
  },
  methods: {
    ...mapActions("ht_store/clientPortal/matter/discussionMessage", [
      "getDataPortalMessageRequest"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    ...mapActions("ht_store/clientPortal/matter/discussionDocument", [
      "getDataDocumentRequest"
    ])
  },
  mounted() {
    this.getDataPortalMessageRequest();
    this.getDataMemberRequest();
    this.getDataClientRequest();
    this.getDataDocumentRequest();
  }
};
</script>
