import baseIssueMixin from "./baseIssueMixin";

export default {
  mixins: [baseIssueMixin],
  data() {
    return {
      menuIssue: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },

      isCallApiGetIssue: false,
      isLoadingGetIssue: false,
    };
  },

  methods: {
    async $_toggleMenuIssueMixin_getData() {
      try {
        this.isLoadingGetIssue = true;
        await this.getLablesWorkSpaceRequest();
        this.isLoadingGetIssue = false;
        this.isCallApiGetIssue = true;
      } catch (error) {
        this.isLoadingGetIssue = false;
      }
    },

    $_toggleMenuIssueMixin_openMenu(data) {
      if (!this.isCallApiGetIssue) {
        this.$_toggleMenuIssueMixin_getData();
      }
      if (this.menuIssue.isShowMenu) {
        this.menuIssue.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuIssue = {
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
