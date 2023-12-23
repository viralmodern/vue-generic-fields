<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-select
        :value="filters.value"
        :items="members"
        item-text="name"
        item-value="id"
        label="Creator filter"
        return-object
        prepend-icon="search"
        placeholder="Creator filter"
        multiple
        @change="changeCreator"
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
            <span>{{item.first_name}}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text text-caption"
          >(+{{ filters.value.length - 1 }} others)</span>
        </template>
        <template slot="item" slot-scope="{item}">
          <UserAvatar :name="item.name" :imageUrl="(item.avatar || {}).imageUrl" :avatarSize="35"/>&nbsp;
          <span>{{item.avatar.name}}</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../../avatars/UserAvatar";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      filters: {
        value: []
      }
    };
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  },
  mounted() {
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
  },
  methods: {
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapMutations("ht_store/project/research/facts/factsGrid", ["updateFilterValue"]),
    changeCreator(v) {
      var resultValue = v.length > 0 ? v : null;
      this.updateFilterValue({ filterName: "creator", value: resultValue });
      this.filters.value = v;
    }
  }
};
</script>
