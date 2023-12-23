import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"
import searchRequestSetItemMixin from "./searchRequestSetItemMixin";

export default {
  mixins: [searchRequestSetItemMixin],
  data() {
    return {
      relatedRequestSetItemMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetRequestSetItem: false,
      isLoadingGetRequestSetItem: false
    };
  },
  methods: {
    async $_toggleMenuRequestSetItemMixin_getData() {
      try {
        this.isLoadingGetRequestSetItem = true;
        await this.$_searchRequestSetItemMixin_search();
        this.isLoadingGetRequestSetItem = false;
        this.isCallApiGetRequestSetItem = true;
      } catch (error) {
        this.isLoadingGetRequestSetItem = false;
      }
    },
    $_toggleMenuRequestSetItemMixin_openMenu(data) {
      if (!this.isCallApiGetRequestSetItem) {
        this.$_toggleMenuRequestSetItemMixin_getData();
      }
      if (this.relatedRequestSetItemMenu.isShowMenu) {
        this.relatedRequestSetItemMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedRequestSetItemMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: cloneDeep(data.value),
          detail: data.detail || false
        };
      }, 0);
    },
    $_toggleMenuRequestSetItemMixin_addValue(value) {
      this.relatedRequestSetItemMenu.value.push({pk: value.pk, name:value.name});
    },
    $_toggleMenuRequestSetItemMixin_removeValue(value) {
      this.relatedRequestSetItemMenu.value = this.relatedRequestSetItemMenu.value.filter(
        x => +x.pk !== +value.pk
      );
    }
  }
};
