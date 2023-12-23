import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"
import searchRequestSetItemDetailMixin from "./searchRequestSetItemDetailMixin";

export default {
  mixins: [searchRequestSetItemDetailMixin],
  data() {
    return {
      relatedRequestSetItemDetailMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        matterId: null,
        requestSetId: null,
        detail: false
      },
      isCallApiGetRequestSetItemDetail: false,
      isLoadingGetRequestSetItemDetail: false
    };
  },
  methods: {
    async $_toggleMenuRequestSetItemDetailMixin_getData(query) {
      try {
        this.isLoadingGetRequestSetItemDetail = true;
        await this.$_searchRequestSetItemDetailMixin_search(query);
        this.isLoadingGetRequestSetItemDetail = false;
        this.isCallApiGetRequestSetItemDetail = true;
      } catch (error) {
        this.isLoadingGetRequestSetItemDetail = false;
      }
    },
    $_toggleMenuRequestSetItemDetailMixin_openMenu(data) {
      if (data.isCallApi || !this.isCallApiGetRequestSetItemDetail) {
        const query = {
          idParams: {
            matterId: data.matterId,
            rSId: data.requestSetId,
          },
          searchObject: {
            ungroup: true,
          },
          isFirstCall: true
        }
        this.$_toggleMenuRequestSetItemDetailMixin_getData(query);
      }
      if (this.relatedRequestSetItemDetailMenu.isShowMenu) {
        this.relatedRequestSetItemDetailMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedRequestSetItemDetailMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: cloneDeep(data.value),
          matterId: data.matterId,
          requestSetId: data.requestSetId,
          detail: data.detail || false
        };
      }, 0);
    },
    $_toggleMenuRequestSetItemDetailMixin_addValue(value) {
      this.relatedRequestSetItemDetailMenu.value.push({pk: value.pk, name:value.name});
    },
    $_toggleMenuRequestSetItemDetailMixin_removeValue(value) {
      this.relatedRequestSetItemDetailMenu.value = this.relatedRequestSetItemDetailMenu.value.filter(
        x => x.pk !== value.pk
      );
    }
  }
};
