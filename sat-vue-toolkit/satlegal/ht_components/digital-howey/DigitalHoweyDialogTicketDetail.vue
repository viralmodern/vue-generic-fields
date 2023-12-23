<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <DigitalHoweyTicketDetail/>
  </v-dialog>
</template>
<script>
import DigitalHoweyTicketDetail from "./DigitalHoweyTicketDetail";
export default {
  components: {
    DigitalHoweyTicketDetail
  },
  props: {
    isShow: Boolean
  }
};
</script>
