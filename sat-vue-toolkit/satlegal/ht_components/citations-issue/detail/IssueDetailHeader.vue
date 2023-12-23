<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-icon class="mx-3" large>message</v-icon>
        <v-row no-gutters class="justify-center">
          <v-col cols="12">
            <span class="title mouse">
              {{ dataIssueDetail.name }}
              <v-icon small class="ml-2">mdi-create</v-icon>
            </span>
          </v-col>
          <v-col cols="12">
            <span class="subheading text--secondary">
              {{
              dataIssueDetail.creataAt | formatDMY
              }}
            </span>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row no-gutters>
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
import ProcessTheMemberMenu from "../../menus/ProcessTheMemberMenu";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ProcessTheMemberMenu
  },
  computed: {
    characterJoin() {
      return (this.character || []).filter(e =>
        (this.dataIssueDetail.characters || []).includes(e.id)
      );
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/citations/citationsIssue/detail", ["dataIssueDetail"])
  },
  methods: {
    selectCharacers({ id: idSelect }) {
      const data = {
        characters: this.dataIssueDetail.characters.filter(
          id => id !== idSelect
        )
      };
      this.updateIssueDetailRequest(data);
    },
    addCharacers({ id }) {
      const data = {
        characters: [...this.dataIssueDetail.characters, id]
      };
      this.updateIssueDetailRequest(data);
    },
    ...mapActions("ht_store/matter/citations/citationsIssue/detail", [
      "updateIssueDetailRequest"
    ])
  }
};
</script>

<style scoped>
.mouse {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.custom /deep/ .v-icon {
  padding: 0px;
}
</style>
