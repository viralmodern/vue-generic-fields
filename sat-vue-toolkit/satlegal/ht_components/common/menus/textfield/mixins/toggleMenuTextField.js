export default {
  data() {
    return {
      textFieldMenu: {
        typeInput: '',
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        name: "",
        pk: "",
        value: "",
        title: "",
      }
    };
  },
  methods: {
    $_toggleMenuTextField_openMenu(data) {
      if (this.textFieldMenu.isShowMenu) {
        this.textFieldMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.textFieldMenu = {
          typeInput: data.typeInput,
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value,
          title: data.title,
        };
      }, 0);
    }
  }
};
