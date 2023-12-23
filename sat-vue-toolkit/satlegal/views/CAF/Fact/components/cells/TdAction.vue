<template>
  <td>
    <v-btn @click="isShowPopup = true" class="ma-0" icon>
      <v-icon color="#757575">mdi-delete</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteSupport"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure want to delete this microscopic support?"
    />
  </td>
</template>

<script>
import { mapActions } from "vuex";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    idGroup: [String, Number],
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["removeSubFactsSupport"]),
    deleteSupport() {
      const { projectId, factId } = this.$route.params;
      const data = {
        matterId: projectId,
        itemId: this.dataRow.id,
        factId,
        supportId: this.idGroup
      };
      this.removeSubFactsSupport(data);
    }
  }
};
</script>
