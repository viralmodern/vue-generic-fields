<template>
  <v-dialog :value="isShow" width="1150" @input="$emit('cancel')">
    <FactDetail />
  </v-dialog>
</template>
<script>
import FactDetail from "../cards/FactDetail";
export default {
  components: {
    FactDetail
  },
  props: {
    isShow: Boolean
  }
};
</script>
