<template>
  <td>
    <v-textarea
      hide-details
      auto-grow
      :value="dataRow.name"
      @change="change"
      class="ma-0 pa-0 custom-text-field"
      rows="2"
    ></v-textarea>
  </td>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    idGroup: [String, Number],
    column: Object,
    dataRow: Object
  },
  methods: {
    change(name) {
      const { projectId, factId } = this.$route.params;
      const data = {
        matterId: projectId,
        itemId: this.dataRow.id,
        factId,
        supportId: this.idGroup,
        body: {
          name
        }
      };
      this.updateSubFactsSupport(data);
    },
    ...mapActions("ht_store/project/research/facts", ["updateSubFactsSupport"])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
