<template>
  <td>
    <v-row  no-gutters>
      <v-btn small icon :to="routeForDetail" class="btn-resize">
        <v-icon small>visibility</v-icon>
      </v-btn>
      <v-btn
        small
        icon
        @click.native.stop="opentModalDelete(dataRow)"
        class="btn-resize"
      >
        <v-icon small>delete_outline</v-icon>
      </v-btn>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="confirmDeleteTaskBoard"
        @cancel="isShowPopup = false"
        messageConfirm="Are you sure you want to delete this item?"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions } from "vuex";
import ConfirmItem from "../../dialogs/ConfirmItem";
export default {
  components: {
    ConfirmItem
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowPopup: false,
      id: null
    };
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task", [
      "removeItemOfTreeCard"
    ]),
    opentModalDelete(item) {
      this.id = item.id;
      this.isShowPopup = true;
    },
    confirmDeleteTaskBoard() {
      this.removeItemOfTreeCard(this.id);
      this.isShowPopup = false;
    }
  },
  computed: {
    routeForDetail() {
      return {
        name: "CardDetail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          cardId: this.dataRow.id
        }
      };
    }
  }
};
</script>
<style scoped>
.btn-resize {
  width: 16px;
  height: 16px;
}
</style>
