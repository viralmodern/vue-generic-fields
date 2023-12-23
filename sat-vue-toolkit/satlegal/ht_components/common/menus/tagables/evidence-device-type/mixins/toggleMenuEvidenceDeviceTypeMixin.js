import baseEvidenceDeviceTypeMixin from "./baseEvidenceDeviceTypeMixin";

export default {
  mixins: [baseEvidenceDeviceTypeMixin],
  data() {
    return {
      menuEvidenceDeviceType: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
      },

      isCallApiGetEvidenceDeviceType: false,
      isLoadingGetEvidenceDeviceType: false,
    };
  },

  methods: {
    async $_toggleMenuEvidenceDeviceTypeMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetEvidenceDeviceType = true;
        await this.getDataEvidenceDeviceTypeRequest({ matterId });
        this.isLoadingGetEvidenceDeviceType = false;
        this.isCallApiGetEvidenceDeviceType = true;
      } catch (error) {
        this.isLoadingGetEvidenceDeviceType = false;
      }
    },

    $_toggleMenuEvidenceDeviceTypeMixin_openMenu(data) {
      if (!this.isCallApiGetEvidenceDeviceType) {
        this.$_toggleMenuEvidenceDeviceTypeMixin_getData();
      }
      if (this.menuEvidenceDeviceType.isShowMenu) {
        this.menuEvidenceDeviceType.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuEvidenceDeviceType = {
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value,
        };
      }, 0);
    }
  }
};
