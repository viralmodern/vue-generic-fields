<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="members"
      :detailMembers="membersJoin"
      title="Members"
      labelSearch="Search member..."
      messageFilter="person"
      @selectMember="chooseMemeber"
      @addMembers="add"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/task/list/members", ["getDataMembersRequest"]),
    ...mapMutations("ht_store/task/list/members", ["selectMember"]),
    ...mapActions("ht_store/task/list", ["removeMembers", "addMember"]),
    chooseMemeber(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          id: item.id,
          isActive: item.isActive === true ? !item.isActive : item.isActive
        }
      };
      this.removeMembers(data);
    },
    add(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: item.id
      };
      this.addMember(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    membersJoin() {
      return (this.members || []).filter(x =>
        (this.dataRow.members || []).includes(x.id)
      );
    }
  },
  mounted() {
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
  }
};
</script>
