import baseRiskAreaMixin from "./baseRiskAreaMixin";

export default {
  mixins: [baseRiskAreaMixin],
  data() {
    return {
      menuRiskArea: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetRiskArea: false,
      isLoadingGetRiskArea: false,
    };
  },

  methods: {
    async $_toggleMenuRiskAreaMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetRiskArea = true;
        await this.getDataRiskAreaRequest({ matterId });
        this.isLoadingGetRiskArea = false;
        this.isCallApiGetRiskArea = true;
      } catch (error) {
        this.isLoadingGetRiskArea = false;
      }
    },

    $_toggleMenuRiskAreaMixin_openMenu(data) {
      if (!this.isCallApiGetRiskArea) {
        this.$_toggleMenuRiskAreaMixin_getData();
      }
      if (this.menuRiskArea.isShowMenu) {
        this.menuRiskArea.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuRiskArea = {
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
