<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="members"
      :detailMembers="memberJoin"
      nameSlot="message"
      title="Members"
      labelSearch="Search members..."
      messageFilter="characters"
      @selectMember="removeCharacter"
      @addMembers="addCharacter"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import ProcessTheMemberMenu from "../../../menus/ProcessTheMemberMenu";

export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    memberJoin() {
      return (this.members || []).filter(e => {
        return (this.dataRow.asker || []).includes(e.id);
      });
    },
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    removeCharacter({ id: idSelect }) {
      const data = this.dataRow.asker.filter(id => id !== idSelect);
      this.$emit("update", data);
    },
    addCharacter({ id }) {
      const data = [...this.dataRow.asker, id];
      this.$emit("update", data);
    }
  }
};
</script>
