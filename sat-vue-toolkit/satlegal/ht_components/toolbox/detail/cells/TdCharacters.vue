<template>
  <td>
    <ProcessTheMemberMenu
      :listMembers="character"
      :detailMembers="characterJoin"
      nameSlot="message"
      title="Characters"
      labelSearch="Search characters..."
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
    characterJoin() {
      return (this.character || []).filter(e => {
        return (this.dataRow.characters || []).includes(e.id);
      });
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    removeCharacter({ id: idSelect }) {
      const data = this.dataRow.characters.filter(id => id !== idSelect);
      this.$emit("update", data);
    },
    addCharacter({ id }) {
      const data = [...this.dataRow.characters, id];
      this.$emit("update", data);
    }
  }
};
</script>
