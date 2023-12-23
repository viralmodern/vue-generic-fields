import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoadingSearchCharacter: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["dataCharacter"])
  },
  methods: {
    async $_searchCharacterMixin_search(text) {
      try {
        this.isLoadingSearchCharacter = true;
        await this.$_searchCharacterMixin_searchApi({ full_name: text });
        this.isLoadingSearchCharacter = false;
      } catch (error) {
        this.isLoadingSearchCharacter = false;
      }
    },
    async $_searchCharacterMixin_searchApi(searchObject = {}) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject: {
          ungroup: true,
          ...searchObject
        },
        isFirstCall: true
      };
      return this.getDataCharacter2Request(query);
    },
    ...mapActions("ht_store/matter/character2", ["getDataCharacter2Request"])
  }
};
