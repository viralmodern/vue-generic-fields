<template>
  <v-dialog :value="isShow" @input="$emit('closeModal')" width="1000">
    <MatterHearingDetail :item="itemEdit"/>
  </v-dialog>
</template>
<script>
import MatterHearingDetail from "../cards/MatterHearingDetail";

export default {
  components: {
    MatterHearingDetail
  },
  props: {
    isShow: Boolean,
    itemEdit: Object
  }
};
</script>
