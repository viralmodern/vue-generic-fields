import basePrivilegeLabelMixin from "./basePrivilegeLabelMixin";

export default {
  mixins: [basePrivilegeLabelMixin],
  data() {
    return {
      menuPrivilegeLabel: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetPrivilegeLabel: false,
      isLoadingGetPrivilegeLabel: false,
    };
  },

  methods: {
    async $_toggleMenuPrivilegeLabelMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetPrivilegeLabel = true;
        await this.getDataPrivilegeLabelRequest({ matterId });
        this.isLoadingGetPrivilegeLabel = false;
        this.isCallApiGetPrivilegeLabel = true;
      } catch (error) {
        this.isLoadingGetPrivilegeLabel = false;
        throw error;
      }
    },

    $_toggleMenuPrivilegeLabelMixin_openMenu(data) {
      if (!this.isCallApiGetPrivilegeLabel) {
        this.$_toggleMenuPrivilegeLabelMixin_getData();
      }
      if (this.menuPrivilegeLabel.isShowMenu) {
        this.menuPrivilegeLabel.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuPrivilegeLabel = {
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
