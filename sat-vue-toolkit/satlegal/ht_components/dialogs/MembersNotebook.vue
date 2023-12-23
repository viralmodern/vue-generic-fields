<template>
  <v-dialog :value="isShowPopup" width="800" @input="$emit('cancel')">
    <v-card>
      <v-card-title>
        <span class="text-h5">Manage members</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters class="mt-4 justify-center">
        <ProcessTheMemberMenu
          :listMembers="dataMembers"
          :detailMembers="detailMembers"
          title="Members"
          labelSearch="Search member..."
          messageFilter="person"
          @selectMember="selectMember"
          @addMembers="addMembers"
        />
      </v-row>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('cancel')">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    isShowPopup: Boolean
  },
  data() {
    return {
      isShowCreatePeople: false,
      searchQuery: ""
    };
  },
  components: {
    ProcessTheMemberMenu
  },
  methods: {
    ...mapActions("ht_store/noteBook", [
      "getDataMembersRequest",
      "getDetailMembersRequest"
    ]),
    ...mapMutations("ht_store/noteBook", ["selectMember", "addMembers"])
  },
  computed: {
    ...mapGetters("ht_store/noteBook", ["dataMembers", "detailMembers"])
  },
  mounted() {
    this.getDataMembersRequest();
    this.getDetailMembersRequest();
  }
};
</script>
