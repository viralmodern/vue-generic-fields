<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <TicketDetail/>
  </v-dialog>
</template>
<script>
import TicketDetail from "../cards/TicketDetail";
export default {
  components: {
    TicketDetail
  },
  props: {
    isShow: Boolean
  }
};
</script>
