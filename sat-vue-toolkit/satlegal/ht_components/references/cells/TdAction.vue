<template>
  <td>
    <v-row no-gutters class="align-center">
      <v-btn icon :to="routeDetailReferences">
        <v-icon small color="#757575" size="18">visibility</v-icon>
      </v-btn>
      <v-btn icon @click="isShowPopup = true">
        <v-icon small color="#757575" size="18">delete_outline</v-icon>
      </v-btn>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="deleteGiven"
        @cancel="isShowPopup= false"
        messageConfirm="Are you sure want to delete this references?"
      />
    </v-row>
  </td>
</template>

<script>
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
      isShowPopup: false
    };
  },
  methods: {
    deleteGiven() {
      this.$emit("remove", this.dataRow.id);
      this.isShowPopup = false;
    }
  },
  computed: {
    routeDetailReferences() {
      return `/project/${this.$route.params.matter || this.$route.params.projectId}/references/detail/${this.dataRow.id}`;
    }
  }
};
</script>
