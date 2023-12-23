<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>{{ nameIcon }}</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row column justify-center>
            <v-col cols="12" class="pa-0">
              <span class="title mouse">
                {{ title }}
                <v-icon small class="ml-2">mdi-create</v-icon>
              </span>
            </v-col>
            <v-col cols="12" class="pa-0">
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
    characters: Array,
    nameTab: String
  },
  computed: {
    characterJoin() {
      return (this.character || []).filter(
        e => this.characters && this.characters.includes(e.id)
      );
    },
    nameIcon() {
      const name =
        this.nameTab === "Index Document"
          ? "list_alt"
          : this.nameTab === "Index Audio"
          ? "audiotrack"
          : this.nameTab === "Index Photo"
          ? "photo_library"
          : "";
      return name;
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    selectCharacers({ id: idSelect }) {
      const data = {
        characters: this.characters.filter(id => id !== idSelect)
      };
      this.updateIndexDetail(data);
    },
    addCharacers({ id }) {
      const data = {
        characters: [...this.characters, id]
      };
      this.updateIndexDetail(data);
    },
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["updateIndexDetail"])
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
