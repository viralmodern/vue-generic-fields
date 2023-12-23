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
          :detailMembers="taskDetail.members"
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
  components: {
    ProcessTheMemberMenu
  },
  methods: {
    ...mapActions("ht_store/task/detail/members", [
      "getDataMembersRequest",
      "getDataTaskDetailRequest"
    ]),
    ...mapMutations("ht_store/task/detail/members", ["selectMember", "addMembers"])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/members", ["dataMembers", "taskDetail"])
  },
  mounted() {
    this.getDataMembersRequest();
    this.getDataTaskDetailRequest();
  }
};
</script>
