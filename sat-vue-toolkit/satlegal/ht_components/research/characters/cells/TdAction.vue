<template>
  <td>
    <v-row no-gutters class="align-center">
      <v-btn icon class="ma-0">
        <v-icon class="text--secondary">star_border</v-icon>
      </v-btn>
      <v-btn icon class="ma-0" @click="isShowPopup = true">
        <v-icon class="text--secondary">delete</v-icon>
      </v-btn>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="remove"
        @cancel="isShowPopup= false"
        messageConfirm="Are you sure you want to delete this item credit card ?"
      />
    </v-row>
  </td>
</template>

<script>
import { mapActions } from "vuex";
import ConfirmItem from "../../../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    async remove() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const id = this.dataRow.id;
      await this.deleteDataCharacterRequest({ matterId, id });
      this.isShowPopup = false;
    },
    ...mapActions("ht_store/matter/character", ["deleteDataCharacterRequest"])
  }
};
</script>
