import baseRiskMixin from "./baseRiskMixin";

export default {
  mixins: [baseRiskMixin],
  data() {
    return {
      relatedRiskMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },
      isCallApiGetRisk: false,
      isLoadingGetRisk: false,
    };
  },
  methods: {
    async $_toggleMenuRiskMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetRisk = true;
        await this.$_baseRiskMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetRisk = false;
        this.isCallApiGetRisk = true;
      } catch (error) {
        this.isLoadingGetRisk = false;
      }
    },
    $_toggleMenuRiskMixin_openMenu(data) {
      if (!this.isCallApiGetRisk) {
        this.$_toggleMenuRiskMixin_getData();
      }
      if (this.relatedRiskMenu.isShowMenu) {
        this.relatedRiskMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedRiskMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk)
        };
      }, 0);
    },
    $_toggleMenuRiskMixin_addValue(value) {
      this.relatedRiskMenu.value.push(value.pk);
    },
    $_toggleMenuRiskMixin_removeValue(value) {
      this.relatedRiskMenu.value = this.relatedRiskMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
