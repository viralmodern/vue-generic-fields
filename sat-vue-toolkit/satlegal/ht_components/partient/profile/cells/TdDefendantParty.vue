<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="character"
      :detailMembers="listFilter"
      :itemLink="linkMember"
      nameSlot="message"
      title="Defendant Party"
      labelSearch="Search defendant party..."
      messageFilter="defendant party"
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
    ...mapActions("ht_store/matter/partient/profile/detail", ["updateTask"]),
    searchText(text) {
      this.searchQuery = text;
    },
    chooseMemeber(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: item.id
      };
      this.updateTask(data);
    },
    add(item) {
      const data = {
        type: "add",
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: item.id
      };
      this.updateTask(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    listFilter() {
      return this.character.filter(e => {
        return this.dataRow.defendantParty.includes(e.id);
      });
    }
  }
};
</script>
