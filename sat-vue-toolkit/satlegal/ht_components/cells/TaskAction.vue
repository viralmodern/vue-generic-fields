<template>
  <td>
    <v-row no-gutters>
      <v-btn small icon :to="routeForDetail" class="btn-resize">
        <v-icon small>mdi-eye</v-icon>
      </v-btn>
      <v-btn
        small
        icon
        @click.native.stop="opentModalDelete(dataRow)"
        class="btn-resize"
      >
        <v-icon small>mdi-delete_outline</v-icon>
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
import { mapMutations } from "vuex";
import ConfirmItem from "../dialogs/ConfirmItem";
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
      objectTask: null
    };
  },
  methods: {
    ...mapMutations("ht_store/task/list", ["deleteItemOfTreeCard"]),
    opentModalDelete(item) {
      this.objectTask = item;
      this.isShowPopup = true;
    },
    confirmDeleteTaskBoard() {
      this.deleteItemOfTreeCard(this.objectTask);
      this.isShowPopup = false;
    }
  },
  computed: {
    routeForDetail() {
      return {
        name: "CardDetail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          cardId: 189
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
