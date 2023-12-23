<template>
  <td>
    <v-row class="align-center" no-gutters>
      <v-btn
        small
        class="ma-0"
        icon
        exact
        :to="{
          name: 'CommunicationDetail',
          params: { idCommunication: dataRow.id }
        }"
      >
        <v-icon color="#757575" size="18">visibility</v-icon>
      </v-btn>
      <v-btn small @click="isShowPopup = true" class="ma-0" icon>
        <v-icon color="#757575" size="18">delete_outline</v-icon>
      </v-btn>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="
        $emit('removeRow', dataRow.id);
        isShowPopup = false;
      "
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
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  }
};
</script>
