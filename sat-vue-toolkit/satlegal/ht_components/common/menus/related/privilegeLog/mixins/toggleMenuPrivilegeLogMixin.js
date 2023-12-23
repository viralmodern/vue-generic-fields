import basePrivilegeLogMixin from "./basePrivilegeLogMixin";

export default {
  mixins: [basePrivilegeLogMixin],
  data() {
    return {
      relatedPrivilegeLogMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },
      isCallApiGetPrivilegeLog: false,
      isLoadingGetPrivilegeLog: false,
    };
  },
  methods: {
    async $_toggleMenuPrivilegeLogMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetPrivilegeLog = true;
        await this.$_basePrivilegeLogMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetPrivilegeLog = false;
        this.isCallApiGetPrivilegeLog = true;
      } catch (error) {
        this.isLoadingGetPrivilegeLog = false;
      }
    },
    $_toggleMenuPrivilegeLogMixin_openMenu(data) {
      if (!this.isCallApiGetPrivilegeLog) {
        this.$_toggleMenuPrivilegeLogMixin_getData();
      }
      if (this.relatedPrivilegeLogMenu.isShowMenu) {
        this.relatedPrivilegeLogMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedPrivilegeLogMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk)
        };
      }, 0);
    },
    $_toggleMenuPrivilegeLogMixin_addValue(value) {
      this.relatedPrivilegeLogMenu.value.push(value.pk);
    },
    $_toggleMenuPrivilegeLogMixin_removeValue(value) {
      this.relatedPrivilegeLogMenu.value = this.relatedPrivilegeLogMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
