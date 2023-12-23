<template>
<div>
  <Document/>
</div>
</template>
<script>
import {mapActions} from "vuex"
import Document from "../../ht_components/portal-matter/discussion/Document";
export default {
  components: {
    Document
  },
  methods: {
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    ...mapActions('clientPortal/document', ['getDataDocumentRequest']),
  },
  mounted() {
    this.getDataDocumentRequest();
    this.getDataClientRequest();
  },
}
</script>

