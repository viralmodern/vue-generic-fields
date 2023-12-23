<template>
  <td>
    <v-row no-gutters class="justify-center align-center">
      <v-btn
        small
        class="ma-0"
        :to="{ name: 'issueDetail', params: { idIssue: dataRow.id } }"
        exact
        icon
      >
        <v-icon small color="#757575" size="18">mdi-eye</v-icon>
      </v-btn>
      <v-btn small @click="isShowPopup = true" class="ma-0" icon>
        <v-icon small color="#757575">mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="$emit('remove')"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure want to delete item?"
    />
  </td>
</template>
<script>
import ConfirmItem from "../../dialogs/ConfirmItem";
export default {
  components: {
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>
