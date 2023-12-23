<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>{{ iconDetail }}</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row no-gutters class="justify-center">
            <span class="title mouse">
              {{ title }}
              <v-icon small class="ml-2">mdi-create</v-icon>
            </span>
            <span class="subheading text--secondary">{{
              date | formatDMY
            }}</span>
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
    ...mapGetters("ht_store/matter/character", ["character"]),
    iconDetail() {
      var groupType = this.$route.params.groupType;
      return groupType === "evidences-grid"
        ? "local_library"
        : groupType === "hearsay-grid"
        ? "record_voice_over"
        : groupType === "testimony-grid"
        ? "chrome_reader_mode"
        : "";
    }
  },
  methods: {
    selectCharacers({ id: idSelect }) {
      const data = {
        characters: this.characters.filter(id => id !== idSelect)
      };
      this.updatePracticeRequest(data);
    },
    addCharacers({ id }) {
      const data = {
        characters: [...this.characters, id]
      };
      this.updatePracticeRequest(data);
    },
    ...mapActions("ht_store/matter/partient/practice/detail", ["updatePracticeRequest"])
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
