<template>
  <v-row  no-gutters>
    <v-col shrink>
      <SearchableTextField @onSearch="onSearch" :loading="searching"/>
    </v-col>
    <v-col>
      <v-list two-line class="pa-0">
        <UserInfoInList
          v-for="(item, index) in users"
          :avatarUrl="item.avatar ? item.avatar.imageUrl : ''"
          :key="index"
          :fullName="item | fullName"
          :jobTitle="item.job ? item.job.title : ''"
          @click="$router.push('/private-message/1')"
        />
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchableTextField from "../inputs/SearchableTextField";
import UserInfoInList from "../cards/UserInfoInList";
export default {
  components: {
    SearchableTextField,
    UserInfoInList
  },
  methods: {
    onSearch(text) {
      this.searchUsers(text);
    },
    userClick() {},
    ...mapActions("ht_store/createPrivateMessage", ["searchUsers"])
  },
  computed: {
    ...mapGetters("ht_store/createPrivateMessage", ["users", "searching"])
  }
};
</script>

<style scoped>
</style>
