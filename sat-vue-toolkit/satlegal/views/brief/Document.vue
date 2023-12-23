<template>
<div>
  <Document/>
</div>
</template>
<script>
import {mapActions} from "vuex"
import Document from "../../ht_components/briefcase-discussion/Document";
export default {
  components: {
    Document
  },
  methods: {
    ...mapActions('matter/briefcase/discussion/document', ['getDataDocumentRequest']),
  },
  mounted() {
    this.getDataDocumentRequest();
  },
}
</script>

