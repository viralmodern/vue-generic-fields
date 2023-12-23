<template>
  <td>
    <v-row class="justify-center align-center" no-gutters>
      <v-btn
        small
        class="ma-0"
        icon
        v-if="isDetail === true"
        :to="{ name: nameParams, params: { id: dataRow.id } }"
      >
        <v-icon color="#757575" size="18">mdi-eye</v-icon>
      </v-btn>
      <v-btn small icon @click="remove">
        <v-icon color="#757575" size="18">mdi-delete_outline</v-icon>
      </v-btn>
    </v-row>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="$emit('removeRow', dataRow.id)"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure want to delete this expense?"
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
    dataRow: Object,
    isDetail: Boolean,
    nameParams: String
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    remove() {
      this.isShowPopup = true;
    }
  }
};
</script>
