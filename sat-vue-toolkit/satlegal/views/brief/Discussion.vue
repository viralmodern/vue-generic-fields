<template>
  <div>
    <v-tabs class="px-1">
      <v-tab key="Internal">Internal</v-tab>
      <v-tab key="Message">Message</v-tab>
      <v-tab-item class="pa-3" key="Internal">
        <Internal/>
      </v-tab-item>
      <v-tab-item class="pa-3" key="Message">
        <Message/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import {mapActions} from "vuex"
import Internal from "../../ht_components/briefcase-discussion/Internal";
import Message from "../../ht_components/briefcase-discussion/Message";

export default {
  components: {
    Internal,
    Message
  },
  methods: {
    ...mapActions('matter/briefcase/discussion/message', ['getDataMessageClientRequest']),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
  },
  mounted(){
    this.getDataMessageClientRequest();
    this.getDataMemberRequest();
    this.getDataClientRequest();
  }
};
</script>
