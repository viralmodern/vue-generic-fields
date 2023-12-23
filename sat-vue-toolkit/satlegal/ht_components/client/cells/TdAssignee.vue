<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="character"
      :detailMembers="getFilterCharacter"
      :itemLink="linkMember"
      nameSlot="message"
      title="Assignee"
      labelSearch="Search assignee ..."
      messageFilter="Assignee"
      @selectMember="chooseMemeber"
      @addMembers="add"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProcessTheMemberMenu from "../../menus/ProcessTheMemberMenu";
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
    ...mapActions("ht_store/workspace/client", ["updateTask"]),
    searchText(text) {
      this.searchQuery = text;
    },
    chooseMemeber(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          id: item.id
        }
      };
      this.updateTask(data);
    },
    add(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          id: item.id
        }
      };
      this.updateTask(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    getFilterCharacter() {
      return this.character.filter(e => {
        return this.dataRow.user.assignee.includes(e.id);
      });
    }
  }
};
</script>
