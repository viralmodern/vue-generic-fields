<template>
  <v-dialog :value="isShow" @input="$emit('closeModal')" width="1000">
    <ByzantineTicketDetail/>
  </v-dialog>
</template>
<script>
import ByzantineTicketDetail from "../cards/ByzantineTicketDetail";

export default {
  components: {
    ByzantineTicketDetail
  },
  props: {
    isShow: Boolean
  }
};
</script>
