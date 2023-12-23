import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"
import searchCharacterMixin from "./searchCharacterMixin";

export default {
  mixins: [searchCharacterMixin],
  data() {
    return {
      relatedCharacterMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: [],
        detail: false
      },
      isCallApiGetCharacter: false,
      isLoadingGetCharacter: false
    };
  },
  methods: {
    async $_toggleMenuCharacterMixin_getData() {
      try {
        this.isLoadingGetCharacter = true;
        await this.$_searchCharacterMixin_searchApi();
        this.isLoadingGetCharacter = false;
      } catch (error) {
        this.isLoadingGetCharacter = false;
      }
    },
    $_toggleMenuCharacterMixin_openMenu(data) {
      if (!this.isCallApiGetCharacter) {
        this.isCallApiGetCharacter = true;
        this.$_toggleMenuCharacterMixin_getData();
      }
      if (this.relatedCharacterMenu.isShowMenu) {
        this.relatedCharacterMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedCharacterMenu = {
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
    $_toggleMenuCharacterMixin_addValue(value, mapKey = ["pk", "name"]) {
      const character = {};
      mapKey.forEach(key => (character[key] = value[key]));
      this.relatedCharacterMenu.value.push(character);
    },
    $_toggleMenuCharacterMixin_removeValue(value) {
      this.relatedCharacterMenu.value = this.relatedCharacterMenu.value.filter(
        x => +x.pk !== +value.pk
      );
    }
  }
};
