import baseRiskSourceMixin from "./baseRiskSourceMixin";

export default {
  mixins: [baseRiskSourceMixin],
  data() {
    return {
      menuRiskSource: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetRiskSource: false,
      isLoadingGetRiskSource: false,
    };
  },

  methods: {
    async $_toggleMenuRiskSourceMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetRiskSource = true;
        await this.getDataRiskSourceRequest({ matterId });
        this.isLoadingGetRiskSource = false;
        this.isCallApiGetRiskSource = true;
      } catch (error) {
        this.isLoadingGetRiskSource = false;
      }
    },

    $_toggleMenuRiskSourceMixin_openMenu(data) {
      if (!this.isCallApiGetRiskSource) {
        this.$_toggleMenuRiskSourceMixin_getData();
      }
      if (this.menuRiskSource.isShowMenu) {
        this.menuRiskSource.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuRiskSource = {
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
