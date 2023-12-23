import baseClientMixin from "./baseClientMixin";

export default {
  mixins: [baseClientMixin],
  data() {
    return {
      relatedClientMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },
      isCallApiGetClient: false,
      isLoadingGetClient: false,
    };
  },
  methods: {
    async $_toggleMenuClientMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetClient = true;
        await this.$_baseClientMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetClient = false;
        this.isCallApiGetClient = true;
      } catch (error) {
        this.isLoadingGetClient = false;
      }
    },
    $_toggleMenuClientMixin_openMenu(data) {
      if (!this.isCallApiGetClient) {
        this.$_toggleMenuClientMixin_getData();
      }
      if (this.relatedClientMenu.isShowMenu) {
        this.relatedClientMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedClientMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk)
        };
      }, 0);
    },
    $_toggleMenuClientMixin_addValue(value) {
      this.relatedClientMenu.value.push(value.pk);
    },
    $_toggleMenuClientMixin_removeValue(value) {
      this.relatedClientMenu.value = this.relatedClientMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
