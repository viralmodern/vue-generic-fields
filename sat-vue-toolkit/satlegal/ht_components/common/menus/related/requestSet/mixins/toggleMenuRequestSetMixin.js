import searchRequestSetMixin from "./searchRequestSetMixin";

export default {
  mixins: [searchRequestSetMixin],
  data() {
    return {
      relatedRequestSetMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetRequestSet: false,
      isLoadingGetRequestSet: false
    };
  },
  methods: {
    async $_toggleMenuRequestSetMixin_getData() {
      try {
        const searchObject = {
          ungroup: true,
          page: 1
        };
        this.isLoadingGetRequestSet = true;
        await this.$_baseRequestSetMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetRequestSet = false;
        this.isCallApiGetRequestSet = true;
      } catch (error) {
        this.isLoadingGetRequestSet = false;
      }
    },
    $_toggleMenuRequestSetMixin_openMenu(data) {
      if (!this.isCallApiGetRequestSet) {
        this.$_toggleMenuRequestSetMixin_getData();
      }
      if (this.relatedRequestSetMenu.isShowMenu) {
        this.relatedRequestSetMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedRequestSetMenu = {
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
    $_toggleMenuRequestSetMixin_addValue(value) {
      this.relatedRequestSetMenu.value.push(value.pk);
    },
    $_toggleMenuRequestSetMixin_removeValue(value) {
      this.relatedRequestSetMenu.value = this.relatedRequestSetMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
