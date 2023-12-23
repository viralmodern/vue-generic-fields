<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col sm="2" class="icon-mess">
          <v-icon large>mdi-info</v-icon>
        </v-col>
        <v-col sm="10">
          <v-row no-gutters class="justify-center">
            <span class="title mouse">{{ title }}</span>
            <span class="subheading text--secondary">{{
              date | formatDMY
            }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row right no-gutters class="mr-2">
        <v-tooltip bottom v-if="user">
          <template v-slot:activator="{ on }">
            <UserAvatar
              v-on="on"
              :avatarSize="32"
              :imageUrl="user.avatar.imageUrl || null"
              :name="user.avatar.name || ''"
            />
          </template>
          <span>{{ user.avatar.name }}</span>
        </v-tooltip>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    UserAvatar
  },
  props: {
    title: String,
    date: String,
    by: Number
  },
  computed: {
    user() {
      return (
        this.dataMatterMembers &&
        this.dataMatterMembers.filter(x => x.id === this.by)[0]
      );
    },
    ...mapGetters("ht_store/matter/members", ["dataMatterMembers"]),
    iconDetail() {
      return "evidences-grid";
    }
  },
  methods: {
    // selectCharacers({ id: idSelect }) {
    //   const data = {
    //     characters: this.characters.filter(id => id !== idSelect)
    //   };
    //   this.updateNegligenceRequest(data);
    // },
    // addCharacers({ id }) {
    //   const data = {
    //     characters: [...this.characters, id]
    //   };
    //   this.updateNegligenceRequest(data);
    // },
    ...mapActions("ht_store/matter/members", ["getDataMatterMembersRequest"]),
    ...mapActions("ht_store/matter/partient/negligence/detail", [
      "updateNegligenceRequest"
    ])
  },
  mounted() {
    this.getDataMatterMembersRequest();
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
