<template>
  <td>
    <v-row no-gutters class="justify-center align-center">
      <v-btn :to="showDetail" class="ma-0" icon>
        <v-icon color="#757575" size="18">mdi-eye</v-icon>
      </v-btn>
      <v-btn @click="isShowPopup = true" class="ma-0" icon>
        <v-icon color="#757575" size="18">mdi-delete_outline</v-icon>
      </v-btn>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure want to delete item?"
    />
  </td>
</template>
<script>
import ConfirmItem from "../../../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    dataRow: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    remove() {
      this.$emit("remove", this.dataRow.id);
      this.isShowPopup = false;
    }
  },
  computed: {
    showDetail() {
      let listType = this.$route.params.listType;
      let groupType = this.$route.params.groupType;
      let projectId = this.$route.params.matter || this.$route.params.projectId;
      let factId = this.dataRow.id;
      return {
        name: "factDetail",
        params: {
          projectId: projectId,
          listType: listType,
          groupType: groupType,
          factId: factId
        }
      };
    }
  }
};
</script>
