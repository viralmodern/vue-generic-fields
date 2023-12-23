<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-1">
        <v-row no-gutters class="mt-2 pl-2 align-center">
          <span class="font-weight-bold">{{ item.name }}</span>
          <v-row no-gutters class="align-center">
            <span v-if="!item.member.length">(No members)</span>
            <span v-else v-for="item in item.member" :key="item.id">
              <MenuRemoveMember
                :item="item"
                @delete="$emit('deleteMember', item)"
              />
            </span>
            <MenuCreatePeopleInGroup
              :members="filterListMember"
              :isShow="isShowCreatePeople"
              @searchText="searchText"
              @toggleSelectMember="
                objectMember => $emit('toggleSelectMember', objectMember)
              "
              title="Members"
              labelSearch="Search member..."
              messageFilter="person"
            />
          </v-row>
          <v-col cols="1" class="text-xs-right">
            <MenuActionGroupPeople
              :item="item"
              @deleteCardGroup="
                itemGroup => $emit('deleteCardGroup', itemGroup)
              "
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import MenuRemoveMember from "../menus/MenuRemoveMember";
import MenuCreatePeopleInGroup from "../menus/MenuCreatePeopleInGroup";
import MenuActionGroupPeople from "../menus/MenuActionGroupPeople";
export default {
  data() {
    return {
      isShowCreatePeople: false,
      searchQuery: ""
    };
  },
  props: {
    item: Object,
    members: Array
  },
  components: {
    MenuRemoveMember,
    MenuCreatePeopleInGroup,
    MenuActionGroupPeople
  },
  methods: {
    searchText(text) {
      this.searchQuery = text;
    }
  },
  computed: {
    filterListMember() {
      if (this.searchQuery) {
        return this.dataMember.filter(item => {
          return item.avatar.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.dataMember;
      }
    },
    dataMember() {
      const checked = this.item.member.reduce((result, current) => {
        result[current.id] = { ...current };
        return result;
      }, {});
      const result = this.members.map(x => {
        if (checked[x.id]) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
      return result;
    }
  }
};
</script>
