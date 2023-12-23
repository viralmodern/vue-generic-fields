import baseDocketMixin from "./baseDocketMixin";

export default {
  mixins: [baseDocketMixin],
  data() {
    return {
      relatedDocketMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetDocket: false,
      isLoadingGetDocket: false,
    };
  },
  methods: {
    async $_toggleMenuDocketMixin_getData() {
      try {
        this.isLoadingGetDocket = true;
        await this.$_baseDocketMixin_getDataFromApi();
        this.isLoadingGetDocket = false;
        this.isCallApiGetDocket = true;
      } catch (error) {
        this.isLoadingGetDocket = false;
      }
    },
    $_toggleMenuDocketMixin_openMenu(data) {
      if (!this.isCallApiGetDocket) {
        this.$_toggleMenuDocketMixin_getData();
      }
      if (this.relatedDocketMenu.isShowMenu) {
        this.relatedDocketMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedDocketMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk),
          detail: data.detail || false
        };
      }, 0);
    },
    $_toggleMenuDocketMixin_addValue(value) {
      this.relatedDocketMenu.value.push(value.pk);
    },
    $_toggleMenuDocketMixin_removeValue(value) {
      this.relatedDocketMenu.value = this.relatedDocketMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
