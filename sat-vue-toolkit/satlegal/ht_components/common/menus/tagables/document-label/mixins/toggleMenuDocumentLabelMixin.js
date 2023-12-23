import baseDocumentLabelMixin from "./baseDocumentLabelMixin";

export default {
  mixins: [baseDocumentLabelMixin],
  data() {
    return {
      menuDocumentLabel: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetDocumentLabel: false,
      isLoadingGetDocumentLabel: false,
    };
  },

  methods: {
    async $_toggleMenuDocumentLabelMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetDocumentLabel = true;
        await this.getDataDocumentLabelRequest({ matterId });
        this.isLoadingGetDocumentLabel = false;
        this.isCallApiGetDocumentLabel = true;
      } catch (error) {
        this.isLoadingGetDocumentLabel = false;
        throw error;
      }
    },

    $_toggleMenuDocumentLabelMixin_openMenu(data) {
      if (!this.isCallApiGetDocumentLabel) {
        this.$_toggleMenuDocumentLabelMixin_getData();
      }
      if (this.menuDocumentLabel.isShowMenu) {
        this.menuDocumentLabel.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuDocumentLabel = {
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
