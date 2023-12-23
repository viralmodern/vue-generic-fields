import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/meeting", ["dataLabelsWorkSpace"])
  },
  methods: {
    ...mapActions("ht_store/matter/meeting", [
      "getLablesWorkSpaceRequest",
      "addLableWorkSpaceRequest",
      "updateLableWorkSpaceRequest",
      "removeLableWorkSpaceRequest"
    ]),
  }
};
