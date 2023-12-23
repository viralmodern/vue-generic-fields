import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/clients/clientsCommon", ["dataLabelsWorkSpace"])
  },
  methods: {
    ...mapActions("ht_store/clients/clientsCommon", [
      "getLablesWorkSpaceRequest",
      "addLableWorkSpaceRequest",
      "updateLableWorkSpaceRequest",
      "removeLableWorkSpaceRequest"
    ]),
  }
};
