import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestItem", ["dataListNoGroup"])
  },
  methods: {
    async $_baseRequestSetItemDetailMixin_getDataFromApi(query) {
      return this.getDataRequestSetItemDetail(query);
    },
    ...mapActions("ht_store/matter/requestStatus/requestItem", {
      getDataRequestSetItemDetail: 'getDataFromApi'
    })
  }
};
