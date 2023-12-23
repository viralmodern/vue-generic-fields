import basePrivilegeLogMixin from "./basePrivilegeLogMixin";
export default {
  mixins: [basePrivilegeLogMixin],
  data() {
    return {
      isLoadingSearchPrivilegeLog: false,
    };
  },
  methods: {
    async $_searchPrivilegeLogMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          document_name: text
        }
        this.isLoadingSearchPrivilegeLog = true;
        await this.$_basePrivilegeLogMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchPrivilegeLog = false;
      } catch (error) {
        this.isLoadingSearchPrivilegeLog = false;
      }
    },
  }
};
