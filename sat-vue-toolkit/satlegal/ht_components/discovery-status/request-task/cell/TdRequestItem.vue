<template>
  <td>
    <span>{{ dataJoin.name }}</span>
  </td>
</template>
<script>
import { mapGetters } from "vuex";
import { valueNoGroup } from "../../../../config";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestItem", ["dataRequestItem"]),
    dataJoin() {
      return (
        ((this.dataRequestItem[valueNoGroup] || {}).list || []).find(
          x => x.id === this.dataRow.request
        ) || {}
      );
    }
  }
};
</script>
