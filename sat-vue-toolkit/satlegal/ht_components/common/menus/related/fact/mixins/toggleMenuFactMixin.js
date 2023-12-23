import baseFactMixin from "./baseFactMixin";

export default {
  mixins: [baseFactMixin],
  data() {
    return {
      relatedFactMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetFact: false,
      isLoadingGetFact: false,
    };
  },
  methods: {
    async $_toggleMenuFactMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetFact = true;
        await this.$_baseFactMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetFact = false;
        this.isCallApiGetFact = true;
      } catch (error) {
        this.isLoadingGetFact = false;
      }
    },
    $_toggleMenuFactMixin_openMenu(data) {
      if (!this.isCallApiGetFact) {
        this.$_toggleMenuFactMixin_getData();
      }
      if (this.relatedFactMenu.isShowMenu) {
        this.relatedFactMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedFactMenu = {
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
    $_toggleMenuFactMixin_addValue(value) {
      this.relatedFactMenu.value.push(value.pk);
    },
    $_toggleMenuFactMixin_removeValue(value) {
      this.relatedFactMenu.value = this.relatedFactMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
