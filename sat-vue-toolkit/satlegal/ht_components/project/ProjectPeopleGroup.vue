<template>
  <v-row no-gutters>
    <v-col class="mt-2">
      <span class="font-weight-bold ml-2">Add People group</span>
      <CreatePeopleGroup
        :members="members"
        @dataMember="dataMember"
        @addGroup="v=>$emit('addGroup',v)"
      />
      <ListPeopleGroup
        @deleteMember="member=>$emit('deleteMemberInGroup',item, member)"
        @toggleSelectMember="members=>$emit('toggleSelectMember', item, members)"
        @deleteCardGroup="itemGroup => $emit('deleteCardGroup', itemGroup)"
        :members="members"
        class="ma-2"
        v-for="item in dataProjectGroup"
        :key="item.id"
        :item="item"
      />
      <v-col>
        <span v-if="!dataProjectGroup.length">There is no group, click + to add new group</span>
      </v-col>
    </v-col>
  </v-row>
</template>
<script>
import CreatePeopleGroup from "../menus/CreatePeopleGroup";
import ListPeopleGroup from "./ListPeopleGroup";
export default {
  props: {
    dataProjectGroup: Array,
    members: Array
  },
  data() {
    return {
      isShowPeopleGroup: false
    };
  },
  components: {
    CreatePeopleGroup,
    ListPeopleGroup
  },
  methods: {
    dataMember() {}
  }
};
</script>
