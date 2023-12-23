<template>
  <div>
    <PopupAttachments
      ref="refPopupAttachment"
      :dataAttachments="dataAttachments"
      :isShowPagination="isShowPagination"
      :isLoadingAdd="isLoadingAdd"
      :isLoadingUpdate="isLoadingUpdate"
      :totalsPageAttachment="totalsPageAttachment"
      :isShowPopup="isShowPopup"
      @closePopup="$emit('closePopup')"
      :isDisabled="true"
    />
  </div>
</template>
<script>
import PopupAttachments from "@/sat-vue-toolkit/satlegal/ht_components/common/dialog/PopupAttachments";

export default {
  components: {
    PopupAttachments
  },
  props: {
    dataAttachments: Array,
    isShowPagination: Boolean,
    totalsPageAttachment: Number,
    isShowPopup: Boolean,
    requestForProductionId: Number,
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingUpdate: false,
    }
  },
};
</script>
