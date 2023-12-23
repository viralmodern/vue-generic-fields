import baseEvidenceMixin from "./baseEvidenceMixin";

export default {
  mixins: [baseEvidenceMixin],
  data() {
    return {
      relatedEvidenceMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        pk: "",
        value: []
      },
      isCallApiGetEvidence: false,
      isLoadingGetEvidence: false,
    };
  },
  methods: {
    async $_toggleMenuEvidenceMixin_getData() {
      try {
        this.isLoadingGetEvidence = true;
        await this.$_baseEvidenceMixin_getDataFromApi();
        this.isLoadingGetEvidence = false;
        this.isCallApiGetEvidence = true;
      } catch (error) {
        this.isLoadingGetEvidence = false;
      }
    },
    $_toggleMenuEvidenceMixin_openMenu(data) {
      if (!this.isCallApiGetEvidence) {
        this.$_toggleMenuEvidenceMixin_getData();
      }
      if (this.relatedEvidenceMenu.isShowMenu) {
        this.relatedEvidenceMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.relatedEvidenceMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          pk: data.pk,
          value: data.value.map(x => +x.pk)
        };
      }, 0);
    },
    $_toggleMenuEvidenceMixin_addValue(value) {
      this.relatedEvidenceMenu.value.push(value.pk);
    },
    $_toggleMenuEvidenceMixin_removeValue(value) {
      this.relatedEvidenceMenu.value = this.relatedEvidenceMenu.value.filter(
        x => x !== value.pk
      );
    }
  }
};
