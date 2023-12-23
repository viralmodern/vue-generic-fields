export default {
  data() {
    return {
      textAreaMenu: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        name: "",
        pk: "",
        value: "",
        title: ""
      }
    };
  },
  methods: {
    $_toggleMenuTextArea_openMenu(data) {
      if (this.textAreaMenu.isShowMenu) {
        this.textAreaMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.textAreaMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value,
          title: data.title
        };
      }, 0);
    }
  }
};
