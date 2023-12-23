<template>
  <v-row no-gutters>
    <span v-for="item in detailMembers" :key="item.id">
      <MenuRemoveMember :item="item" @delete="deleteMember(item)"/>
    </span>
    <MenuCreatePeopleInGroup
      :members="filterListMember"
      :isShow="isShowCreatePeople"
      @searchText="searchText"
      @toggleSelectMember="toggleSelectMember"
      :title="title"
      :labelSearch="labelSearch"
      :messageFilter="messageFilter"
    >
      <template :slot="nameSlot">
        <MessageSearchMember :linkMember="itemLink" :message="messageFilter"/>
      </template>
    </MenuCreatePeopleInGroup>
  </v-row>
</template>
<script>
import MenuRemoveMember from "./MenuRemoveMember";
import MenuCreatePeopleInGroup from "./MenuCreatePeopleInGroup";
import MessageSearchMember from "../message/MessageSearchMember";

export default {
  components: {
    MenuRemoveMember,
    MenuCreatePeopleInGroup,
    MessageSearchMember
  },
  props: {
    listMembers: Array,
    detailMembers: Array,
    title: String,
    labelSearch: String,
    messageFilter: String,
    itemLink: String,
    nameSlot: String
  },
  data() {
    return {
      isShowCreatePeople: false,
      searchQuery: ""
    };
  },
  methods: {
    toggleSelectMember(data) {
      if (data.check === false) {
        this.$emit("addMembers", data);
      } else {
        this.$emit("selectMember", data);
      }
    },
    searchText(text) {
      this.searchQuery = text;
    },
    deleteMember(item) {
      this.$emit("selectMember", item);
    }
  },
  computed: {
    filterListMember() {
      if (this.searchQuery) {
        return this.members.filter(item => {
          return item.avatar.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.members;
      }
    },
    members() {
      const arr = (this.detailMembers || []).reduce((a, b) => {
        a[b.id] = { ...b };
        return a;
      }, {});
      const a = this.listMembers.map(x => {
        if (arr[x.id]) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
      return a;
    }
  }
};
</script>
