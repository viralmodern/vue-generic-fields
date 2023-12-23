<template>
  <v-select
    :value="filter.value"
    :items="dataPeoPleGroup"
    :item-text="item => (item.avatar || {}).name"
    multiple
    return-object
    prepend-icon="search"
    @change="changeFilter"
    item-value="id"
    label="People filter"
    placeholder="Select to search"
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
      <span v-if="index === 1" class="grey--text caption">(+{{ filter.value.length - 1 }} others)</span>
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
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import UserAvatar from "../../avatars/UserAvatar";

export default {
  components: {
    UserAvatar
  },
  props: {
    filter: Object
  },
  computed: {
    ...mapGetters("ht_store/task/detail/tags", ["dataPeoPleGroup"]) // eslint-disable-line
  },
  methods: {
    changeFilter(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    },
    ...mapActions("ht_store/task/detail/tags", ["getDataPeopleGroupRequest"]), // eslint-disable-line
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]) // eslint-disable-line
  },
  mounted() {
    this.getDataPeopleGroupRequest();
  }
};
</script>
