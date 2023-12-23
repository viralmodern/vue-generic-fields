<template>
  <td>
    <v-row no-gutters class="align-center">
      <v-btn icon :to="routeCardDetail">
        <v-icon small color="#757575" size="18">visibility</v-icon>
      </v-btn>
      <v-btn icon @click="isShowPopup = true">
        <v-icon small color="#757575" size="18">delete_outline</v-icon>
      </v-btn>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="$emit('remove', dataRow.id); isShowPopup = false"
        @cancel="isShowPopup= false"
        messageConfirm="Are you sure you want to delete this request set?"
      />
    </v-row>
  </td>
</template>
<script>
import ConfirmItem from "../../../dialogs/ConfirmItem";
export default {
  components: {
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  computed: {
    routeCardDetail() {
      return `/project/${this.$route.params.matter || this.$route.params.projectId}/discovery-status/request-set/detail/${this.dataRow.pk}`;
    }
  },
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>
