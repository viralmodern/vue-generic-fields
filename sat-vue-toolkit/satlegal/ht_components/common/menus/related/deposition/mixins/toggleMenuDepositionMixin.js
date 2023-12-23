import baseDepositionMixin from "./baseDepositionMixin";

export default {
  mixins: [baseDepositionMixin],
  data() {
    return {
      relatedDepositionMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetDeposition: false,
      isLoadingGetDeposition: false,
    };
  },
  methods: {
    async $_toggleMenuDepositionMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetDeposition = true;
        await this.$_baseDepositionMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetDeposition = false;
        this.isCallApiGetDeposition = true;
      } catch (error) {
        this.isLoadingGetDeposition = false;
      }
    },
    $_toggleMenuDepositionMixin_openMenu(data) {
      if (!this.isCallApiGetDeposition) {
        this.$_toggleMenuDepositionMixin_getData();
      }
      if (this.relatedDepositionMenu.isShowMenu) {
        this.relatedDepositionMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedDepositionMenu = {
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
    $_toggleMenuDepositionMixin_addValue(value) {
      this.relatedDepositionMenu.value.push(value.pk);
    },
    $_toggleMenuDepositionMixin_removeValue(value) {
      this.relatedDepositionMenu.value = this.relatedDepositionMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
