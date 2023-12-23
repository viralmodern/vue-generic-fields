<template>
  <div>
    <v-row no-gutters>
      <v-col cols="10" class="pt-2">
        <v-text-field
          hide-details
          class="ma-0 pa-0 custom-text-field title"
          :value="item.name"
          @change="updateLogDetail('name', $event)"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="pa-1">
        <ProcessTheMemberMenu
          :listMembers="members"
          :detailMembers="memberJoin"
          nameSlot="message"
          title="Members"
          labelSearch="Search members..."
          messageFilter="members"
          @selectMember="removeMember"
          @addMembers="addMember"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-textarea
        hide-details
        auto-grow
        :value="item.description"
        @change="updateLogDetail('description', $event)"
        class="mt-3 pa-2 custom-text-field fieldDes"
        rows="1"
      ></v-textarea>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    item: Object
  },
  data() {
    return {
      nameTimeline: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"]),
    linkMember() {
      return "/project/" + this.$route.params.matter || this.$route.params.projectId + "/research/character";
    },
    memberJoin() {
      return (this.members || []).filter(e => {
        return (this.item.members || []).includes(e.id);
      });
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    updateLogDetail(x, y) {
      const data = {
        [x]: y
      };
      this.$emit("updateLogDetail", data);
    },
    removeMember(item) {
      const data = {
        id: item.id
      };
      this.removeMemberLogDetailRequest(data);
    },
    addMember(item) {
      const data = {
        id: item.id
      };
      this.addMemberLogDetailRequest(data);
    },
    ...mapActions("ht_store/matter/discovery/log/detail", [
      "addMemberLogDetailRequest",
      "removeMemberLogDetailRequest"
    ])
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
