<template>
  <td>{{ (nameMatter || {}).title }}</td>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    nameMatter() {
      return (this.dataMatter || []).find(
        x => x.id === this.dataRow.user.matter
      );
    }
  }
};
</script>
