<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="character"
      :detailMembers="getFilterAssignee"
      :itemLink="linkMember"
      nameSlot="message"
      title="Assignee"
      labelSearch="Search assignee..."
      messageFilter="characters"
      @selectMember="chooseMemeber"
      @addMembers="add"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProcessTheMemberMenu from "../../../menus/ProcessTheMemberMenu";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowCreatePeople: false,
      searchQuery: ""
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", [
      "removeAssignee",
      "addAssignee"
    ]),
    searchText(text) {
      this.searchQuery = text;
    },
    chooseMemeber(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          id: item.id,
          isActive: item.isActive === true ? !item.isActive : item.isActive
        }
      };
      this.removeAssignee(data);
    },
    add(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          ...item
        }
      };
      this.addAssignee(data);
    }
  },
  computed: {
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    getFilterAssignee() {
      return this.character.filter(e => {
        return this.dataRow.assignee.includes(e.id);
      });
    }
  }
};
</script>
