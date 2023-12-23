<template>
  <td>
    <v-switch class="switch" v-model="isSwitch" color="primary" @change="changeDisputed"></v-switch>
  </td>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isSwitch: false
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    changeDisputed(dispute) {
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          dispute: dispute
        }
      };
      this.updateTask(data);
    }
  },
  mounted() {
    this.isSwitch = this.dataRow.disputed;
  }
};
</script>
<style scoped>
.switch {
  width: 130px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 25px;
}
</style>
