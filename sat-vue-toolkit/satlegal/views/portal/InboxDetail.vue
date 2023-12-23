<template>
  <div>
    <Reply :item="dataInboxDetail" @update="updateDataInboxDetailRequest"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Reply from "../../ht_components/portal-inbox/Reply";
export default {
  components: {
    Reply
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/inbox/detail", ["dataInboxDetail"])
  },
  methods: {
    ...mapActions("ht_store/clientPortal/inbox/detail", [
      "getDataInboxDetailRequest",
      "updateDataInboxDetailRequest"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"])
  },
  mounted() {
    this.getDataInboxDetailRequest(this.$route.params.idInbox);
    this.getDataClientRequest();
  },
  watch: {
    $route() {
      this.getDataInboxDetailRequest(this.$route.params.idInbox);
    }
  }
};
</script>
