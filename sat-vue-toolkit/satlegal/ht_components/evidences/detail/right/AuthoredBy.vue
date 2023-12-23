<template>
  <v-row no-gutters class="pa-2">
    <v-col cols="12">
      <span class="subheading font-weight-bold">Authored by</span>
    </v-col>
    <v-col cols="12">
      <ProcessTheMemberMenu
        :listMembers="listCharacter"
        :detailMembers="characterJoin"
        nameSlot="message"
        title="Characters"
        labelSearch="Search characters..."
        messageFilter="characters"
        @selectMember="selectCharacers"
        @addMembers="addCharacers"
      />
    </v-col>
  </v-row>
</template>

<script>
import ProcessTheMemberMenu from "../../../menus/ProcessTheMemberMenu";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    listCharacter: Array,
    characters: Array
  },
  computed: {
    characterJoin() {
      return (this.listCharacter || []).filter(e =>
        (this.characters || []).includes(e.id)
      );
    }
  },
  methods: {
    selectCharacers({ id: idSelect }) {
      const data = {
        characters: this.characters.filter(id => id !== idSelect)
      };
      this.$emit("update", data);
    },
    addCharacers({ id }) {
      const data = {
        characters: [...this.characters, id]
      };
      this.$emit("update", data);
    }
  }
};
</script>
