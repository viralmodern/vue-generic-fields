export default {
  dataClientMessage: state => state.dataClientMessage,
  dataClientMessageDetail: state => state.dataClientMessageDetail,
  isLoadingGet: state => state.isLoadingGet,
  isLoadingGetDetail: state => state.isLoadingGetDetail,
  //attachments
  dataAttachments: state => state.dataAttachments,
  totalsPageAttachment: state => Math.ceil(state.countAttachments / 20),
  isShowPaginationAttachments: (_, getters) => (getters.totalsPageAttachment || 0) > 1,
};
