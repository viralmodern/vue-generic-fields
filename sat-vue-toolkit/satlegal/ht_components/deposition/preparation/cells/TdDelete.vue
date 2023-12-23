<template>
  <td>
    <v-btn @click="isShowPopup = true" small class="ma-0" icon>
      <v-icon size="18" color="#757575">delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      :isLoading="isLoading"
      @cancel="isShowPopup= false"
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
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowPopup: false,
      isLoading: false,
    };
  },
  methods: {
    remove() {
      this.isLoading = true;
      this.$emit('remove', close);
    },
    close() {
      this.isLoading = false;
    }
  },
};
</script>
