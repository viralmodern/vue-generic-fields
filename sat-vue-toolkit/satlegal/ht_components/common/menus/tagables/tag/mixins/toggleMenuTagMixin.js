import baseTagMixin from "./baseTagMixin";

export default {
  mixins: [baseTagMixin],
  data() {
    return {
      menuTag: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetTag: false,
      isLoadingGetTag: false,
    };
  },

  methods: {
    async $_toggleMenuTagMixin_getData() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      try {
        this.isLoadingGetTag = true;
        await this.getDataTagRequest({ matterId });
        this.isLoadingGetTag = false;
        this.isCallApiGetTag = true;
      } catch (error) {
        this.isLoadingGetTag = false;
        throw error;
      }
    },

    $_toggleMenuTagMixin_openMenu(data) {
      if (!this.isCallApiGetTag) {
        this.$_toggleMenuTagMixin_getData();
      }
      if (this.menuTag.isShowMenu) {
        this.menuTag.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuTag = {
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
