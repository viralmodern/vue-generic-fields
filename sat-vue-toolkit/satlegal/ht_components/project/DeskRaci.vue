<template>
  <div>
    <v-row no-gutters class="pa-2">
      <v-spacer></v-spacer>
      <v-btn
        class="ma-0 mr-2 white--text font-weight-bold"
        v-for="item in appConfigs.RACI"
        :key="item.value"
        :color="item.color"
        >{{ item.name }}</v-btn
      >
      <v-btn class="ma-0 mr-2 white--text font-weight-bold" color="#aca2a2bf"
        >no relationship</v-btn
      >
    </v-row>
    <v-data-table
      :headers="members"
      :items="tasks"
      class="elevation-1 filterable-table"
    >
      <template slot="headerCell" slot-scope="props">
        <v-row class="align-center" no-gutters v-if="!props.header.noUser">
          <UserAvatar
            :avatarSize="32"
            :imageUrl="(props.header.avatar || {}).imageUrl"
            :name="props.header.name"
          />
          <div>{{ props.header.name }}</div>
        </v-row>
      </template>
      <template slot="items" slot-scope="props">
        <td width="20%">{{ props.item.cardName }}</td>
        <td
          v-for="members in dataMatterMembers"
          :key="members.id"
          :width="`${80 / dataMatterMembers.length}%`"
          :style="{
            background: (findRACI(members.id, props.item.id).type || {}).color
          }"
        ></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  computed: {
    members() {
      return [
        { id: 0, noUser: true, sortable: false },
        ...this.dataMatterMembers.map(x => ({ ...x, sortable: false }))
      ];
    },
    dataRaci() {
      return (this.dataMatterRACI || []).map(x => {
        const type =
          (this.appConfigs.RACI || []).find(x1 => x1.value === x.type) || {};
        return { ...x, type };
      });
    },
    ...mapGetters("ht_store/matter/members", ["dataMatterMembers"]),
    ...mapGetters("ht_store/matter/RACI", ["dataMatterRACI"]),
    ...mapGetters("ht_store/task/list", ["tasks"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    findRACI(userId, taskId) {
      return (
        this.dataRaci.find(x => x.userId === userId && x.taskId === taskId) || {
          type: { color: "#aca2a2bf" }
        }
      );
    },
    ...mapActions("ht_store/matter/members", ["getDataMatterMembersRequest"]),
    ...mapActions("ht_store/matter/RACI", ["getDataMatterRACIRequest"])
  },
  mounted() {
    this.getDataMatterMembersRequest();
    this.getDataMatterRACIRequest();
  }
};
</script>
