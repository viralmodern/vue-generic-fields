<template>
  <ProcessTheMemberMenu
    :listMembers="listCharacters"
    :detailMembers="listFilter"
    :itemLink="linkMember"
    nameSlot="message"
    title="Initiator"
    labelSearch="Search Initiator..."
    messageFilter="Initiator"
    @selectMember="chooseMemeber"
    @addMembers="add"
  />
</template>
<script>
import ProcessTheMemberMenu from "../../../menus/ProcessTheMemberMenu";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    initiator: Array,
    listCharacters: Array
  },
  data() {
    return {
      isShowCreatePeople: false,
      searchQuery: ""
    };
  },
  methods: {
    searchText(text) {
      this.searchQuery = text;
    },
    chooseMemeber(item) {
      this.$emit("update", item.id);
    },
    add(item) {
      this.$emit("update", item.id);
    }
  },
  computed: {
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    listFilter() {
      return this.listCharacters.filter(e => {
        return this.initiator && this.initiator.includes(e.id);
      });
    }
  }
};
</script>
