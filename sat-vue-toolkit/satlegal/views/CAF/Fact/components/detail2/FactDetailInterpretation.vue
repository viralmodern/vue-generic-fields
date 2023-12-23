<template>
  <v-textarea
    hide-details
    auto-grow
    :value="description"
    class="ma-0 pa-0 custom-text-field"
    rows="1"
    placeholder="interpretation..."
    @change="change"
  ></v-textarea>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    description: String
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateFactsDetail"]),
    change(interpretation) {
      const { projectId, factId } = this.$route.params;
      this.updateFactsDetail({
        matterId: projectId,
        taskId: factId,
        body: {
          interpretation
        }
      });
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
