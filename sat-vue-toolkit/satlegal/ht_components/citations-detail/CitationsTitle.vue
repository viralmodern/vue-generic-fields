<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>mdi-local_library</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row no-gutters>
            <v-col cols="12">
              <span class="title mouse">
                {{ title }}
                <v-icon small class="ml-2">mdi-create</v-icon>
              </span>
            </v-col>
            <v-col cols="12">
              <span class="subheading text--secondary">
                {{
                date | formatDMY
                }}
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row right no-gutters>
        <ProcessTheMemberMenu
          :listMembers="character"
          :detailMembers="characterJoin"
          nameSlot="message"
          title="Characters"
          labelSearch="Search characters..."
          messageFilter="characters"
          @selectMember="selectCharacers"
          @addMembers="addCharacers"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    title: String,
    date: String,
    characters: Array
  },
  computed: {
    characterJoin() {
      return (this.character || []).filter(e =>
        (this.characters || []).includes(e.id)
      );
    },
    ...mapGetters("ht_store/matter/character", ["character"]) // eslint-disable-line
  },
  methods: {
    selectCharacers({ id: idSelect }) {
      const data = {
        characters: this.characters.filter(id => id !== idSelect)
      };
      this.updateCitationsRequest(data);
    },
    addCharacers({ id }) {
      const data = {
        characters: [...this.characters, id]
      };
      this.updateCitationsRequest(data);
    },
    ...mapActions("ht_store/matter/citations/detail", ["updateCitationsRequest"]) // eslint-disable-line
  }
};
</script>

<style scoped>
.icon-mess {
  justify-content: center;
  align-items: center;
  display: flex;
}
.mouse {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.custom /deep/ .v-icon {
  padding: 0px;
}
</style>
