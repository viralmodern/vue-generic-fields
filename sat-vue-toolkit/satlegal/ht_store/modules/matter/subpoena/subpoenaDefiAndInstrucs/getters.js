export default {
  dataList: state => state.dataList,
  isLoading: state => state.isLoading,
  isShowPagination: (state, getters) => (getters.totalsPageAttachment || 0) > 1,
};
