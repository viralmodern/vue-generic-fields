import baseCCLMixin from "./baseCCLMixin";

export default {
  mixins: [baseCCLMixin],
  data() {
    return {
      menuCCL: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetCCL: false,
      isLoadingGetCCL: false,
    };
  },

  methods: {
    async $_toggleMenuCCLMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetCCL = true;
        await this.getDataCommunicationLabelRequest({ matterId });
        this.isLoadingGetCCL = false;
        this.isCallApiGetCCL = true;
      } catch (error) {
        this.isLoadingGetCCL = false;
        throw error;
      }
    },

    $_toggleMenuCCLMixin_openMenu(data) {
      if (!this.isCallApiGetCCL) {
        this.$_toggleMenuCCLMixin_getData();
      }
      if (this.menuCCL.isShowMenu) {
        this.menuCCL.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuCCL = {
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value
        };
      }, 0);
    }
  }
};
