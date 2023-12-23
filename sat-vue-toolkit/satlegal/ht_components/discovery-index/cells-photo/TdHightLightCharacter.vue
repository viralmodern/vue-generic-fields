<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="character"
      :detailMembers="characterJoin"
      :itemLink="linkMember"
      nameSlot="message"
      title="Characters"
      labelSearch="Search characters..."
      messageFilter="characters"
      @selectMember="chooseMemeber"
      @addMembers="add"
    />
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import ProcessTheMemberMenu from "../../menus/ProcessTheMemberMenu";

export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    idGroup: Number,
    dataRow: Object,
    column: Object,
    expanId: Number
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  computed: {
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    characterJoin() {
      return (this.character || []).filter(e => {
        return (this.dataRow.characters || []).includes(e.id);
      });
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    searchText(text) {
      this.searchQuery = text;
    },
    chooseMemeber(item) {
      const data = {
        type: "remove",
        expanId: this.expanId,
        idGroup: this.idGroup,
        id: this.dataRow.id,
        newValue: item.id,
        columnName: this.column.name
      };
      this.$emit("updateTaskPhoto", data);
    },
    add(item) {
      const data = {
        type: "add",
        expanId: this.expanId,
        idGroup: this.idGroup,
        id: this.dataRow.id,
        newValue: item.id,
        columnName: this.column.name
      };
      this.$emit("updateTaskPhoto", data);
    }
  }
};
</script>
