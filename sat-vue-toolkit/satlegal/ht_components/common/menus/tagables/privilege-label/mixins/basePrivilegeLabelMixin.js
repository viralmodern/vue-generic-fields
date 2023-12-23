import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/privilegeLabel", ["dataPrivilegeLabel"])
  },
  methods: {
    ...mapActions("ht_store/matter/privilegeLabel", [
      "getDataPrivilegeLabelRequest",
      "addPrivilegeLabelRequest",
      "updatePrivilegeLabelRequest",
      "removePrivilegeLabelRequest"
    ])
  }
};
