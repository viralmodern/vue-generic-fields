<template>
  <div>
    <a @click="isShowPopup = true" small class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small" icon>
      <v-icon size="18" color="red">mdi-delete</v-icon>
    </a>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      :isLoading="isLoading"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure want to delete item?"
    />
  </div>
</template>

<script>
import ConfirmItem from "../../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    item: Object
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
      this.$emit('remove', this.close);
    },
    close() {
      this.isLoading = false;
      this.isShowPopup = false;
    }
  },
};
</script>
