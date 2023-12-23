import baseExhibitMixin from "./baseExhibitMixin";

export default {
  mixins: [baseExhibitMixin],
  data() {
    return {
      relatedExhibitMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetExhibit: false,
      isLoadingGetExhibit: false,
    };
  },
  methods: {
    async $_toggleMenuExhibitMixin_getData() {
      try {
        const searchObject = {
          ungroup: true
        };
        this.isLoadingGetExhibit = true;
        await this.$_baseExhibitMixin_getDataFromApi(searchObject, true);
        this.isLoadingGetExhibit = false;
        this.isCallApiGetExhibit = true;
      } catch (error) {
        this.isLoadingGetExhibit = false;
      }
    },
    $_toggleMenuExhibitMixin_openMenu(data) {
      if (!this.isCallApiGetExhibit) {
        this.$_toggleMenuExhibitMixin_getData();
      }
      if (this.relatedExhibitMenu.isShowMenu) {
        this.relatedExhibitMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedExhibitMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk),
          detail: data.detail
        };
      }, 0);
    },
    $_toggleMenuExhibitMixin_addValue(value) {
      this.relatedExhibitMenu.value.push(value.pk);
    },
    $_toggleMenuExhibitMixin_removeValue(value) {
      this.relatedExhibitMenu.value = this.relatedExhibitMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
