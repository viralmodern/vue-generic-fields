<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-select
        :value="filter.value"
        :items="dataMembers"
        item-text="email"
        item-value="id"
        label="Members filter"
        return-object
        prepend-icon="search"
        placeholder="Select to search"
        multiple
        @change="changeFilter"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0" class="chip--select-multi" small>
            <v-avatar>
              <UserAvatar
                :name="item.avatar.name"
                :imageUrl="(item.avatar || {}).imageUrl"
                :avatarSize="30"
              />
            </v-avatar>
            <span>{{item.avatar.nickName}}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text caption"
          >(+{{ filter.value.length - 1 }} others)</span>
        </template>
        <template slot="item" slot-scope="{item}">
          <UserAvatar
            :name="item.avatar.name"
            :imageUrl="(item.avatar || {}).imageUrl"
            :avatarSize="35"
          />&nbsp;
          <span>{{item.avatar.name}}</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../../avatars/UserAvatar";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    UserAvatar
  },
  props: {
    filter: Object
  },
  computed: {
    ...mapGetters("ht_store/task/detail/members", ["dataMembers"]) // eslint-disable-line
  },
  methods: {
    ...mapActions("ht_store/task/detail/members", ["getDataMembersRequest"]),
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeFilter(v) {
      this.updateFilterValue({
        filterName: this.filter.name,
        value: v
      });
    }
  },
  mounted() {
    this.getDataMembersRequest();
  }
};
</script>
