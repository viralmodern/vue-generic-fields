export default {
  data() {
    return {
      menuSelectBox: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        name: "",
        pk: "",
        value: "",
        dataList: [],
        keyValue: "",
        keyText: "",
        title: "",
        detail: false
      }
    };
  },
  methods: {
    $_toggleMenuSelectBox_openMenu(data) {
      if (this.menuSelectBox.isShowMenu) {
        this.menuSelectBox.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuSelectBox = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value,
          dataList: data.dataList,
          keyValue: data.keyValue || "id",
          keyText: data.keyText || "name",
          title: data.title,
          detail: data.detail || false
        };
      }, 0);
    }
  }
};
