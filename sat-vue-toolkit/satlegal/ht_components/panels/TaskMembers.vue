<template>
  <v-row no-gutters>
    <v-col cols="12">
      <span class="title">Members</span>
    </v-col>
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
</template>

<script>
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
import { mapActions, mapGetters, mapMutations } from "vuex";
import {$$STORE_PREFIX} from "../../utils";
export default {
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

